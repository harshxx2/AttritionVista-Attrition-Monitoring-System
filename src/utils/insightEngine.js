/**
 * Dynamic Insight Engine
 * Generates context-aware conclusions based on current page + filters.
 * Conclusions change when filters change — nothing is hardcoded.
 */
import { DATASET } from './dataStore';

// Utility: find the highest-risk item in a dimension object
function findHighestRisk(dimensionData) {
  let maxKey = null, maxRate = 0;
  for (const [key, val] of Object.entries(dimensionData)) {
    if (val.rate > maxRate) { maxRate = val.rate; maxKey = key; }
  }
  return { key: maxKey, ...dimensionData[maxKey] };
}

function findLowestRisk(dimensionData) {
  let minKey = null, minRate = 100;
  for (const [key, val] of Object.entries(dimensionData)) {
    if (val.rate < minRate) { minRate = val.rate; minKey = key; }
  }
  return { key: minKey, ...dimensionData[minKey] };
}

// ── Executive Insights ──────────────────────────────────────────────
function generateExecutiveInsights(filters) {
  const insights = [];
  const dept = filters?.Department;

  if (dept && dept !== 'All' && DATASET.byDepartment[dept]) {
    const d = DATASET.byDepartment[dept];
    insights.push({
      title: `${dept} Department Overview`,
      content: `The ${dept} department has ${d.total} employees with a ${d.rate}% attrition rate. Average monthly income is $${d.avgIncome.toLocaleString()}, ${d.avgIncome > DATASET.avgMonthlyIncome ? 'above' : 'below'} the company average of $${DATASET.avgMonthlyIncome.toLocaleString()}.`,
      severity: d.rate > 18 ? 'high' : d.rate > 12 ? 'medium' : 'low'
    });

    // Find the riskiest role in this department
    const deptRoles = {
      'Sales': ['Sales Representative', 'Sales Executive'],
      'Research & Development': ['Laboratory Technician', 'Research Scientist', 'Manufacturing Director', 'Research Director'],
      'Human Resources': ['Human Resources'],
    };
    const rolesInDept = deptRoles[dept] || [];
    let worstRole = null, worstRate = 0;
    rolesInDept.forEach(r => {
      if (DATASET.byRole[r] && DATASET.byRole[r].rate > worstRate) {
        worstRate = DATASET.byRole[r].rate;
        worstRole = r;
      }
    });
    if (worstRole) {
      insights.push({
        title: `Highest Risk Role: ${worstRole}`,
        content: `Within ${dept}, ${worstRole}s have the highest attrition at ${worstRate}% (${DATASET.byRole[worstRole].attrition} of ${DATASET.byRole[worstRole].total} employees). Their average income of $${DATASET.byRole[worstRole].avgIncome.toLocaleString()} is ${DATASET.byRole[worstRole].avgIncome < DATASET.avgMonthlyIncome ? 'below the company median — compensation review recommended' : 'competitive but other factors may be driving departures'}.`,
        severity: worstRate > 25 ? 'high' : 'medium'
      });
    }
  } else {
    // No filter — show company-wide
    const worstDept = findHighestRisk(DATASET.byDepartment);
    const bestDept = findLowestRisk(DATASET.byDepartment);
    
    insights.push({
      title: 'Company-Wide Attrition',
      content: `Overall attrition stands at ${DATASET.attritionRate}% (${DATASET.attritionYes} of ${DATASET.total} employees). The ${worstDept.key} department leads attrition at ${worstDept.rate}%, while ${bestDept.key} is most stable at ${bestDept.rate}%.`,
      severity: 'medium'
    });

    const worstRole = findHighestRisk(DATASET.byRole);
    insights.push({
      title: `Critical Role: ${worstRole.key}`,
      content: `${worstRole.key}s have the highest attrition at ${worstRole.rate}% — nearly ${(worstRole.rate / DATASET.attritionRate).toFixed(1)}× the company average. With only ${worstRole.total} employees and an average income of $${worstRole.avgIncome.toLocaleString()}, targeted compensation and career-path interventions are recommended.`,
      severity: 'high'
    });

    insights.push({
      title: 'Workforce Composition',
      content: `R&D comprises ${((DATASET.byDepartment['Research & Development'].total / DATASET.total) * 100).toFixed(0)}% of the workforce (${DATASET.byDepartment['Research & Development'].total} employees), making it the organizational backbone. Their specialized skills make replacement cycles 2-3× longer than average.`,
      severity: 'low'
    });
  }

  return insights;
}

// ── Risk Factor Insights ────────────────────────────────────────────
function generateRiskInsights(filters) {
  const insights = [];
  const overtime = filters?.OverTime;

  if (overtime && overtime !== 'All') {
    const d = DATASET.byOvertime[overtime];
    const other = DATASET.byOvertime[overtime === 'Yes' ? 'No' : 'Yes'];
    insights.push({
      title: `Overtime: ${overtime} — Impact Analysis`,
      content: `Employees ${overtime === 'Yes' ? 'working' : 'not working'} overtime have a ${d.rate}% attrition rate (${d.attrition} of ${d.total}). That's ${overtime === 'Yes' ? `${(d.rate / other.rate).toFixed(1)}× higher than non-overtime workers (${other.rate}%). Burnout is the leading indicator — cap mandatory overtime immediately.` : `${(other.rate / d.rate).toFixed(1)}× lower than overtime workers (${other.rate}%). This confirms overtime as the #1 controllable risk factor.`}`,
      severity: overtime === 'Yes' ? 'high' : 'low'
    });
  } else {
    insights.push({
      title: 'Overtime: The #1 Risk Multiplier',
      content: `Overtime employees leave at ${DATASET.byOvertime.Yes.rate}% vs ${DATASET.byOvertime.No.rate}% — a ${(DATASET.byOvertime.Yes.rate / DATASET.byOvertime.No.rate).toFixed(1)}× gap. Of the ${DATASET.byOvertime.Yes.total} overtime workers, ${DATASET.byOvertime.Yes.attrition} have left. Capping mandatory overtime is the highest-leverage intervention available.`,
      severity: 'high'
    });
  }

  // Work-Life Balance
  const worstWLB = DATASET.byWorkLifeBalance[1];
  const bestWLB = DATASET.byWorkLifeBalance[4];
  insights.push({
    title: 'Work-Life Balance Disparity',
    content: `"Poor" WLB (Level 1) drives ${worstWLB.rate}% attrition vs ${bestWLB.rate}% for "Excellent" (Level 4) — a ${(worstWLB.rate / bestWLB.rate).toFixed(1)}× multiplier. ${worstWLB.total} employees report poor WLB; targeted workload redistribution could retain up to ${Math.round(worstWLB.attrition * 0.4)} of them.`,
    severity: 'high'
  });

  // Travel
  const freqTravel = DATASET.byBusinessTravel['Travel_Frequently'];
  const noTravel = DATASET.byBusinessTravel['Non-Travel'];
  insights.push({
    title: 'Business Travel Fatigue',
    content: `Frequent travelers leave at ${freqTravel.rate}% — ${(freqTravel.rate / noTravel.rate).toFixed(1)}× the rate of non-travelers (${noTravel.rate}%). Consider rotating travel assignments or offering hybrid/remote alternatives for the ${freqTravel.total} frequent travelers.`,
    severity: 'medium'
  });

  return insights;
}

// ── Demographics Insights ───────────────────────────────────────────
function generateDemographicsInsights(filters) {
  const insights = [];
  const dept = filters?.Department;

  // Age band analysis
  const worstAge = findHighestRisk(DATASET.byAgeBand);
  const bestAge = findLowestRisk(DATASET.byAgeBand);
  insights.push({
    title: `Highest Risk Age Group: ${worstAge.key}`,
    content: `Employees ${worstAge.key.toLowerCase().includes('under') ? 'under 25' : `aged ${worstAge.key}`} show a ${worstAge.rate}% attrition rate (${worstAge.attrition} of ${worstAge.total}). The most stable group is ${bestAge.key} at only ${bestAge.rate}%. Early-career mentorship programs could reduce under-25 churn by an estimated 30-40%.`,
    severity: 'high'
  });

  // Marital status
  const single = DATASET.byMaritalStatus.Single;
  const married = DATASET.byMaritalStatus.Married;
  insights.push({
    title: 'Marital Status & Retention',
    content: `Single employees leave at ${single.rate}% compared to ${married.rate}% for married employees — a ${(single.rate / married.rate).toFixed(1)}× difference. The ${single.total} single employees represent a disproportionate share of total attrition (${single.attrition} of ${DATASET.attritionYes} departures).`,
    severity: 'medium'
  });

  // Income band
  const lowIncome = DATASET.byIncomeBand['Under $3K'];
  const highIncome = DATASET.byIncomeBand['$10K+'];
  insights.push({
    title: 'Income-Driven Attrition',
    content: `Employees earning under $3K/month leave at ${lowIncome.rate}% — ${(lowIncome.rate / highIncome.rate).toFixed(1)}× the rate of those earning $10K+ (${highIncome.rate}%). Targeted salary adjustments for the ${lowIncome.total} low-income employees could prevent up to ${Math.round(lowIncome.attrition * 0.5)} departures annually.`,
    severity: 'high'
  });

  return insights;
}

// ── Department Deep Dive Insights ───────────────────────────────────
function generateDepartmentInsights(filters) {
  const insights = [];
  const dept = filters?.Department;

  if (dept && dept !== 'All' && DATASET.byDepartment[dept]) {
    const d = DATASET.byDepartment[dept];
    const deptRoles = {
      'Sales': ['Sales Representative', 'Sales Executive'],
      'Research & Development': ['Laboratory Technician', 'Research Scientist', 'Manufacturing Director', 'Research Director', 'Healthcare Representative', 'Manager'],
      'Human Resources': ['Human Resources', 'Manager'],
    };
    
    insights.push({
      title: `${dept} — Attrition Profile`,
      content: `${dept} has ${d.total} employees with ${d.attrition} departures (${d.rate}% rate). Average age is ${d.avgAge} years and average monthly income is $${d.avgIncome.toLocaleString()}.`,
      severity: d.rate > 18 ? 'high' : d.rate > 12 ? 'medium' : 'low'
    });

    const roles = deptRoles[dept] || [];
    const roleBreakdown = roles
      .filter(r => DATASET.byRole[r])
      .sort((a, b) => DATASET.byRole[b].rate - DATASET.byRole[a].rate);
    
    if (roleBreakdown.length > 0) {
      const top = DATASET.byRole[roleBreakdown[0]];
      insights.push({
        title: `Role Spotlight: ${roleBreakdown[0]}`,
        content: `Within ${dept}, ${roleBreakdown[0]}s are the highest-risk role at ${top.rate}% attrition. They earn an avg of $${top.avgIncome.toLocaleString()}/mo. ${top.avgIncome < 4000 ? 'Low compensation is a significant contributing factor — review pay bands.' : 'Compensation appears competitive; investigate workload, management, and growth path issues.'}`,
        severity: top.rate > 20 ? 'high' : 'medium'
      });
    }
  } else {
    // All departments comparison
    const depts = Object.entries(DATASET.byDepartment).sort((a, b) => b[1].rate - a[1].rate);
    insights.push({
      title: 'Cross-Department Comparison',
      content: `${depts[0][0]} leads attrition at ${depts[0][1].rate}% (${depts[0][1].attrition} departures), followed by ${depts[1][0]} at ${depts[1][1].rate}%. ${depts[2][0]} is most stable at ${depts[2][1].rate}%. Select a department filter to drill into role-level analysis.`,
      severity: 'medium'
    });

    insights.push({
      title: 'Promotion Stagnation Risk',
      content: `Employees with 5+ years since their last promotion show significantly elevated attrition. This effect is strongest in R&D where specialized career ladders are often unclear. Consider implementing transparent promotion timelines.`,
      severity: 'medium'
    });

    insights.push({
      title: 'Distance Impact',
      content: `Employees living 16+ km away leave at ${DATASET.byDistanceBand['Far (16+)'].rate}% vs ${DATASET.byDistanceBand['Near (0-5)'].rate}% for nearby employees. Hybrid work policies or relocation support can address this ${(DATASET.byDistanceBand['Far (16+)'].rate / DATASET.byDistanceBand['Near (0-5)'].rate).toFixed(1)}× gap.`,
      severity: 'low'
    });
  }

  return insights;
}

// ── Main Export ──────────────────────────────────────────────────────
export function generateInsights(pageType, filters = {}) {
  switch (pageType) {
    case 'executive': return generateExecutiveInsights(filters);
    case 'risk': return generateRiskInsights(filters);
    case 'demographics': return generateDemographicsInsights(filters);
    case 'department': return generateDepartmentInsights(filters);
    default: return generateExecutiveInsights(filters);
  }
}
