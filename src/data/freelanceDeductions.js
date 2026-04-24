/**
 * Philippine Freelance / Self-Employed Contributions & Tax Calculator
 * SSS, PhilHealth, Pag-IBIG for self-employed
 * Tax: 8% flat rate OR graduated (TRAIN Law)
 */

// ===========================
// SSS (Social Security System) — Self-Employed
// ===========================
// Self-employed pay the full 14% based on their Monthly Salary Credit (MSC)
// MSC brackets (2025 schedule)
const SSS_RATE = 0.14;

const SSS_TABLE = [
  { minIncome: 0,      maxIncome: 4249,   msc: 4000 },
  { minIncome: 4250,   maxIncome: 4749,   msc: 4500 },
  { minIncome: 4750,   maxIncome: 5249,   msc: 5000 },
  { minIncome: 5250,   maxIncome: 5749,   msc: 5500 },
  { minIncome: 5750,   maxIncome: 6249,   msc: 6000 },
  { minIncome: 6250,   maxIncome: 6749,   msc: 6500 },
  { minIncome: 6750,   maxIncome: 7249,   msc: 7000 },
  { minIncome: 7250,   maxIncome: 7749,   msc: 7500 },
  { minIncome: 7750,   maxIncome: 8249,   msc: 8000 },
  { minIncome: 8250,   maxIncome: 8749,   msc: 8500 },
  { minIncome: 8750,   maxIncome: 9249,   msc: 9000 },
  { minIncome: 9250,   maxIncome: 9749,   msc: 9500 },
  { minIncome: 9750,   maxIncome: 10249,  msc: 10000 },
  { minIncome: 10250,  maxIncome: 10749,  msc: 10500 },
  { minIncome: 10750,  maxIncome: 11249,  msc: 11000 },
  { minIncome: 11250,  maxIncome: 11749,  msc: 11500 },
  { minIncome: 11750,  maxIncome: 12249,  msc: 12000 },
  { minIncome: 12250,  maxIncome: 12749,  msc: 12500 },
  { minIncome: 12750,  maxIncome: 13249,  msc: 13000 },
  { minIncome: 13250,  maxIncome: 13749,  msc: 13500 },
  { minIncome: 13750,  maxIncome: 14249,  msc: 14000 },
  { minIncome: 14250,  maxIncome: 14749,  msc: 14500 },
  { minIncome: 14750,  maxIncome: 15249,  msc: 15000 },
  { minIncome: 15250,  maxIncome: 15749,  msc: 15500 },
  { minIncome: 15750,  maxIncome: 16249,  msc: 16000 },
  { minIncome: 16250,  maxIncome: 16749,  msc: 16500 },
  { minIncome: 16750,  maxIncome: 17249,  msc: 17000 },
  { minIncome: 17250,  maxIncome: 17749,  msc: 17500 },
  { minIncome: 17750,  maxIncome: 18249,  msc: 18000 },
  { minIncome: 18250,  maxIncome: 18749,  msc: 18500 },
  { minIncome: 18750,  maxIncome: 19249,  msc: 19000 },
  { minIncome: 19250,  maxIncome: 19749,  msc: 19500 },
  { minIncome: 19750,  maxIncome: 20249,  msc: 20000 },
  { minIncome: 20250,  maxIncome: 20749,  msc: 20500 },
  { minIncome: 20750,  maxIncome: 21249,  msc: 21000 },
  { minIncome: 21250,  maxIncome: 21749,  msc: 21500 },
  { minIncome: 21750,  maxIncome: 22249,  msc: 22000 },
  { minIncome: 22250,  maxIncome: 22749,  msc: 22500 },
  { minIncome: 22750,  maxIncome: 23249,  msc: 23000 },
  { minIncome: 23250,  maxIncome: 23749,  msc: 23500 },
  { minIncome: 23750,  maxIncome: 24249,  msc: 24000 },
  { minIncome: 24250,  maxIncome: 24749,  msc: 24500 },
  { minIncome: 24750,  maxIncome: 25249,  msc: 25000 },
  { minIncome: 25250,  maxIncome: 25749,  msc: 25500 },
  { minIncome: 25750,  maxIncome: 26249,  msc: 26000 },
  { minIncome: 26250,  maxIncome: 26749,  msc: 26500 },
  { minIncome: 26750,  maxIncome: 27249,  msc: 27000 },
  { minIncome: 27250,  maxIncome: 27749,  msc: 27500 },
  { minIncome: 27750,  maxIncome: 28249,  msc: 28000 },
  { minIncome: 28250,  maxIncome: 28749,  msc: 28500 },
  { minIncome: 28750,  maxIncome: 29249,  msc: 29000 },
  { minIncome: 29250,  maxIncome: 29749,  msc: 29500 },
  { minIncome: 29750,  maxIncome: Infinity, msc: 30000 },
];

export function computeSSS(monthlyIncome) {
  const bracket = SSS_TABLE.find(
    (b) => monthlyIncome >= b.minIncome && monthlyIncome <= b.maxIncome
  ) || SSS_TABLE[SSS_TABLE.length - 1];

  const monthly = Math.round(bracket.msc * SSS_RATE * 100) / 100;
  return {
    msc: bracket.msc,
    monthlyContribution: monthly,
    annualContribution: Math.round(monthly * 12 * 100) / 100,
    rate: '14% of MSC (self-employed pays full)',
  };
}

// ===========================
// PhilHealth — Self-Employed
// ===========================
// Self-employed pays the FULL 5% (no employer share split)
const PHILHEALTH_RATE_FULL = 0.05;
const PHILHEALTH_FLOOR = 10000;
const PHILHEALTH_CEILING = 100000;

export function computePhilHealthFreelance(monthlyIncome) {
  const clamped = Math.max(PHILHEALTH_FLOOR, Math.min(PHILHEALTH_CEILING, monthlyIncome));
  const monthly = Math.round(clamped * PHILHEALTH_RATE_FULL * 100) / 100;
  return {
    monthlyContribution: monthly,
    annualContribution: Math.round(monthly * 12 * 100) / 100,
    rate: '5% of income (full share, no employer split)',
  };
}

// ===========================
// Pag-IBIG — Self-Employed
// ===========================
const PAGIBIG_CAP = 10000;

export function computePagIBIGFreelance(monthlyIncome) {
  // Self-employed pays employee share only: 2% of income capped at ₱10,000
  const capped = Math.min(monthlyIncome, PAGIBIG_CAP);
  const rate = monthlyIncome <= 1500 ? 0.01 : 0.02;
  const monthly = Math.round(capped * rate * 100) / 100;
  return {
    monthlyContribution: monthly,
    annualContribution: Math.round(monthly * 12 * 100) / 100,
    rate: `${rate * 100}% (capped at ₱${PAGIBIG_CAP.toLocaleString()} MFS)`,
  };
}

// ===========================
// Tax — Freelance / Self-Employed
// ===========================
const NON_TAXABLE_THRESHOLD = 250000;

// TRAIN Law graduated tax brackets (annual)
const TAX_BRACKETS = [
  { min: 0,        max: 250000,    base: 0,        rate: 0.00 },
  { min: 250000,   max: 400000,    base: 0,        rate: 0.15 },
  { min: 400000,   max: 800000,    base: 22500,    rate: 0.20 },
  { min: 800000,   max: 2000000,   base: 102500,   rate: 0.25 },
  { min: 2000000,  max: 8000000,   base: 402500,   rate: 0.30 },
  { min: 8000000,  max: Infinity,  base: 2202500,  rate: 0.35 },
];

function computeGraduatedTax(annualTaxableIncome) {
  if (annualTaxableIncome <= 0) return 0;
  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    const b = TAX_BRACKETS[i];
    if (annualTaxableIncome > b.min) {
      return Math.round((b.base + (annualTaxableIncome - b.min) * b.rate) * 100) / 100;
    }
  }
  return 0;
}

function getTaxBracketLabel(annualTaxable) {
  if (annualTaxable <= 250000) return '0% (Non-Taxable)';
  if (annualTaxable <= 400000) return '15%';
  if (annualTaxable <= 800000) return '20%';
  if (annualTaxable <= 2000000) return '25%';
  if (annualTaxable <= 8000000) return '30%';
  return '35%';
}

/**
 * Compute full freelance breakdown
 * @param {number} annualGrossIncome - Total annual gross receipts/income
 * @param {'8percent'|'graduated'} taxMode - Tax computation mode
 */
export function computeFreelanceBreakdown(annualGrossIncome, taxMode = 'graduated') {
  const monthlyIncome = annualGrossIncome / 12;

  const sss = computeSSS(monthlyIncome);
  const philhealth = computePhilHealthFreelance(monthlyIncome);
  const pagibig = computePagIBIGFreelance(monthlyIncome);

  const totalAnnualContributions =
    sss.annualContribution + philhealth.annualContribution + pagibig.annualContribution;
  const totalMonthlyContributions =
    sss.monthlyContribution + philhealth.monthlyContribution + pagibig.monthlyContribution;

  let annualTax = 0;
  let taxDetails = {};

  if (taxMode === '8percent') {
    // 8% of gross receipts exceeding ₱250,000
    const taxableExcess = Math.max(0, annualGrossIncome - NON_TAXABLE_THRESHOLD);
    annualTax = Math.round(taxableExcess * 0.08 * 100) / 100;
    taxDetails = {
      mode: '8% Flat Rate',
      modeDescription: '8% of gross receipts exceeding ₱250,000 (in lieu of graduated tax + 3% percentage tax)',
      nonTaxableAmount: Math.min(annualGrossIncome, NON_TAXABLE_THRESHOLD),
      taxableAmount: taxableExcess,
      taxRate: '8%',
      annualTax,
      monthlyTax: Math.round((annualTax / 12) * 100) / 100,
    };
  } else {
    // Graduated tax: taxable income = gross - contributions
    const annualTaxableIncome = Math.max(0, annualGrossIncome - totalAnnualContributions);
    const nonTaxablePortion = Math.min(annualTaxableIncome, NON_TAXABLE_THRESHOLD);
    const taxablePortion = Math.max(0, annualTaxableIncome - NON_TAXABLE_THRESHOLD);

    annualTax = computeGraduatedTax(annualTaxableIncome);
    taxDetails = {
      mode: 'Graduated (Regular)',
      modeDescription: 'Progressive tax rates per TRAIN Law (RA 10963) on net taxable income',
      grossIncome: annualGrossIncome,
      lessContributions: totalAnnualContributions,
      netTaxableIncome: annualTaxableIncome,
      nonTaxableAmount: nonTaxablePortion,
      taxableAmount: taxablePortion,
      taxBracket: getTaxBracketLabel(annualTaxableIncome),
      annualTax,
      monthlyTax: Math.round((annualTax / 12) * 100) / 100,
    };
  }

  const totalAnnualDeductions = totalAnnualContributions + annualTax;
  const annualNetIncome = Math.round((annualGrossIncome - totalAnnualDeductions) * 100) / 100;

  return {
    annualGrossIncome,
    monthlyGrossIncome: monthlyIncome,
    sss,
    philhealth,
    pagibig,
    totalMonthlyContributions: Math.round(totalMonthlyContributions * 100) / 100,
    totalAnnualContributions: Math.round(totalAnnualContributions * 100) / 100,
    tax: taxDetails,
    totalAnnualDeductions: Math.round(totalAnnualDeductions * 100) / 100,
    totalMonthlyDeductions: Math.round((totalAnnualDeductions / 12) * 100) / 100,
    annualNetIncome,
    monthlyNetIncome: Math.round((annualNetIncome / 12) * 100) / 100,
  };
}

export default computeFreelanceBreakdown;
