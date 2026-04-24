function BenefitsBreakdown({ benefits, monthlySalary }) {
  const items = [
    {
      ...benefits.pera,
      color: "var(--accent-green)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
    },
    {
      ...benefits.clothingAllowance,
      color: "var(--accent-blue)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.38 3.46L16 2 12 5 8 2l-4.38 1.46a2 2 0 0 0-1.34 1.88v13.34a2 2 0 0 0 1.34 1.88L8 22l4-3 4 3 4.38-1.46a2 2 0 0 0 1.34-1.88V5.34a2 2 0 0 0-1.34-1.88z"/>
        </svg>
      ),
    },
    {
      ...benefits.midYearBonus,
      color: "var(--accent-gold)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,12 20,22 4,22 4,12"/>
          <rect x="2" y="7" width="20" height="5"/>
          <line x1="12" y1="22" x2="12" y2="7"/>
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
        </svg>
      ),
    },
    {
      ...benefits.yearEndBonus,
      color: "var(--accent-purple)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ),
    },
    {
      ...benefits.cashGift,
      color: "var(--accent-pink)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      ...benefits.pei,
      color: "var(--accent-teal)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
          <polyline points="16,7 22,7 22,13"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="benefits-breakdown">
      <div className="section-header">
        <div className="section-icon benefit-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,12 20,22 4,22 4,12"/>
            <rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        </div>
        <div>
          <h2>Benefits & Allowances</h2>
          <p className="section-sub">Standard government employee benefits</p>
        </div>
      </div>

      <div className="benefit-cards">
        {items.map((item) => (
          <div key={item.shortLabel} className="benefit-card">
            <div className="benefit-card-left">
              <div className="benefit-icon-wrap" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="benefit-info">
                <h3>{item.shortLabel}</h3>
                <p>{item.label}</p>
              </div>
            </div>
            <div className="benefit-amounts">
              <div className="benefit-monthly" style={{ color: item.color }}>
                ₱{item.monthly.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                <span className="period">/mo</span>
              </div>
              <div className="benefit-annual">
                ₱{item.annual.toLocaleString('en-PH', { minimumFractionDigits: 0 })}/yr
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="benefit-total">
        <div className="total-row">
          <span>Total Annual Benefits</span>
          <span className="total-amount benefit-color">
            +₱{benefits.totalAnnualBenefits.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="total-row secondary">
          <span>Monthly Equivalent</span>
          <span className="total-amount">
            ₱{benefits.totalMonthlyEquivalent.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BenefitsBreakdown;
