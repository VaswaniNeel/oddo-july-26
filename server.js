const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const prisma = require('./prisma/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static frontend files from workspace root
app.use(express.static(__dirname));

// Utility to catch async errors in Express routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// -------------------------------------------------------------
// REST API: Bulk State Sync
// -------------------------------------------------------------

// GET full state
app.get('/api/data', asyncHandler(async (req, res) => {
  const [
    departments,
    employees,
    emissionFactors,
    carbonTransactions,
    goals,
    policies,
    audits,
    complianceIssues,
    csrActivities,
    participation,
    acknowledgements,
    challenges,
    challengeParticipation,
    badges,
    employeeBadges,
    rewards,
    redemptions,
    notifications,
    products,
    businessOperations,
    esgConfigs
  ] = await Promise.all([
    prisma.department.findMany(),
    prisma.employee.findMany(),
    prisma.emissionFactor.findMany(),
    prisma.carbonTransaction.findMany({ orderBy: { date: 'desc' } }),
    prisma.goal.findMany(),
    prisma.policy.findMany(),
    prisma.audit.findMany(),
    prisma.complianceIssue.findMany(),
    prisma.csrActivity.findMany(),
    prisma.participation.findMany(),
    prisma.acknowledgement.findMany(),
    prisma.challenge.findMany(),
    prisma.challengeParticipation.findMany(),
    prisma.badge.findMany(),
    prisma.employeeBadge.findMany(),
    prisma.reward.findMany(),
    prisma.redemption.findMany(),
    prisma.notification.findMany({ orderBy: { date: 'desc' } }),
    prisma.product.findMany(),
    prisma.businessOperation.findMany(),
    prisma.esgConfig.findFirst({ where: { id: 'default' } })
  ]);

  // If no esgConfig exists, seed the default
  let esgConfig = esgConfigs;
  if (!esgConfig) {
    esgConfig = {
      weightE: 40,
      weightS: 30,
      weightG: 30,
      autoEmission: true,
      evidenceRequired: true,
      badgeAutoAward: true
    };
  }

  // Format to client state
  res.json({
    departments,
    employees,
    emissionFactors,
    carbonTransactions,
    goals,
    policies,
    audits,
    complianceIssues,
    csrActivities,
    participation,
    acknowledgements,
    challenges,
    challengeParticipation,
    badges,
    employeeBadges,
    rewards,
    redemptions,
    notifications,
    products,
    businessOperations,
    esgConfig: {
      weightE: esgConfig.weightE,
      weightS: esgConfig.weightS,
      weightG: esgConfig.weightG,
      autoEmission: esgConfig.autoEmission,
      evidenceRequired: esgConfig.evidenceRequired,
      badgeAutoAward: esgConfig.badgeAutoAward
    },
    // Default session info
    session: { role: "admin", employeeId: "e1" }
  });
}));

// POST full state sync
app.post('/api/data', asyncHandler(async (req, res) => {
  const db = req.body;
  if (!db) {
    return res.status(400).json({ error: 'Missing body data' });
  }

  console.log('Synchronizing full state to database...');

  await prisma.$transaction(async (tx) => {
    // 1. Delete child tables first (avoiding FK violations)
    await tx.employeeBadge.deleteMany();
    await tx.redemption.deleteMany();
    await tx.acknowledgement.deleteMany();
    await tx.participation.deleteMany();
    await tx.challengeParticipation.deleteMany();
    await tx.carbonTransaction.deleteMany();
    await tx.complianceIssue.deleteMany();
    await tx.goal.deleteMany();
    await tx.employee.deleteMany();
    await tx.department.deleteMany();
    await tx.emissionFactor.deleteMany();
    await tx.policy.deleteMany();
    await tx.audit.deleteMany();
    await tx.csrActivity.deleteMany();
    await tx.challenge.deleteMany();
    await tx.badge.deleteMany();
    await tx.reward.deleteMany();
    await tx.product.deleteMany();
    await tx.businessOperation.deleteMany();
    await tx.notification.deleteMany();
    await tx.esgConfig.deleteMany();

    // 2. Insert parent/standalone tables
    if (db.esgConfig) {
      await tx.esgConfig.create({
        data: {
          id: 'default',
          weightE: db.esgConfig.weightE ?? 40,
          weightS: db.esgConfig.weightS ?? 30,
          weightG: db.esgConfig.weightG ?? 30,
          autoEmission: db.esgConfig.autoEmission ?? true,
          evidenceRequired: db.esgConfig.evidenceRequired ?? true,
          badgeAutoAward: db.esgConfig.badgeAutoAward ?? true
        }
      });
    }

    if (db.departments && db.departments.length) {
      await tx.department.createMany({ data: db.departments.map(d => ({
        id: d.id,
        name: d.name,
        code: d.code,
        head: d.head,
        parentId: d.parentId || '',
        employeeCount: d.employeeCount || 0,
        status: d.status || 'Active'
      })) });
    }

    if (db.employees && db.employees.length) {
      await tx.employee.createMany({ data: db.employees.map(e => ({
        id: e.id,
        name: e.name,
        email: e.email || null,
        passwordHash: e.passwordHash || null,
        departmentId: e.departmentId || null,
        role: e.role || 'employee',
        xp: e.xp || 0,
        points: e.points || 0,
        avatar: e.avatar
      })) });
    }

    if (db.emissionFactors && db.emissionFactors.length) {
      await tx.emissionFactor.createMany({ data: db.emissionFactors.map(ef => ({
        id: ef.id,
        name: ef.name,
        unit: ef.unit,
        factor: Number(ef.factor),
        source: ef.source
      })) });
    }

    if (db.policies && db.policies.length) {
      await tx.policy.createMany({ data: db.policies.map(p => ({
        id: p.id,
        title: p.title,
        version: p.version,
        description: p.description,
        status: p.status || 'Draft',
        createdAt: p.createdAt
      })) });
    }

    if (db.audits && db.audits.length) {
      await tx.audit.createMany({ data: db.audits.map(a => ({
        id: a.id,
        title: a.title,
        department: a.department,
        date: a.date,
        findings: a.findings || 0,
        status: a.status
      })) });
    }

    if (db.complianceIssues && db.complianceIssues.length) {
      await tx.complianceIssue.createMany({ data: db.complianceIssues.map(ci => ({
        id: ci.id,
        title: ci.title,
        severity: ci.severity,
        owner: ci.owner,
        dueDate: ci.dueDate,
        status: ci.status || 'Open',
        description: ci.description,
        departmentId: ci.departmentId
      })) });
    }

    if (db.csrActivities && db.csrActivities.length) {
      await tx.csrActivity.createMany({ data: db.csrActivities.map(csr => ({
        id: csr.id,
        title: csr.title,
        category: csr.category,
        description: csr.description,
        date: csr.date,
        points: csr.points,
        status: csr.status
      })) });
    }

    if (db.participation && db.participation.length) {
      await tx.participation.createMany({ data: db.participation.map(p => ({
        id: p.id,
        activityId: p.activityId,
        employeeId: p.employeeId,
        proof: p.proof || '',
        approvalStatus: p.approvalStatus || 'Pending',
        pointsEarned: p.pointsEarned || 0,
        completionDate: p.completionDate || ''
      })) });
    }

    if (db.acknowledgements && db.acknowledgements.length) {
      await tx.acknowledgement.createMany({ data: db.acknowledgements.map(ack => ({
        id: ack.id,
        policyId: ack.policyId,
        employeeId: ack.employeeId,
        acknowledgedAt: ack.acknowledgedAt
      })) });
    }

    if (db.challenges && db.challenges.length) {
      await tx.challenge.createMany({ data: db.challenges.map(ch => ({
        id: ch.id,
        title: ch.title,
        category: ch.category,
        description: ch.description,
        xp: ch.xp,
        difficulty: ch.difficulty,
        evidenceRequired: ch.evidenceRequired ?? false,
        deadline: ch.deadline,
        status: ch.status
      })) });
    }

    if (db.challengeParticipation && db.challengeParticipation.length) {
      await tx.challengeParticipation.createMany({ data: db.challengeParticipation.map(cp => ({
        id: cp.id,
        challengeId: cp.challengeId,
        employeeId: cp.employeeId,
        progress: cp.progress || 0,
        proof: cp.proof || '',
        approval: cp.approval || 'Pending',
        xpAwarded: cp.xpAwarded || 0
      })) });
    }

    if (db.badges && db.badges.length) {
      await tx.badge.createMany({ data: db.badges.map(b => ({
        id: b.id,
        name: b.name,
        description: b.description,
        unlockType: b.unlockType,
        unlockValue: b.unlockValue,
        icon: b.icon
      })) });
    }

    if (db.employeeBadges && db.employeeBadges.length) {
      await tx.employeeBadge.createMany({ data: db.employeeBadges.map(eb => ({
        employeeId: eb.employeeId,
        badgeId: eb.badgeId,
        unlockedAt: eb.unlockedAt
      })) });
    }

    if (db.rewards && db.rewards.length) {
      await tx.reward.createMany({ data: db.rewards.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        pointsRequired: r.pointsRequired,
        stock: r.stock,
        status: r.status
      })) });
    }

    if (db.redemptions && db.redemptions.length) {
      await tx.redemption.createMany({ data: db.redemptions.map(red => ({
        id: red.id,
        employeeId: red.employeeId,
        rewardId: red.rewardId,
        date: red.date,
        pointsSpent: red.pointsSpent
      })) });
    }

    if (db.notifications && db.notifications.length) {
      await tx.notification.createMany({ data: db.notifications.map(n => ({
        id: n.id,
        audience: n.audience,
        type: n.type,
        message: n.message,
        date: n.date,
        read: n.read ?? false
      })) });
    }

    if (db.products && db.products.length) {
      await tx.product.createMany({ data: db.products.map(p => ({
        id: p.id,
        name: p.name,
        weight: Number(p.weight),
        carbonProfile: Number(p.carbonProfile),
        recyclable: p.recyclable
      })) });
    }

    if (db.businessOperations && db.businessOperations.length) {
      await tx.businessOperation.createMany({ data: db.businessOperations.map(op => ({
        id: op.id,
        type: op.type,
        reference: op.reference,
        item: op.item,
        quantity: Number(op.quantity),
        unit: op.unit,
        departmentId: op.departmentId,
        date: op.date,
        processed: op.processed ?? false
      })) });
    }

    if (db.carbonTransactions && db.carbonTransactions.length) {
      await tx.carbonTransaction.createMany({ data: db.carbonTransactions.map(ct => ({
        id: ct.id,
        departmentId: ct.departmentId,
        factorId: ct.factorId,
        source: ct.source,
        units: Number(ct.units),
        emissions: Number(ct.emissions),
        date: ct.date,
        createdBy: ct.createdBy || null
      })) });
    }
  });

  console.log('Full state synchronization complete.');
  res.json({ success: true });
}));

// -------------------------------------------------------------
// REST API: CRUD Endpoints for Key Entities
// -------------------------------------------------------------

// Carbon Transactions
app.get('/api/carbon-transactions', asyncHandler(async (req, res) => {
  const transactions = await prisma.carbonTransaction.findMany({
    orderBy: { date: 'desc' }
  });
  res.json(transactions);
}));

app.post('/api/carbon-transactions', asyncHandler(async (req, res) => {
  const transaction = await prisma.carbonTransaction.create({
    data: req.body
  });
  res.json(transaction);
}));

app.delete('/api/carbon-transactions/:id', asyncHandler(async (req, res) => {
  await prisma.carbonTransaction.delete({
    where: { id: req.params.id }
  });
  res.json({ success: true });
}));

// Goals
app.get('/api/goals', asyncHandler(async (req, res) => {
  const goals = await prisma.goal.findMany();
  res.json(goals);
}));

app.post('/api/goals', asyncHandler(async (req, res) => {
  const goal = await prisma.goal.create({
    data: req.body
  });
  res.json(goal);
}));

app.delete('/api/goals/:id', asyncHandler(async (req, res) => {
  await prisma.goal.delete({
    where: { id: req.params.id }
  });
  res.json({ success: true });
}));

// Compliance Issues
app.get('/api/compliance-issues', asyncHandler(async (req, res) => {
  const issues = await prisma.complianceIssue.findMany();
  res.json(issues);
}));

app.post('/api/compliance-issues', asyncHandler(async (req, res) => {
  const issue = await prisma.complianceIssue.create({
    data: req.body
  });
  res.json(issue);
}));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error handling request:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`EcoSphere Server running at http://localhost:${PORT}`);
});
