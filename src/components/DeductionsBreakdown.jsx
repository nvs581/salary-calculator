function DeductionsBreakdown({ deductions }) {
  const { gsis, philhealth, pagibig, tax, totalEmployeeDeductions, grossPay } = deductions;

  const items = [
    {
      label: "GSIS",
      sublabel: "Government Service Insurance System",
      employeeShare: gsis.employeeShare,
      employerShare: gsis.employerShare,
      rate: "9% Employee / 12% Employer",
      color: "var(--accent-blue)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      label: "PhilHealth",
      sublabel: "Philippine Health Insurance Corp.",
      employeeShare: philhealth.employeeShare,
      employerShare: philhealth.employerShare,
      rate: "2.5% Employee / 2.5% Employer",
      color: "var(--accent-green)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
    },
    {
      label: "Pag-IBIG",
      sublabel: "Home Development Mutual Fund",
      employeeShare: pagibig.employeeShare,
      employerShare: pagibig.employerShare,
      rate: "2% (capped at ₱10,000 MFS)",
      color: "var(--accent-gold)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
    },
    {
      label: "Withholding Tax",
      sublabel: `BIR — ${tax.taxBracket}`,
      employeeShare: tax.monthlyTax,
      employerShare: null,
      rate: `Annual Taxable: ₱${tax.annualTaxableIncome.toLocaleString('en-PH')}`,
      color: "var(--accent-red)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="deductions-breakdown">
      <div className="section-header">
        <div className="section-icon deduction-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div>
          <h2>Contributions & Deductions</h2>
          <p className="section-sub">Monthly employee deductions from gross salary</p>
        </div>
      </div>

      <div className="deduction-cards">
        {items.map((item) => {
          const percent = grossPay > 0
            ? ((item.employeeShare / grossPay) * 100).toFixed(1)
            : 0;

          return (
            <div key={item.label} className="deduction-card">
              <div className="deduction-card-header">
                <div className="deduction-icon-wrap" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className="deduction-info">
                  <h3>{item.label}</h3>
                  <p>{item.sublabel}</p>
                </div>
                <div className="deduction-amount" style={{ color: item.color }}>
                  ₱{item.employeeShare.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="deduction-bar-track">
                <div
                  className="deduction-bar-fill"
                  style={{
                    width: `${Math.min(percent * 3, 100)}%`,
                    background: item.color,
                  }}
                />
              </div>

              <div className="deduction-details">
                <span className="deduction-rate">{item.rate}</span>
                {item.employerShare !== null && (
                  <span className="employer-share">
                    Gov't Share: ₱{item.employerShare.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="deduction-total">
        <div className="total-row">
          <span>Total Monthly Deductions</span>
          <span className="total-amount deduction-color">
            -₱{totalEmployeeDeductions.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="total-row employer-total">
          <span>Total Gov't Contributions</span>
          <span className="total-amount benefit-color">
            ₱{deductions.totalEmployerContributions.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeductionsBreakdown;
