/**
 * Philippine Government Employee Benefits & Allowances
 * Common benefits for civilian government personnel
 */

// PERA - Personnel Economic Relief Allowance
export const PERA_MONTHLY = 2000;

// ACA - Additional Compensation Allowance (included in salary since SSL)
// Note: Already integrated into the salary schedule

// Clothing/Uniform Allowance - ₱6,000/year
export const CLOTHING_ALLOWANCE_ANNUAL = 6000;
export const CLOTHING_ALLOWANCE_MONTHLY = 500; // ₱6,000 / 12

// Mid-Year Bonus (equivalent to 1 month salary, paid in May)
// Year-End Bonus (equivalent to 1 month salary, paid in November)
// Cash Gift - ₱5,000 (paid with year-end bonus)
export const CASH_GIFT = 5000;

// Productivity Enhancement Incentive (PEI) - ₱5,000
export const PEI = 5000;

// Representation and Transportation Allowance (RATA) - for eligible positions
// Varies by position, not included in standard computation

/**
 * Compute standard government benefits
 */
export function computeBenefits(monthlySalary) {
  const midYearBonus = monthlySalary;
  const yearEndBonus = monthlySalary;

  const totalAnnualBenefits =
    (PERA_MONTHLY * 12) +
    CLOTHING_ALLOWANCE_ANNUAL +
    midYearBonus +
    yearEndBonus +
    CASH_GIFT +
    PEI;

  const totalMonthlyEquivalent = Math.round((totalAnnualBenefits / 12) * 100) / 100;

  return {
    pera: {
      monthly: PERA_MONTHLY,
      annual: PERA_MONTHLY * 12,
      label: "PERA (Personnel Economic Relief Allowance)",
      shortLabel: "PERA",
    },
    clothingAllowance: {
      monthly: CLOTHING_ALLOWANCE_MONTHLY,
      annual: CLOTHING_ALLOWANCE_ANNUAL,
      label: "Clothing / Uniform Allowance",
      shortLabel: "Clothing Allowance",
    },
    midYearBonus: {
      monthly: Math.round((midYearBonus / 12) * 100) / 100,
      annual: midYearBonus,
      label: "Mid-Year Bonus (13th Month)",
      shortLabel: "Mid-Year Bonus",
    },
    yearEndBonus: {
      monthly: Math.round((yearEndBonus / 12) * 100) / 100,
      annual: yearEndBonus,
      label: "Year-End Bonus (14th Month)",
      shortLabel: "Year-End Bonus",
    },
    cashGift: {
      monthly: Math.round((CASH_GIFT / 12) * 100) / 100,
      annual: CASH_GIFT,
      label: "Cash Gift",
      shortLabel: "Cash Gift",
    },
    pei: {
      monthly: Math.round((PEI / 12) * 100) / 100,
      annual: PEI,
      label: "Productivity Enhancement Incentive (PEI)",
      shortLabel: "PEI",
    },
    totalAnnualBenefits,
    totalMonthlyEquivalent,
  };
}

export default computeBenefits;
