import { useState } from 'react';
import { SALARY_TABLE, SG_POSITIONS, getSalary } from '../data/salaryTable';

function SalarySelector({ grade, step, onGradeChange, onStepChange }) {
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const currentSalary = getSalary(grade, step);

  return (
    <div className="salary-selector">
      <div className="selector-header">
        <div className="selector-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <h2>Salary Grade & Step</h2>
      </div>

      <div className="selector-controls">
        <div className="control-group">
          <label htmlFor="salary-grade">Salary Grade</label>
          <div className="select-wrapper">
            <select
              id="salary-grade"
              value={grade}
              onChange={(e) => onGradeChange(Number(e.target.value))}
            >
              {Array.from({ length: 33 }, (_, i) => i + 1).map((sg) => (
                <option key={sg} value={sg}>
                  SG {sg} — {SG_POSITIONS[sg]}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10L6 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="control-group">
          <label htmlFor="salary-step">Step</label>
          <div className="step-grid">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
              <button
                key={s}
                className={`step-btn ${step === s ? 'active' : ''}`}
                onClick={() => onStepChange(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gross-display">
        <span className="gross-label">Monthly Gross Salary</span>
        <span className="gross-amount">
          <span className="currency">₱</span>
          {currentSalary.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
        </span>
        <span className="gross-sub">
          SG {grade} • Step {step} • 2026 Third Tranche
        </span>
      </div>
    </div>
  );
}

export default SalarySelector;
