/**
 * Philippine Government Employee Deductions & Contributions Calculator
 * Updated rates for 2025-2026
 */

// ===========================
// GSIS (Government Service Insurance System)
// ===========================
export const GSIS_EMPLOYEE_RATE = 0.09;   // 9% personal share
export const GSIS_EMPLOYER_RATE = 0.12;   // 12% government share
export const GSIS_TOTAL_RATE = 0.21;      // 21% total

export function computeGSIS(monthlySalary) {
  const employeeShare = Math.round(monthlySalary * GSIS_EMPLOYEE_RATE * 100) / 100;
  const employerShare = Math.round(monthlySalary * GSIS_EMPLOYER_RATE * 100) / 100;
  return {
    employeeShare,
    employerShare,
    total: Math.round((employeeShare + employerShare) * 100) / 100,
  };
}

// ===========================
// PhilHealth (Philippine Health Insurance Corporation)
// ===========================
export const PHILHEALTH_RATE = 0.05;           // 5% total
export const PHILHEALTH_EMPLOYEE_RATE = 0.025;  // 2.5% employee share
export const PHILHEALTH_FLOOR = 10000;          // Salary floor
export const PHILHEALTH_CEILING = 100000;       // Salary ceiling
export const PHILHEALTH_MIN_CONTRIBUTION = 250; // Min employee share
export const PHILHEALTH_MAX_CONTRIBUTION = 2500; // Max employee share

export function computePhilHealth(monthlySalary) {
  const clampedSalary = Math.max(PHILHEALTH_FLOOR, Math.min(PHILHEALTH_CEILING, monthlySalary));
  const employeeShare = Math.round(clampedSalary * PHILHEALTH_EMPLOYEE_RATE * 100) / 100;
  const employerShare = employeeShare; // Equal sharing
  return {
    employeeShare,
    employerShare,
    total: Math.round((employeeShare + employerShare) * 100) / 100,
  };
}

// ===========================
// Pag-IBIG (HDMF)
// ===========================
export const PAGIBIG_MFS_CAP = 10000;  // Monthly Fund Salary cap
export const PAGIBIG_LOW_THRESHOLD = 1500;

export function computePagIBIG(monthlySalary) {
  let employeeRate, employerRate;

  if (monthlySalary <= PAGIBIG_LOW_THRESHOLD) {
    employeeRate = 0.01; // 1%
    employerRate = 0.02; // 2%
  } else {
    employeeRate = 0.02; // 2%
    employerRate = 0.02; // 2%
  }

  const cappedSalary = Math.min(monthlySalary, PAGIBIG_MFS_CAP);
  const employeeShare = Math.round(cappedSalary * employeeRate * 100) / 100;
  const employerShare = Math.round(cappedSalary * employerRate * 100) / 100;

  return {
    employeeShare, // Max ₱200
    employerShare, // Max ₱200
    total: Math.round((employeeShare + employerShare) * 100) / 100,
  };
}

// ===========================
// Withholding Tax (BIR - TRAIN Law RA 10963)
// ===========================
const TAX_BRACKETS = [
  { min: 0,       max: 250000,   base: 0,        rate: 0.00 },
  { min: 250000,  max: 400000,   base: 0,        rate: 0.15 },
  { min: 400000,  max: 800000,   base: 22500,    rate: 0.20 },
  { min: 800000,  max: 2000000,  base: 102500,   rate: 0.25 },
  { min: 2000000, max: 8000000,  base: 402500,   rate: 0.30 },
  { min: 8000000, max: Infinity, base: 2202500,  rate: 0.35 },
];

export function computeAnnualTax(annualTaxableIncome) {
  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    const bracket = TAX_BRACKETS[i];
    if (annualTaxableIncome > bracket.min) {
      const excess = annualTaxableIncome - bracket.min;
      return Math.round((bracket.base + excess * bracket.rate) * 100) / 100;
    }
  }
  return 0;
}

export function computeMonthlyTax(monthlySalary) {
  // Compute annual taxable income: gross - annual mandatory contributions
  const gsis = computeGSIS(monthlySalary);
  const philhealth = computePhilHealth(monthlySalary);
  const pagibig = computePagIBIG(monthlySalary);

  const monthlyContributions = gsis.employeeShare + philhealth.employeeShare + pagibig.employeeShare;
  const annualTaxableIncome = (monthlySalary - monthlyContributions) * 12;
  const annualTax = computeAnnualTax(annualTaxableIncome);
  const monthlyTax = Math.round((annualTax / 12) * 100) / 100;

  return {
    monthlyTax,
    annualTax,
    annualTaxableIncome: Math.round(annualTaxableIncome * 100) / 100,
    taxBracket: getTaxBracketLabel(annualTaxableIncome),
  };
}

function getTaxBracketLabel(annualTaxable) {
  if (annualTaxable <= 250000) return "0% (Tax Exempt)";
  if (annualTaxable <= 400000) return "15%";
  if (annualTaxable <= 800000) return "20%";
  if (annualTaxable <= 2000000) return "25%";
  if (annualTaxable <= 8000000) return "30%";
  return "35%";
}

// ===========================
// Complete Deductions Summary
// ===========================
export function computeAllDeductions(monthlySalary) {
  const gsis = computeGSIS(monthlySalary);
  const philhealth = computePhilHealth(monthlySalary);
  const pagibig = computePagIBIG(monthlySalary);
  const tax = computeMonthlyTax(monthlySalary);

  const totalEmployeeDeductions =
    gsis.employeeShare + philhealth.employeeShare + pagibig.employeeShare + tax.monthlyTax;

  const totalEmployerContributions =
    gsis.employerShare + philhealth.employerShare + pagibig.employerShare;

  const netPay = Math.round((monthlySalary - totalEmployeeDeductions) * 100) / 100;

  return {
    grossPay: monthlySalary,
    gsis,
    philhealth,
    pagibig,
    tax,
    totalEmployeeDeductions: Math.round(totalEmployeeDeductions * 100) / 100,
    totalEmployerContributions: Math.round(totalEmployerContributions * 100) / 100,
    netPay,
    // Annual computations
    annualGross: monthlySalary * 12,
    annualNet: Math.round(netPay * 12 * 100) / 100,
    annualDeductions: Math.round(totalEmployeeDeductions * 12 * 100) / 100,
  };
}

export default computeAllDeductions;
