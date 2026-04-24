import { useState, useMemo } from 'react';
import SalarySelector from '../components/SalarySelector';
import NetPaySummary from '../components/NetPaySummary';
import DeductionsBreakdown from '../components/DeductionsBreakdown';
import BenefitsBreakdown from '../components/BenefitsBreakdown';
import SalaryChart from '../components/SalaryChart';
import { getSalary } from '../data/salaryTable';
import { computeAllDeductions } from '../data/deductions';
import { computeBenefits } from '../data/benefits';

function GovCalculator() {
  const [grade, setGrade] = useState(11);
  const [step, setStep] = useState(1);

  const monthlySalary = useMemo(() => getSalary(grade, step), [grade, step]);
  const deductions = useMemo(() => computeAllDeductions(monthlySalary), [monthlySalary]);
  const benefits = useMemo(() => computeBenefits(monthlySalary), [monthlySalary]);

  return (
    <>
      {/* Main Content */}
      <main className="app-main">
        <div className="layout-grid">
          {/* Left Column */}
          <div className="col-left">
            <SalarySelector
              grade={grade}
              step={step}
              onGradeChange={setGrade}
              onStepChange={setStep}
            />
            <NetPaySummary deductions={deductions} benefits={benefits} />
            <SalaryChart deductions={deductions} />
          </div>

          {/* Right Column */}
          <div className="col-right">
            <DeductionsBreakdown deductions={deductions} />
            <BenefitsBreakdown benefits={benefits} monthlySalary={monthlySalary} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Based on <strong>Executive Order No. 64, s. 2024</strong> and{' '}
          <strong>DBM National Budget Circular No. 601</strong>
        </p>
        <p className="footer-disclaimer">
          This calculator is for reference purposes only. Actual salaries may vary based on
          agency-specific policies, additional allowances, and individual circumstances.
          Consult your agency's HR/payroll department for official computations.
        </p>
      </footer>
    </>
  );
}

export default GovCalculator;
