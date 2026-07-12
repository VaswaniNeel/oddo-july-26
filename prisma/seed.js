const prisma = require('./db');

async function main() {
  console.log('Seeding database...');

  // 1. EsgConfig
  await prisma.esgConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      weightE: 40,
      weightS: 30,
      weightG: 30,
      autoEmission: true,
      evidenceRequired: true,
      badgeAutoAward: true,
    },
  });

  // 2. Departments
  const departments = [
    { id: "d1", name: "Manufacturing", code: "MFG", head: "R. Kapoor", parentId: "", employeeCount: 120, status: "Active" },
    { id: "d2", name: "Logistics & Fleet", code: "LOG", head: "S. Iyer", parentId: "", employeeCount: 45, status: "Active" },
    { id: "d3", name: "Corporate / HQ", code: "HQ", head: "A. Mehta", parentId: "", employeeCount: 60, status: "Active" },
    { id: "d4", name: "R&D", code: "RND", head: "N. Rao", parentId: "", employeeCount: 30, status: "Active" }
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.id },
      update: dept,
      create: dept,
    });
  }

  // 3. Employees
  const employees = [
    { id: "e1", name: "Priya Sharma", departmentId: "d1", xp: 640, points: 210, avatar: "PS", role: "admin", email: "priya@ecosphere.com" },
    { id: "e2", name: "Arjun Nair", departmentId: "d2", xp: 910, points: 340, avatar: "AN", role: "employee", email: "arjun@ecosphere.com" },
    { id: "e3", name: "Fatima Sheikh", departmentId: "d3", xp: 1180, points: 505, avatar: "FS", role: "employee", email: "fatima@ecosphere.com" },
    { id: "e4", name: "Karan Verma", departmentId: "d1", xp: 320, points: 90, avatar: "KV", role: "employee", email: "karan@ecosphere.com" },
    { id: "e5", name: "Meera Iyer", departmentId: "d4", xp: 760, points: 260, avatar: "MI", role: "employee", email: "meera@ecosphere.com" }
  ];

  for (const emp of employees) {
    await prisma.employee.upsert({
      where: { id: emp.id },
      update: emp,
      create: emp,
    });
  }

  // 4. Emission Factors
  const emissionFactors = [
    { id: "ef1", name: "Grid Electricity", unit: "kWh", factor: 0.71, source: "Purchase" },
    { id: "ef2", name: "Diesel (Fleet)", unit: "Litre", factor: 2.68, source: "Fleet" },
    { id: "ef3", name: "Manufacturing Output", unit: "Unit produced", factor: 4.1, source: "Manufacturing" },
    { id: "ef4", name: "Business Travel (Air)", unit: "km", factor: 0.15, source: "Expense" }
  ];

  for (const ef of emissionFactors) {
    await prisma.emissionFactor.upsert({
      where: { id: ef.id },
      update: ef,
      create: ef,
    });
  }

  // 5. Carbon Transactions
  const carbonTransactions = [
    { id: "ct_seed_1", departmentId: "d1", factorId: "ef3", source: "Manufacturing", units: 820, emissions: 820 * 4.1, date: "2026-05-04" },
    { id: "ct_seed_2", departmentId: "d2", factorId: "ef2", source: "Fleet", units: 1450, emissions: 1450 * 2.68, date: "2026-05-11" },
    { id: "ct_seed_3", departmentId: "d3", factorId: "ef1", source: "Purchase", units: 9800, emissions: 9800 * 0.71, date: "2026-05-14" },
    { id: "ct_seed_4", departmentId: "d1", factorId: "ef1", source: "Purchase", units: 6200, emissions: 6200 * 0.71, date: "2026-06-03" },
    { id: "ct_seed_5", departmentId: "d4", factorId: "ef4", source: "Expense", units: 3400, emissions: 3400 * 0.15, date: "2026-06-09" },
    { id: "ct_seed_6", departmentId: "d2", factorId: "ef2", source: "Fleet", units: 1200, emissions: 1200 * 2.68, date: "2026-06-20" },
    { id: "ct_seed_7", departmentId: "d1", factorId: "ef3", source: "Manufacturing", units: 690, emissions: 690 * 4.1, date: "2026-07-02" },
    { id: "ct_seed_8", departmentId: "d3", factorId: "ef1", source: "Purchase", units: 8100, emissions: 8100 * 0.71, date: "2026-07-08" }
  ];

  for (const ct of carbonTransactions) {
    await prisma.carbonTransaction.upsert({
      where: { id: ct.id },
      update: ct,
      create: ct,
    });
  }

  // 6. Goals
  const goals = [
    { id: "g1", name: "Reduce Fleet Emissions 15%", departmentId: "d2", baseline: 100, target: 15, progress: 62, deadline: "2026-12-31", status: "On Track" },
    { id: "g2", name: "Manufacturing Energy Efficiency", departmentId: "d1", baseline: 100, target: 20, progress: 40, deadline: "2026-11-30", status: "At Risk" },
    { id: "g3", name: "HQ Paperless Operations", departmentId: "d3", baseline: 100, target: 30, progress: 88, deadline: "2026-09-30", status: "On Track" }
  ];

  for (const goal of goals) {
    await prisma.goal.upsert({
      where: { id: goal.id },
      update: goal,
      create: goal,
    });
  }

  // 7. Policies
  const policies = [
    { id: "p1", title: "Code of Environmental Conduct", version: "v2.1", description: "Guidelines for minimizing environmental impact across operations.", status: "Published", createdAt: "2026-02-01" },
    { id: "p2", title: "Anti-Bribery & Corruption Policy", version: "v1.4", description: "Governance rules on ethics, gifts, and conflicts of interest.", status: "Published", createdAt: "2026-01-15" },
    { id: "p3", title: "Supplier ESG Code", version: "v1.0", description: "Minimum ESG standards required of third-party suppliers.", status: "Draft", createdAt: "2026-06-20" }
  ];

  for (const policy of policies) {
    await prisma.policy.upsert({
      where: { id: policy.id },
      update: policy,
      create: policy,
    });
  }

  // 8. Audits
  const audits = [
    { id: "a1", title: "Q1 Governance Audit", department: "Corporate / HQ", date: "2026-03-20", findings: 2, status: "Closed" },
    { id: "a2", title: "Fleet Emissions Compliance Review", department: "Logistics & Fleet", date: "2026-06-15", findings: 3, status: "In Progress" }
  ];

  for (const audit of audits) {
    await prisma.audit.upsert({
      where: { id: audit.id },
      update: audit,
      create: audit,
    });
  }

  // 9. Compliance Issues
  const complianceIssues = [
    { id: "ci1", title: "Missing emission logs for May", severity: "Medium", owner: "S. Iyer", dueDate: "2026-07-10", status: "Open", description: "Fleet division missing daily fuel logs for 6 days.", departmentId: "d2" },
    { id: "ci2", title: "Supplier ESG questionnaire overdue", severity: "Low", owner: "A. Mehta", dueDate: "2026-08-01", status: "Open", description: "3 vendors have not returned the ESG self-assessment.", departmentId: "d3" },
    { id: "ci3", title: "Unregistered chemical disposal", severity: "High", owner: "R. Kapoor", dueDate: "2026-06-25", status: "Open", description: "Manufacturing floor 2 disposal not logged in EHS register.", departmentId: "d1" }
  ];

  for (const issue of complianceIssues) {
    await prisma.complianceIssue.upsert({
      where: { id: issue.id },
      update: issue,
      create: issue,
    });
  }

  // 10. CSR Activities
  const csrActivities = [
    { id: "csr1", title: "City Riverbank Tree Plantation", category: "Tree Plantation", description: "Plant saplings along the riverside greenbelt.", date: "2026-07-18", points: 50, status: "Active" },
    { id: "csr2", title: "Quarterly Blood Donation Camp", category: "Blood Donation", description: "On-campus blood donation drive with Red Cross.", date: "2026-07-25", points: 40, status: "Active" },
    { id: "csr3", title: "Beach & Park Cleanup Drive", category: "Community Cleanup", description: "Weekend cleanup at Sector 29 park.", date: "2026-06-28", points: 35, status: "Completed" }
  ];

  for (const csr of csrActivities) {
    await prisma.csrActivity.upsert({
      where: { id: csr.id },
      update: csr,
      create: csr,
    });
  }

  // 11. CSR Participation
  const participation = [
    { id: "part_1", activityId: "csr3", employeeId: "e1", proof: "cleanup_photo.jpg", approvalStatus: "Approved", pointsEarned: 35, completionDate: "2026-06-28" },
    { id: "part_2", activityId: "csr3", employeeId: "e2", proof: "cleanup_photo2.jpg", approvalStatus: "Approved", pointsEarned: 35, completionDate: "2026-06-28" },
    { id: "part_3", activityId: "csr1", employeeId: "e1", proof: "", approvalStatus: "Pending", pointsEarned: 0, completionDate: "" }
  ];

  for (const part of participation) {
    await prisma.participation.upsert({
      where: { id: part.id },
      update: part,
      create: part,
    });
  }

  // 12. Acknowledgements
  const acknowledgements = [
    { id: "ack_1", policyId: "p1", employeeId: "e1", acknowledgedAt: "2026-02-05" },
    { id: "ack_2", policyId: "p2", employeeId: "e1", acknowledgedAt: "2026-01-20" },
    { id: "ack_3", policyId: "p1", employeeId: "e2", acknowledgedAt: "2026-02-10" }
  ];

  for (const ack of acknowledgements) {
    await prisma.acknowledgement.upsert({
      where: { id: ack.id },
      update: ack,
      create: ack,
    });
  }

  // 13. Challenges
  const challenges = [
    { id: "ch1", title: "No-AC Commute Week", category: "Commute", description: "Cycle, walk, or carpool for 5 working days.", xp: 120, difficulty: "Medium", evidenceRequired: true, deadline: "2026-07-20", status: "Active" },
    { id: "ch2", title: "Desk Energy Down", category: "Energy Reduction", description: "Cut personal desk power usage by 20% this month.", xp: 80, difficulty: "Easy", evidenceRequired: false, deadline: "2026-07-31", status: "Active" },
    { id: "ch3", title: "Zero Single-Use Plastic", category: "Waste Reduction", description: "Avoid single-use plastics at work for 2 weeks.", xp: 150, difficulty: "Hard", evidenceRequired: true, deadline: "2026-08-05", status: "Draft" },
    { id: "ch4", title: "Paper Trail Cutback (June)", category: "Waste Reduction", description: "Reduce printed pages by 50%.", xp: 60, difficulty: "Easy", evidenceRequired: false, deadline: "2026-06-30", status: "Completed" }
  ];

  for (const ch of challenges) {
    await prisma.challenge.upsert({
      where: { id: ch.id },
      update: ch,
      create: ch,
    });
  }

  // 14. Challenge Participation
  const challengeParticipation = [
    { id: "cp_1", challengeId: "ch4", employeeId: "e1", progress: 100, proof: "", approval: "Approved", xpAwarded: 60 },
    { id: "cp_2", challengeId: "ch1", employeeId: "e1", progress: 60, proof: "", approval: "Pending", xpAwarded: 0 },
    { id: "cp_3", challengeId: "ch2", employeeId: "e1", progress: 100, proof: "", approval: "Under Review", xpAwarded: 0 }
  ];

  for (const cp of challengeParticipation) {
    await prisma.challengeParticipation.upsert({
      where: { id: cp.id },
      update: cp,
      create: cp,
    });
  }

  // 15. Badges
  const badges = [
    { id: "b1", name: "First Steps", description: "Complete your first challenge.", unlockType: "challenges", unlockValue: 1, icon: "🌱" },
    { id: "b2", name: "Green Streak", description: "Earn 500 XP total.", unlockType: "xp", unlockValue: 500, icon: "🔥" },
    { id: "b3", name: "Sustainability Champion", description: "Earn 1000 XP total.", unlockType: "xp", unlockValue: 1000, icon: "🏆" },
    { id: "b4", name: "Challenge Master", description: "Complete 3 challenges.", unlockType: "challenges", unlockValue: 3, icon: "⭐" }
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: badge,
      create: badge,
    });
  }

  // 16. Employee Badges
  const employeeBadges = [
    { employeeId: "e1", badgeId: "b1", unlockedAt: "2026-06-30" },
    { employeeId: "e2", badgeId: "b1", unlockedAt: "2026-05-10" },
    { employeeId: "e2", badgeId: "b2", unlockedAt: "2026-05-22" },
    { employeeId: "e3", badgeId: "b1", unlockedAt: "2026-04-01" },
    { employeeId: "e3", badgeId: "b2", unlockedAt: "2026-04-18" },
    { employeeId: "e3", badgeId: "b3", unlockedAt: "2026-06-01" }
  ];

  for (const eb of employeeBadges) {
    await prisma.employeeBadge.upsert({
      where: {
        employeeId_badgeId: {
          employeeId: eb.employeeId,
          badgeId: eb.badgeId
        }
      },
      update: eb,
      create: eb,
    });
  }

  // 17. Rewards
  const rewards = [
    { id: "r1", name: "Eco Tote Bag", description: "Organic cotton branded tote.", pointsRequired: 60, stock: 40, status: "Active" },
    { id: "r2", name: "Plant-a-Tree Certificate", description: "A tree planted in your name.", pointsRequired: 100, stock: 200, status: "Active" },
    { id: "r3", name: "Half-Day Off", description: "Redeem for half a day of paid leave.", pointsRequired: 400, stock: 15, status: "Active" },
    { id: "r4", name: "Wireless Earbuds", description: "Refurbished, ethically sourced.", pointsRequired: 350, stock: 0, status: "Active" }
  ];

  for (const reward of rewards) {
    await prisma.reward.upsert({
      where: { id: reward.id },
      update: reward,
      create: reward,
    });
  }

  // 18. Redemptions
  const redemptions = [
    { id: "red_1", employeeId: "e2", rewardId: "r1", date: "2026-05-12", pointsSpent: 60 }
  ];

  for (const red of redemptions) {
    await prisma.redemption.upsert({
      where: { id: red.id },
      update: red,
      create: red,
    });
  }

  // 19. Products
  const products = [
    { id: "p01", name: "EcoBottle v1", weight: 0.5, carbonProfile: 1.2, recyclable: true },
    { id: "p02", name: "Bamboo Keyboard", weight: 0.8, carbonProfile: 0.45, recyclable: true },
    { id: "p03", name: "Standard Office Chair", weight: 12.0, carbonProfile: 28.5, recyclable: false }
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod,
    });
  }

  // 20. Business Operations
  const businessOperations = [
    { id: "op_1", type: "Purchase", reference: "PO-9912", item: "Grid Electricity", quantity: 5000, unit: "kWh", departmentId: "d3", date: "2026-07-09", processed: true },
    { id: "op_2", type: "Fleet", reference: "FL-3304", item: "Diesel fuel refill", quantity: 300, unit: "Litre", departmentId: "d2", date: "2026-07-10", processed: true },
    { id: "op_3", type: "Manufacturing", reference: "MFG-8802", item: "Units Assembly Line A", quantity: 150, unit: "Unit produced", departmentId: "d1", date: "2026-07-11", processed: false }
  ];

  for (const op of businessOperations) {
    await prisma.businessOperation.upsert({
      where: { id: op.id },
      update: op,
      create: op,
    });
  }

  // 21. Notifications
  const notifications = [
    { id: "n_1", audience: "all", type: "compliance", message: "New compliance issue raised: Unregistered chemical disposal", date: "2026-06-25", read: false },
    { id: "n_2", audience: "e1", type: "badge", message: "Badge unlocked: First Steps 🌱", date: "2026-06-30", read: false },
    { id: "n_3", audience: "all", type: "policy", message: "Reminder: Supplier ESG Code is pending acknowledgement", date: "2026-07-01", read: false }
  ];

  for (const notif of notifications) {
    await prisma.notification.upsert({
      where: { id: notif.id },
      update: notif,
      create: notif,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
