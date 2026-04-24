/**
 * Philippine Government Salary Grade Table
 * 2026 Third Tranche - Executive Order No. 64, s. 2024
 * National Budget Circular No. 601
 *
 * Salary Grades 1-33, Steps 1-8
 * Step 1 values are official DBM rates.
 * Steps 2-8 are computed using the standard government step increment.
 */

// Step 1 base rates for each Salary Grade (2026 Third Tranche)
const STEP1_RATES = {
  1: 14634,
  2: 15522,
  3: 16486,
  4: 17506,
  5: 18581,
  6: 19716,
  7: 20914,
  8: 22423,
  9: 24329,
  10: 26917,
  11: 31705,
  12: 33947,
  13: 36125,
  14: 38764,
  15: 42178,
  16: 45694,
  17: 49562,
  18: 53818,
  19: 59153,
  20: 66052,
  21: 73303,
  22: 81796,
  23: 91306,
  24: 102603,
  25: 116643,
  26: 131807,
  27: 148940,
  28: 167129,
  29: 187531,
  30: 210718,
  31: 300961,
  32: 356237,
  33: 449157,
};

// Step increment percentages (approximate standard government formula)
// Each step is roughly 2.5% above the previous step
const STEP_INCREMENT = 0.025;

/**
 * Generate the complete salary table with all steps
 */
function generateSalaryTable() {
  const table = {};

  for (let sg = 1; sg <= 33; sg++) {
    table[sg] = {};
    const base = STEP1_RATES[sg];

    for (let step = 1; step <= 8; step++) {
      table[sg][step] = Math.round(base * (1 + STEP_INCREMENT * (step - 1)));
    }
  }

  return table;
}

export const SALARY_TABLE = generateSalaryTable();

// Common position titles mapped to salary grades (for reference hints)
export const SG_POSITIONS = {
  1: "Utility Worker I",
  2: "Utility Worker II",
  3: "Clerk I / Driver I",
  4: "Clerk II / Driver II",
  5: "Clerk III",
  6: "Clerk IV / Admin Aide VI",
  7: "Admin Aide IV",
  8: "Admin Aide VI / Bookkeeper",
  9: "Admin Assistant I",
  10: "Admin Assistant II / Nurse I",
  11: "Admin Officer I / Education Program Specialist I / Nurse II",
  12: "Admin Officer II / Nurse III",
  13: "Admin Officer III",
  14: "Admin Officer IV / Accountant II",
  15: "Admin Officer V / Dentist II / Senior Bookkeeper",
  16: "Supervising Admin Officer / Dentist III",
  17: "Chief Admin Officer",
  18: "Engineer III / Accountant III",
  19: "Engineer IV / Senior Specialist",
  20: "Chief Engineer / Division Chief",
  21: "Supervising Specialist",
  22: "Assistant Department Manager",
  23: "Department Manager",
  24: "Director II / Assistant Commissioner",
  25: "Director III",
  26: "Director IV / Undersecretary",
  27: "Secretary / Commissioner",
  28: "Department Secretary",
  29: "Executive Secretary III",
  30: "Executive Secretary IV",
  31: "Constitutional Commission Chair",
  32: "Senate President / Speaker",
  33: "Vice President / President",
};

/**
 * Get salary for a specific grade and step
 */
export function getSalary(grade, step) {
  if (grade < 1 || grade > 33 || step < 1 || step > 8) return 0;
  return SALARY_TABLE[grade][step];
}

export default SALARY_TABLE;
