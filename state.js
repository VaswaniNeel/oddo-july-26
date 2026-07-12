// Utility function to generate unique IDs
function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Utility function to get today's date in YYYY-MM-DD
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Format date to human-readable format
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Clamp value between min and max
function clamp(val, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

// ESG Themes
const THEMES = {
  ink: "#0d1e1a",
  forest: "#0b5d46",
  forestDark: "#07402f",
  forestLight: "#e7f2ed",
  blue: "#33507a",
  blueLight: "#e8edf5",
  gold: "#b4862e",
  goldLight: "#f7eeda",
  paper: "#0f1916",
  surface: "rgba(22, 37, 33, 0.7)",
  border: "rgba(255, 255, 255, 0.08)",
  muted: "#94a89f",
  danger: "#d9533b",
  dangerLight: "#fceae4"
};

// Seed initial data
function seedData() {
  const departments = [
    { id: "d1", name: "Manufacturing", code: "MFG", head: "R. Kapoor", parentId: "", employeeCount: 120, status: "Active" },
    { id: "d2", name: "Logistics & Fleet", code: "LOG", head: "S. Iyer", parentId: "", employeeCount: 45, status: "Active" },
    { id: "d3", name: "Corporate / HQ", code: "HQ", head: "A. Mehta", parentId: "", employeeCount: 60, status: "Active" },
    { id: "d4", name: "R&D", code: "RND", head: "N. Rao", parentId: "", employeeCount: 30, status: "Active" }
  ];

  const categories = [
    { id: "c1", name: "Tree Plantation", type: "CSR Activity" },
    { id: "c2", name: "Blood Donation", type: "CSR Activity" },
    { id: "c3", name: "Community Cleanup", type: "CSR Activity" },
    { id: "c4", name: "Energy Reduction", type: "Challenge" },
    { id: "c5", name: "Waste Reduction", type: "Challenge" },
    { id: "c6", name: "Commute", type: "Challenge" }
  ];

  const emissionFactors = [
    { id: "ef1", name: "Grid Electricity", unit: "kWh", factor: 0.71, source: "Purchase" },
    { id: "ef2", name: "Diesel (Fleet)", unit: "Litre", factor: 2.68, source: "Fleet" },
    { id: "ef3", name: "Manufacturing Output", unit: "Unit produced", factor: 4.1, source: "Manufacturing" },
    { id: "ef4", name: "Business Travel (Air)", unit: "km", factor: 0.15, source: "Expense" }
  ];

  const carbonTransactions = [
    { id: uid("ct"), departmentId: "d1", factorId: "ef3", source: "Manufacturing", units: 820, emissions: 820 * 4.1, date: "2026-05-04" },
    { id: uid("ct"), departmentId: "d2", factorId: "ef2", source: "Fleet", units: 1450, emissions: 1450 * 2.68, date: "2026-05-11" },
    { id: uid("ct"), departmentId: "d3", factorId: "ef1", source: "Purchase", units: 9800, emissions: 9800 * 0.71, date: "2026-05-14" },
    { id: uid("ct"), departmentId: "d1", factorId: "ef1", source: "Purchase", units: 6200, emissions: 6200 * 0.71, date: "2026-06-03" },
    { id: uid("ct"), departmentId: "d4", factorId: "ef4", source: "Expense", units: 3400, emissions: 3400 * 0.15, date: "2026-06-09" },
    { id: uid("ct"), departmentId: "d2", factorId: "ef2", source: "Fleet", units: 1200, emissions: 1200 * 2.68, date: "2026-06-20" },
    { id: uid("ct"), departmentId: "d1", factorId: "ef3", source: "Manufacturing", units: 690, emissions: 690 * 4.1, date: "2026-07-02" },
    { id: uid("ct"), departmentId: "d3", factorId: "ef1", source: "Purchase", units: 8100, emissions: 8100 * 0.71, date: "2026-07-08" }
  ];

  const goals = [
    { id: "g1", name: "Reduce Fleet Emissions 15%", departmentId: "d2", baseline: 100, target: 15, progress: 62, deadline: "2026-12-31", status: "On Track" },
    { id: "g2", name: "Manufacturing Energy Efficiency", departmentId: "d1", baseline: 100, target: 20, progress: 40, deadline: "2026-11-30", status: "At Risk" },
    { id: "g3", name: "HQ Paperless Operations", departmentId: "d3", baseline: 100, target: 30, progress: 88, deadline: "2026-09-30", status: "On Track" }
  ];

  const policies = [
    { id: "p1", title: "Code of Environmental Conduct", version: "v2.1", description: "Guidelines for minimizing environmental impact across operations.", status: "Published", createdAt: "2026-02-01" },
    { id: "p2", title: "Anti-Bribery & Corruption Policy", version: "v1.4", description: "Governance rules on ethics, gifts, and conflicts of interest.", status: "Published", createdAt: "2026-01-15" },
    { id: "p3", title: "Supplier ESG Code", version: "v1.0", description: "Minimum ESG standards required of third-party suppliers.", status: "Draft", createdAt: "2026-06-20" }
  ];

  const audits = [
    { id: "a1", title: "Q1 Governance Audit", department: "Corporate / HQ", date: "2026-03-20", findings: 2, status: "Closed" },
    { id: "a2", title: "Fleet Emissions Compliance Review", department: "Logistics & Fleet", date: "2026-06-15", findings: 3, status: "In Progress" }
  ];

  const complianceIssues = [
    { id: "ci1", title: "Missing emission logs for May", severity: "Medium", owner: "S. Iyer", dueDate: "2026-07-10", status: "Open", description: "Fleet division missing daily fuel logs for 6 days.", departmentId: "d2" },
    { id: "ci2", title: "Supplier ESG questionnaire overdue", severity: "Low", owner: "A. Mehta", dueDate: "2026-08-01", status: "Open", description: "3 vendors have not returned the ESG self-assessment.", departmentId: "d3" },
    { id: "ci3", title: "Unregistered chemical disposal", severity: "High", owner: "R. Kapoor", dueDate: "2026-06-25", status: "Open", description: "Manufacturing floor 2 disposal not logged in EHS register.", departmentId: "d1" }
  ];

  const csrActivities = [
    { id: "csr1", title: "City Riverbank Tree Plantation", category: "Tree Plantation", description: "Plant saplings along the riverside greenbelt.", date: "2026-07-18", points: 50, status: "Active" },
    { id: "csr2", title: "Quarterly Blood Donation Camp", category: "Blood Donation", description: "On-campus blood donation drive with Red Cross.", date: "2026-07-25", points: 40, status: "Active" },
    { id: "csr3", title: "Beach & Park Cleanup Drive", category: "Community Cleanup", description: "Weekend cleanup at Sector 29 park.", date: "2026-06-28", points: 35, status: "Completed" }
  ];

  const employees = [
    { id: "e1", name: "Priya Sharma", departmentId: "d1", xp: 640, points: 210, avatar: "PS" },
    { id: "e2", name: "Arjun Nair", departmentId: "d2", xp: 910, points: 340, avatar: "AN" },
    { id: "e3", name: "Fatima Sheikh", departmentId: "d3", xp: 1180, points: 505, avatar: "FS" },
    { id: "e4", name: "Karan Verma", departmentId: "d1", xp: 320, points: 90, avatar: "KV" },
    { id: "e5", name: "Meera Iyer", departmentId: "d4", xp: 760, points: 260, avatar: "MI" }
  ];

  const participation = [
    { id: uid("part"), activityId: "csr3", employeeId: "e1", proof: "cleanup_photo.jpg", approvalStatus: "Approved", pointsEarned: 35, completionDate: "2026-06-28" },
    { id: uid("part"), activityId: "csr3", employeeId: "e2", proof: "cleanup_photo2.jpg", approvalStatus: "Approved", pointsEarned: 35, completionDate: "2026-06-28" },
    { id: uid("part"), activityId: "csr1", employeeId: "e1", proof: "", approvalStatus: "Pending", pointsEarned: 0, completionDate: "" }
  ];

  const acknowledgements = [
    { id: uid("ack"), policyId: "p1", employeeId: "e1", acknowledgedAt: "2026-02-05" },
    { id: uid("ack"), policyId: "p2", employeeId: "e1", acknowledgedAt: "2026-01-20" },
    { id: uid("ack"), policyId: "p1", employeeId: "e2", acknowledgedAt: "2026-02-10" }
  ];

  const challenges = [
    { id: "ch1", title: "No-AC Commute Week", category: "Commute", description: "Cycle, walk, or carpool for 5 working days.", xp: 120, difficulty: "Medium", evidenceRequired: true, deadline: "2026-07-20", status: "Active" },
    { id: "ch2", title: "Desk Energy Down", category: "Energy Reduction", description: "Cut personal desk power usage by 20% this month.", xp: 80, difficulty: "Easy", evidenceRequired: false, deadline: "2026-07-31", status: "Active" },
    { id: "ch3", title: "Zero Single-Use Plastic", category: "Waste Reduction", description: "Avoid single-use plastics at work for 2 weeks.", xp: 150, difficulty: "Hard", evidenceRequired: true, deadline: "2026-08-05", status: "Draft" },
    { id: "ch4", title: "Paper Trail Cutback (June)", category: "Waste Reduction", description: "Reduce printed pages by 50%.", xp: 60, difficulty: "Easy", evidenceRequired: false, deadline: "2026-06-30", status: "Completed" }
  ];

  const challengeParticipation = [
    { id: uid("cp"), challengeId: "ch4", employeeId: "e1", progress: 100, proof: "", approval: "Approved", xpAwarded: 60 },
    { id: uid("cp"), challengeId: "ch1", employeeId: "e1", progress: 60, proof: "", approval: "Pending", xpAwarded: 0 },
    { id: uid("cp"), challengeId: "ch2", employeeId: "e1", progress: 100, proof: "", approval: "Under Review", xpAwarded: 0 }
  ];

  const badges = [
    { id: "b1", name: "First Steps", description: "Complete your first challenge.", unlockType: "challenges", unlockValue: 1, icon: "🌱" },
    { id: "b2", name: "Green Streak", description: "Earn 500 XP total.", unlockType: "xp", unlockValue: 500, icon: "🔥" },
    { id: "b3", name: "Sustainability Champion", description: "Earn 1000 XP total.", unlockType: "xp", unlockValue: 1000, icon: "🏆" },
    { id: "b4", name: "Challenge Master", description: "Complete 3 challenges.", unlockType: "challenges", unlockValue: 3, icon: "⭐" }
  ];

  const employeeBadges = [
    { employeeId: "e1", badgeId: "b1", unlockedAt: "2026-06-30" },
    { employeeId: "e2", badgeId: "b1", unlockedAt: "2026-05-10" },
    { employeeId: "e2", badgeId: "b2", unlockedAt: "2026-05-22" },
    { employeeId: "e3", badgeId: "b1", unlockedAt: "2026-04-01" },
    { employeeId: "e3", badgeId: "b2", unlockedAt: "2026-04-18" },
    { employeeId: "e3", badgeId: "b3", unlockedAt: "2026-06-01" }
  ];

  const rewards = [
    { id: "r1", name: "Eco Tote Bag", description: "Organic cotton branded tote.", pointsRequired: 60, stock: 40, status: "Active" },
    { id: "r2", name: "Plant-a-Tree Certificate", description: "A tree planted in your name.", pointsRequired: 100, stock: 200, status: "Active" },
    { id: "r3", name: "Half-Day Off", description: "Redeem for half a day of paid leave.", pointsRequired: 400, stock: 15, status: "Active" },
    { id: "r4", name: "Wireless Earbuds", description: "Refurbished, ethically sourced.", pointsRequired: 350, stock: 0, status: "Active" }
  ];

  const redemptions = [
    { id: uid("red"), employeeId: "e2", rewardId: "r1", date: "2026-05-12", pointsSpent: 60 }
  ];

  const notifications = [
    { id: uid("n"), audience: "all", type: "compliance", message: "New compliance issue raised: Unregistered chemical disposal", date: "2026-06-25", read: false },
    { id: uid("n"), audience: "e1", type: "badge", message: "Badge unlocked: First Steps 🌱", date: "2026-06-30", read: false },
    { id: uid("n"), audience: "all", type: "policy", message: "Reminder: Supplier ESG Code is pending acknowledgement", date: "2026-07-01", read: false }
  ];

  const products = [
    { id: "p01", name: "EcoBottle v1", weight: 0.5, carbonProfile: 1.2, recyclable: true },
    { id: "p02", name: "Bamboo Keyboard", weight: 0.8, carbonProfile: 0.45, recyclable: true },
    { id: "p03", name: "Standard Office Chair", weight: 12.0, carbonProfile: 28.5, recyclable: false }
  ];

  // Daily Business Operations (linked to Auto-Emissions Calculation)
  const businessOperations = [
    { id: uid("op"), type: "Purchase", reference: "PO-9912", item: "Grid Electricity", quantity: 5000, unit: "kWh", departmentId: "d3", date: "2026-07-09", processed: true },
    { id: uid("op"), type: "Fleet", reference: "FL-3304", item: "Diesel fuel refill", quantity: 300, unit: "Litre", departmentId: "d2", date: "2026-07-10", processed: true },
    { id: uid("op"), type: "Manufacturing", reference: "MFG-8802", item: "Units Assembly Line A", quantity: 150, unit: "Unit produced", departmentId: "d1", date: "2026-07-11", processed: false }
  ];

  return {
    departments, categories, emissionFactors, carbonTransactions, goals,
    policies, audits, complianceIssues, csrActivities, employees, participation,
    acknowledgements, challenges, challengeParticipation, badges, employeeBadges,
    rewards, redemptions, notifications, products, businessOperations,
    esgConfig: { weightE: 40, weightS: 30, weightG: 30, autoEmission: true, evidenceRequired: true, badgeAutoAward: true },
    session: { role: "admin", employeeId: "e1" }
  };
}

// Database Operations Wrapper
const dbStore = {
  load() {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/api/data", false); // Synchronous fetch from server
      xhr.send(null);
      if (xhr.status === 200) {
        console.log("Loaded state from MySQL server via Prisma.");
        const data = JSON.parse(xhr.responseText);
        // Sync to local storage for caching/fallback
        try {
          localStorage.setItem("ecosphere_data", xhr.responseText);
        } catch (_) {}
        return data;
      }
    } catch (e) {
      console.error("Failed to load state from MySQL server, falling back to local storage.", e);
    }

    try {
      const data = localStorage.getItem("ecosphere_data");
      if (data) {
        const parsed = JSON.parse(data);
        const seed = seedData();
        Object.keys(seed).forEach(key => {
          if (parsed[key] === undefined) {
            parsed[key] = seed[key];
          }
        });
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
    
    const seed = seedData();
    this.save(seed);
    return seed;
  },
  save(db) {
    // Write locally first for instant local responsiveness
    try {
      localStorage.setItem("ecosphere_data", JSON.stringify(db));
    } catch (e) {
      console.error("Failed to save local storage state", e);
    }

    // Save to server in background
    fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db)
    }).then(res => {
      if (!res.ok) {
        console.error("Failed to save state to server");
      } else {
        console.log("Successfully synchronized state to MySQL server.");
      }
    }).catch(err => {
      console.error("Error saving state to server:", err);
    });
  }
};

// Global interceptor for any direct localStorage writes in the inline HTML scripts
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  if (key === "ecosphere_data") {
    // Trigger background save to server
    try {
      fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: value
      }).then(res => {
        if (!res.ok) console.error("Failed to sync direct localstorage save to MySQL");
        else console.log("Direct localstorage write synced to MySQL via Prisma.");
      }).catch(err => console.error("Sync error:", err));
    } catch (err) {
      console.error("Failed to parse sync data:", err);
    }
  }
  return originalSetItem.apply(this, arguments);
};

// Global DB Reference
window.EcoDB = dbStore.load();

// Score Calculation Engine
function getScores(db) {
  // Environmental: goals progress avg
  const envAvg = db.goals.length
    ? db.goals.reduce((s, g) => s + clamp(g.progress), 0) / db.goals.length
    : 0;

  // Social: CSR participation approval rate (60%) + training completion (40%)
  const approvedPart = db.participation.filter((p) => p.approvalStatus === "Approved").length;
  const totalPart = db.participation.length || 1;
  const participationRate = (approvedPart / totalPart) * 100;
  const trainingMock = 78; // Mock training score
  const socialAvg = participationRate * 0.6 + trainingMock * 0.4;

  // Governance: Policy acknowledgement rate (50%) + Compliance resolution rate (50%)
  const ackCount = db.acknowledgements.length;
  const publishedPolicies = db.policies.filter(p => p.status === "Published").length || 1;
  const possibleAck = db.employees.length * publishedPolicies || 1;
  const ackRate = clamp((ackCount / possibleAck) * 100);
  const resolvedIssues = db.complianceIssues.filter((c) => c.status === "Resolved").length;
  const totalIssues = db.complianceIssues.length || 1;
  const resolveRate = (resolvedIssues / totalIssues) * 100;
  const govAvg = ackRate * 0.5 + resolveRate * 0.5;

  // Weighted ESG Total Score
  const wE = db.esgConfig.weightE / 100;
  const wS = db.esgConfig.weightS / 100;
  const wG = db.esgConfig.weightG / 100;
  const overall = envAvg * wE + socialAvg * wS + govAvg * wG;

  const totalEmissions = db.carbonTransactions.reduce((s, t) => s + t.emissions, 0);

  // Department Breakdown
  const deptScores = db.departments.map((d) => {
    const deptGoals = db.goals.filter((g) => g.departmentId === d.id);
    const e = deptGoals.length ? deptGoals.reduce((s, g) => s + g.progress, 0) / deptGoals.length : envAvg;
    const emissions = db.carbonTransactions.filter((t) => t.departmentId === d.id).reduce((s, t) => s + t.emissions, 0);
    return {
      ...d,
      envScore: Math.round(e),
      emissions: Math.round(emissions),
      total: Math.round(e * wE + socialAvg * wS + govAvg * wG)
    };
  }).sort((a, b) => b.total - a.total);

  return {
    envAvg: Math.round(envAvg),
    socialAvg: Math.round(socialAvg),
    govAvg: Math.round(govAvg),
    overall: Math.round(overall),
    totalEmissions: Math.round(totalEmissions),
    deptScores
  };
}

// In-app Alert / Toast notification helper
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast-alert ${type}`;
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "10px";
  toast.style.background = type === "success" ? "#0b5d46" : type === "danger" ? "#d9533b" : "#b4862e";
  toast.style.color = "#ffffff";
  toast.style.fontSize = "13.5px";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
  toast.style.zIndex = "1000";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.2s ease, transform 0.2s ease";
  toast.style.transform = "translateY(10px)";
  toast.innerText = message;

  document.body.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 50);

  // Automatically fade out
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

// Notification trigger
function triggerNotification(message, audience, type) {
  const db = window.EcoDB;
  db.notifications.unshift({
    id: uid("n"),
    audience,
    type,
    message,
    date: todayISO(),
    read: false
  });
  dbStore.save(db);
  
  // Show standard toast if it is for "all" or matches the current session employee
  const me = db.employees.find(e => e.id === db.session.employeeId) || db.employees[0];
  if (audience === "all" || audience === me.id) {
    showToast(message, type === "compliance" ? "danger" : "info");
  }
}

// Badge Auto-Award Checker
function checkBadgeAutoAward(employeeId) {
  const db = window.EcoDB;
  if (!db.esgConfig.badgeAutoAward) return;

  const emp = db.employees.find(e => e.id === employeeId);
  if (!emp) return;

  // Unlocked challenge participations count
  const completedChallengesCount = db.challengeParticipation.filter(
    cp => cp.employeeId === employeeId && cp.approval === "Approved"
  ).length;

  const myBadges = db.employeeBadges.filter(eb => eb.employeeId === employeeId).map(eb => eb.badgeId);

  db.badges.forEach(b => {
    if (myBadges.includes(b.id)) return; // Already unlocked

    let unlocks = false;
    if (b.unlockType === "xp" && emp.xp >= b.unlockValue) {
      unlocks = true;
    } else if (b.unlockType === "challenges" && completedChallengesCount >= b.unlockValue) {
      unlocks = true;
    }

    if (unlocks) {
      db.employeeBadges.push({
        employeeId,
        badgeId: b.id,
        unlockedAt: todayISO()
      });
      dbStore.save(db);
      triggerNotification(`Badge unlocked: ${b.name} ${b.icon}`, employeeId, "badge");
    }
  });
}

// Process ERP operations automatically if enabled
function processAutoEmissions() {
  const db = window.EcoDB;
  if (!db || !db.esgConfig || !db.esgConfig.autoEmission) return;
  if (!db.businessOperations) {
    db.businessOperations = [];
  }

  let added = false;
  db.businessOperations.forEach(op => {
    if (op.processed) return;

    // Find factor matching the source operation type
    const factor = db.emissionFactors.find(f => f.source === op.type);
    if (!factor) return;

    const emissions = op.quantity * factor.factor;
    db.carbonTransactions.unshift({
      id: uid("ct"),
      departmentId: op.departmentId,
      factorId: factor.id,
      source: op.type,
      units: op.quantity,
      emissions,
      date: op.date
    });

    op.processed = true;
    added = true;
  });

  if (added) {
    dbStore.save(db);
  }
}

// Initial checking on script load
processAutoEmissions();

// Dynamic shared layout generator
document.addEventListener("DOMContentLoaded", () => {
  const layout = document.getElementById("app-layout");
  if (!layout) return;

  // Inject background animation container
  const bgCanvas = document.createElement("div");
  bgCanvas.id = "eco-bg-canvas";
  bgCanvas.innerHTML = `
    <!-- Clouds -->
    <div class="eco-cloud cloud-slow"></div>
    <div class="eco-cloud cloud-fast"></div>
    <div class="eco-cloud cloud-low"></div>
    
    <!-- Breeze Lines -->
    <div class="eco-wind-breeze breeze-1"></div>
    <div class="eco-wind-breeze breeze-2"></div>
    <div class="eco-wind-breeze breeze-3"></div>
    
    <!-- Stylized Geometric Trees -->
    <svg class="eco-tree tree-left" viewBox="0 0 100 150">
      <path d="M50,10 L85,90 L65,90 L75,120 L55,120 L55,145 L45,145 L45,120 L25,120 L35,90 L15,90 Z" fill="var(--blue)" />
    </svg>
    <svg class="eco-tree tree-mid" viewBox="0 0 100 150">
      <path d="M50,20 L80,95 L65,95 L72,125 L55,125 L55,145 L45,145 L45,125 L28,125 L35,95 L20,95 Z" fill="var(--blue)" />
    </svg>
    <svg class="eco-tree tree-right" viewBox="0 0 100 150">
      <path d="M50,5 L90,85 L70,85 L80,115 L60,115 L60,145 L40,145 L40,115 L20,115 L30,85 L10,85 Z" fill="var(--blue)" />
    </svg>

    <!-- Flying Leaves -->
    <div class="eco-leaf-graphic leaf-1">🍃</div>
    <div class="eco-leaf-graphic leaf-2">🍂</div>
    <div class="eco-leaf-graphic leaf-3">🍃</div>
    <div class="eco-leaf-graphic leaf-4">🍂</div>
  `;
  document.body.appendChild(bgCanvas);

  const db = window.EcoDB;
  const role = db.session.role;
  const me = db.employees.find(e => e.id === db.session.employeeId) || db.employees[0];
  const myNotifs = db.notifications.filter(n => n.audience === "all" || n.audience === me.id);
  const unreadCount = myNotifs.filter(n => !n.read).length;

  // Determine current active page filename
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || "index.html";

  // Navigation config matches pages filenames
  const navItems = [
    { key: "index.html", label: "Dashboard", icon: "layout-dashboard" },
    { key: "environmental.html", label: "Environmental", icon: "leaf" },
    { key: "social.html", label: "Social", icon: "users" },
    { key: "governance.html", label: "ShieldCheck", icon: "shield-check" },
    { key: "gamification.html", label: "Gamification", icon: "trophy" },
    { key: "reports.html", label: "Reports", icon: "file-text" },
    { key: "settings.html", label: "Settings", icon: "settings" }
  ];

  // Injected Sidebar Layout
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  
  let navLinksHTML = "";
  navItems.forEach(item => {
    const isActive = filename === item.key || (filename === "" && item.key === "index.html");
    navLinksHTML += `
      <a href="${item.key}" class="sidebar-link ${isActive ? 'active' : ''}">
        <i data-lucide="${item.icon}"></i>
        ${item.label}
      </a>
    `;
  });

  let employeeOptions = "";
  db.employees.forEach(emp => {
    employeeOptions += `<option value="${emp.id}" ${emp.id === me.id ? 'selected' : ''}>${emp.name}</option>`;
  });

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">
        <i data-lucide="leaf" style="color: #dff3e8;"></i>
      </div>
      <span class="sidebar-logo-text">EcoSphere</span>
    </div>
    <nav class="sidebar-nav">
      ${navLinksHTML}
    </nav>
    <div class="sidebar-footer">
      <p class="sidebar-footer-title">Viewing As</p>
      <div class="role-selector">
        <button id="role-admin-btn" class="role-btn ${role === 'admin' ? 'active' : ''}">Admin</button>
        <button id="role-emp-btn" class="role-btn ${role === 'employee' ? 'active' : ''}">Employee</button>
      </div>
      <div id="sidebar-employee-select-container" style="display: ${role === 'employee' ? 'block' : 'none'};">
        <select id="sidebar-employee-select" class="employee-dropdown">
          ${employeeOptions}
        </select>
      </div>
    </div>
  `;

  layout.insertBefore(sidebar, layout.firstChild);

  // Injected Topbar Layout
  const mainWrapper = document.querySelector(".main-wrapper");
  if (mainWrapper) {
    const topbar = document.createElement("header");
    topbar.className = "topbar";

    let notifItemsHTML = "";
    if (myNotifs.length === 0) {
      notifItemsHTML = `<div style="padding: 16px; color: var(--text-muted); text-align: center; font-size: 12.5px;">You're all caught up.</div>`;
    } else {
      myNotifs.slice(0, 10).forEach(n => {
        notifItemsHTML += `
          <div class="notif-item ${n.read ? '' : 'unread'}">
            <p class="notif-item-text">${n.message}</p>
            <p class="notif-item-date">${fmtDate(n.date)}</p>
          </div>
        `;
      });
    }

    topbar.innerHTML = `
      <div class="search-box">
        <i data-lucide="search" style="color: var(--text-muted); width: 16px; height: 16px;"></i>
        <input type="text" placeholder="Search parameters..." id="global-search-bar" />
      </div>
      <div class="topbar-actions">
        <div class="notif-btn-wrapper">
          <button class="notif-btn" id="notif-toggle-btn">
            <i data-lucide="bell" style="width: 18px; height: 18px;"></i>
            ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
          </button>
          <div class="notif-dropdown" id="notif-dropdown-menu">
            <div class="notif-header">
              <span class="notif-header-title">Notifications</span>
              <button class="notif-clear-btn" id="notif-mark-read-btn">Mark all read</button>
            </div>
            <div class="notif-list">
              ${notifItemsHTML}
            </div>
          </div>
        </div>
        <div class="user-profile">
          <div class="user-avatar">${me.avatar}</div>
          <div class="user-info">
            <span class="user-name">${role === 'admin' ? 'Administrator' : me.name}</span>
            <span class="user-role">${role === 'admin' ? 'Admin Access' : (db.departments.find(d => d.id === me.departmentId)?.name || 'HQ')}</span>
          </div>
        </div>
      </div>
    `;
    mainWrapper.insertBefore(topbar, mainWrapper.firstChild);
  }

  // Handle global search bar filtering
  const searchInput = document.getElementById("global-search-bar");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll(".data-table tbody tr");
      const cards = document.querySelectorAll(".challenge-grid .challenge-card, .grid-cols-3 .card");
      
      rows.forEach(r => {
        const txt = r.textContent.toLowerCase();
        r.style.display = txt.includes(q) ? "" : "none";
      });

      cards.forEach(c => {
        // Skip cabinet/recent details titles card if matching
        if (c.querySelector(".card-title")?.textContent.includes("Cabinet")) return;
        const txt = c.textContent.toLowerCase();
        c.style.display = txt.includes(q) ? "" : "none";
      });
    });
  }

  // Handle Role / User session switches
  const adminBtn = document.getElementById("role-admin-btn");
  const empBtn = document.getElementById("role-emp-btn");
  const empSelectContainer = document.getElementById("sidebar-employee-select-container");
  const empSelect = document.getElementById("sidebar-employee-select");

  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      db.session.role = "admin";
      dbStore.save(db);
      window.location.reload();
    });
  }

  if (empBtn) {
    empBtn.addEventListener("click", () => {
      db.session.role = "employee";
      dbStore.save(db);
      window.location.reload();
    });
  }

  if (empSelect) {
    empSelect.addEventListener("change", (e) => {
      db.session.employeeId = e.target.value;
      dbStore.save(db);
      window.location.reload();
    });
  }

  const notifToggle = document.getElementById("notif-toggle-btn");
  const notifDropdown = document.getElementById("notif-dropdown-menu");
  if (notifToggle && notifDropdown) {
    notifToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle("show");
    });
    document.addEventListener("click", () => {
      notifDropdown.classList.remove("show");
    });
  }

  const markReadBtn = document.getElementById("notif-mark-read-btn");
  if (markReadBtn) {
    markReadBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      db.notifications.forEach(n => {
        if (n.audience === "all" || n.audience === me.id) {
          n.read = true;
        }
      });
      dbStore.save(db);
      window.location.reload();
    });
  }

  // Load Lucide icons dynamically if Lucide library is present
  if (window.lucide) {
    window.lucide.createIcons();
  }
});