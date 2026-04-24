import { useState, useMemo, useEffect, useRef } from 'react';
import { computeFreelanceBreakdown } from '../data/freelanceDeductions';

function FreelanceCalculator() {
  const [annualIncome, setAnnualIncome] = useState(480000);
  const [inputValue, setInputValue] = useState('480,000');
  const [inputPeriod, setInputPeriod] = useState('annual'); // 'monthly' or 'annual'
  const [taxMode, setTaxMode] = useState('8percent');
  const [displayNet, setDisplayNet] = useState(0);
  const prevNetRef = useRef(0);

  const breakdown = useMemo(
    () => computeFreelanceBreakdown(annualIncome, taxMode),
    [annualIncome, taxMode]
  );

  // Animate net income counter
  useEffect(() => {
    const target = breakdown.annualNetIncome;
    const start = prevNetRef.current;
    const diff = target - start;
    const duration = 600;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNet(Math.round((start + diff * eased) * 100) / 100);
      if (progress < 1) requestAnimationFrame(animate);
      else prevNetRef.current = target;
    }
    requestAnimationFrame(animate);
  }, [breakdown.annualNetIncome]);

  function handleIncomeChange(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10) || 0;
    setInputValue(num > 0 ? num.toLocaleString('en-PH') : '');
    if (inputPeriod === 'monthly') {
      setAnnualIncome(num * 12);
    } else {
      setAnnualIncome(num);
    }
  }

  function handlePeriodChange(period) {
    if (period === inputPeriod) return;
    setInputPeriod(period);
    // Convert the displayed value
    if (period === 'monthly') {
      const monthly = Math.round(annualIncome / 12);
      setInputValue(monthly > 0 ? monthly.toLocaleString('en-PH') : '');
    } else {
      setInputValue(annualIncome > 0 ? annualIncome.toLocaleString('en-PH') : '');
    }
  }

  function handlePreset(annualAmount) {
    setAnnualIncome(annualAmount);
    if (inputPeriod === 'monthly') {
      const monthly = Math.round(annualAmount / 12);
      setInputValue(monthly.toLocaleString('en-PH'));
    } else {
      setInputValue(annualAmount.toLocaleString('en-PH'));
    }
  }

  const fmt = (v) => v.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtWhole = (v) => v.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const netPercent = annualIncome > 0
    ? ((breakdown.annualNetIncome / annualIncome) * 100).toFixed(1)
    : 100;
  const deductPercent = annualIncome > 0
    ? ((breakdown.totalAnnualDeductions / annualIncome) * 100).toFixed(1)
    : 0;

  return (
    <>
      <main className="app-main">
        <div className="layout-grid">
          {/* Left Column */}
          <div className="col-left">
            {/* Income Input */}
            <div className="salary-selector fl-income-input">
              <div className="selector-header">
                <div className="selector-icon fl-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h2>Freelance Income</h2>
              </div>

              <div className="control-group">
                <label htmlFor="fl-income">Gross Income / Receipts</label>
                <div className="fl-input-row">
                  <div className="fl-input-wrapper">
                    <span className="fl-currency">₱</span>
                    <input
                      id="fl-income"
                      type="text"
                      value={inputValue}
                      onChange={handleIncomeChange}
                      placeholder={inputPeriod === 'monthly' ? 'Monthly income' : 'Annual income'}
                      className="fl-input"
                    />
                  </div>
                  <div className="fl-period-toggle">
                    <button
                      className={`fl-period-btn ${inputPeriod === 'monthly' ? 'active' : ''}`}
                      onClick={() => handlePeriodChange('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`fl-period-btn ${inputPeriod === 'annual' ? 'active' : ''}`}
                      onClick={() => handlePeriodChange('annual')}
                    >
                      Annual
                    </button>
                  </div>
                </div>
              </div>

              <div className="fl-presets">
                <span className="fl-presets-label">Quick set (annual):</span>
                {[240000, 480000, 720000, 1000000, 1500000, 3000000].map((amt) => (
                  <button
                    key={amt}
                    className={`fl-preset-btn ${annualIncome === amt ? 'active' : ''}`}
                    onClick={() => handlePreset(amt)}
                  >
                    {amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}K`}
                  </button>
                ))}
              </div>

              <div className="fl-gross-cards">
                <div className={`gross-display fl-gross ${inputPeriod === 'annual' ? '' : 'fl-gross-highlight'}`}>
                  <span className="gross-label">Monthly</span>
                  <span className="gross-amount">
                    <span className="currency">₱</span>
                    {fmtWhole(breakdown.monthlyGrossIncome)}
                  </span>
                </div>
                <div className={`gross-display fl-gross ${inputPeriod === 'monthly' ? '' : 'fl-gross-highlight'}`}>
                  <span className="gross-label">Annual</span>
                  <span className="gross-amount">
                    <span className="currency">₱</span>
                    {fmtWhole(annualIncome)}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Income Summary */}
            <div className="net-pay-summary">
              <div className="net-pay-header">
                <h2>Annual Net Income</h2>
              </div>

              <div className="net-pay-amount">
                <span className="currency-symbol">₱</span>
                <span className="amount-value">{fmt(displayNet)}</span>
              </div>

              <div className="pay-bar">
                <div className="pay-bar-fill take-home" style={{ width: `${netPercent}%` }}>
                  <span className="bar-label">Net {netPercent}%</span>
                </div>
                <div className="pay-bar-fill deductions" style={{ width: `${deductPercent}%` }}>
                  <span className="bar-label">{deductPercent}%</span>
                </div>
              </div>

              <div className="pay-stats">
                <div className="stat">
                  <span className="stat-label">Annual Gross</span>
                  <span className="stat-value">₱{fmt(annualIncome)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Contributions</span>
                  <span className="stat-value deduction-color">-₱{fmt(breakdown.totalAnnualContributions)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Income Tax</span>
                  <span className="stat-value deduction-color">-₱{fmt(breakdown.tax.annualTax)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Monthly Net (÷12)</span>
                  <span className="stat-value benefit-color">₱{fmt(breakdown.monthlyNetIncome)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-right">
            {/* Tax Mode Selector + Breakdown */}
            <div className="deductions-breakdown fl-tax-section">
              <div className="section-header">
                <div className="section-icon" style={{ background: 'rgba(168,85,247,0.12)', color: 'var(--accent-purple)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h2>Income Tax</h2>
                  <p className="section-sub">Choose your tax computation method</p>
                </div>
              </div>

              {/* Tax mode toggle */}
              <div className="fl-tax-toggle">
                <button
                  className={`fl-tax-btn ${taxMode === '8percent' ? 'active eight' : ''}`}
                  onClick={() => setTaxMode('8percent')}
                >
                  <span className="fl-tax-btn-title">8% Flat Rate</span>
                  <span className="fl-tax-btn-desc">On gross exceeding ₱250K</span>
                </button>
                <button
                  className={`fl-tax-btn ${taxMode === 'graduated' ? 'active grad' : ''}`}
                  onClick={() => setTaxMode('graduated')}
                >
                  <span className="fl-tax-btn-title">Graduated (Regular)</span>
                  <span className="fl-tax-btn-desc">TRAIN Law progressive rates</span>
                </button>
              </div>

              {/* Tax computation detail */}
              <div className="fl-tax-detail">
                <div className="fl-tax-detail-title">{breakdown.tax.mode} Computation</div>
                <p className="fl-tax-detail-desc">{breakdown.tax.modeDescription}</p>

                <div className="fl-tax-rows">
                  {taxMode === '8percent' ? (
                    <>
                      <div className="fl-tax-row">
                        <span>Annual Gross Income</span>
                        <span>₱{fmt(annualIncome)}</span>
                      </div>
                      <div className="fl-tax-row highlight green">
                        <span>Less: Non-Taxable (₱250,000)</span>
                        <span>-₱{fmt(breakdown.tax.nonTaxableAmount)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Taxable Amount</span>
                        <span>₱{fmt(breakdown.tax.taxableAmount)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Tax Rate</span>
                        <span>× 8%</span>
                      </div>
                      <div className="fl-tax-row total">
                        <span>Annual Income Tax</span>
                        <span className="deduction-color">₱{fmt(breakdown.tax.annualTax)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Monthly Tax (÷12)</span>
                        <span>₱{fmt(breakdown.tax.monthlyTax)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fl-tax-row">
                        <span>Annual Gross Income</span>
                        <span>₱{fmt(annualIncome)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Less: Contributions (SSS+PH+PI)</span>
                        <span>-₱{fmt(breakdown.totalAnnualContributions)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Net Taxable Income</span>
                        <span>₱{fmt(breakdown.tax.netTaxableIncome || 0)}</span>
                      </div>
                      <div className="fl-tax-row highlight green">
                        <span>Non-Taxable Portion (₱250,000)</span>
                        <span>₱{fmt(breakdown.tax.nonTaxableAmount || 0)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Taxable Portion</span>
                        <span>₱{fmt(breakdown.tax.taxableAmount || 0)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Tax Bracket</span>
                        <span>{breakdown.tax.taxBracket}</span>
                      </div>
                      <div className="fl-tax-row total">
                        <span>Annual Income Tax</span>
                        <span className="deduction-color">₱{fmt(breakdown.tax.annualTax)}</span>
                      </div>
                      <div className="fl-tax-row">
                        <span>Monthly Tax (÷12)</span>
                        <span>₱{fmt(breakdown.tax.monthlyTax)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Contributions */}
            <div className="deductions-breakdown">
              <div className="section-header">
                <div className="section-icon deduction-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div>
                  <h2>Mandatory Contributions</h2>
                  <p className="section-sub">Self-employed / freelancer rates</p>
                </div>
              </div>

              <div className="deduction-cards">
                {/* SSS */}
                <div className="deduction-card">
                  <div className="deduction-card-header">
                    <div className="deduction-icon-wrap" style={{ color: 'var(--accent-blue)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <div className="deduction-info">
                      <h3>SSS</h3>
                      <p>Social Security System</p>
                    </div>
                    <div className="deduction-amount" style={{ color: 'var(--accent-blue)' }}>
                      ₱{fmt(breakdown.sss.monthlyContribution)}<span className="deduction-amount-period">/mo</span>
                    </div>
                  </div>
                  <div className="deduction-details">
                    <span className="deduction-rate">{breakdown.sss.rate}</span>
                    <span className="employer-share">MSC: ₱{fmtWhole(breakdown.sss.msc)}</span>
                  </div>
                  <div className="deduction-details" style={{ marginTop: '4px' }}>
                    <span className="deduction-rate">Monthly: ₱{fmt(breakdown.sss.monthlyContribution)}</span>
                    <span className="deduction-rate">Annual: ₱{fmt(breakdown.sss.annualContribution)}</span>
                  </div>
                </div>

                {/* PhilHealth */}
                <div className="deduction-card">
                  <div className="deduction-card-header">
                    <div className="deduction-icon-wrap" style={{ color: 'var(--accent-green)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <div className="deduction-info">
                      <h3>PhilHealth</h3>
                      <p>Philippine Health Insurance Corp.</p>
                    </div>
                    <div className="deduction-amount" style={{ color: 'var(--accent-green)' }}>
                      ₱{fmt(breakdown.philhealth.monthlyContribution)}<span className="deduction-amount-period">/mo</span>
                    </div>
                  </div>
                  <div className="deduction-details">
                    <span className="deduction-rate">{breakdown.philhealth.rate}</span>
                  </div>
                  <div className="deduction-details" style={{ marginTop: '4px' }}>
                    <span className="deduction-rate">Monthly: ₱{fmt(breakdown.philhealth.monthlyContribution)}</span>
                    <span className="deduction-rate">Annual: ₱{fmt(breakdown.philhealth.annualContribution)}</span>
                  </div>
                </div>

                {/* Pag-IBIG */}
                <div className="deduction-card">
                  <div className="deduction-card-header">
                    <div className="deduction-icon-wrap" style={{ color: 'var(--accent-gold)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                    </div>
                    <div className="deduction-info">
                      <h3>Pag-IBIG</h3>
                      <p>Home Development Mutual Fund</p>
                    </div>
                    <div className="deduction-amount" style={{ color: 'var(--accent-gold)' }}>
                      ₱{fmt(breakdown.pagibig.monthlyContribution)}<span className="deduction-amount-period">/mo</span>
                    </div>
                  </div>
                  <div className="deduction-details">
                    <span className="deduction-rate">{breakdown.pagibig.rate}</span>
                  </div>
                  <div className="deduction-details" style={{ marginTop: '4px' }}>
                    <span className="deduction-rate">Monthly: ₱{fmt(breakdown.pagibig.monthlyContribution)}</span>
                    <span className="deduction-rate">Annual: ₱{fmt(breakdown.pagibig.annualContribution)}</span>
                  </div>
                </div>
              </div>

              <div className="deduction-total">
                <div className="total-row">
                  <span>Total Monthly Contributions</span>
                  <span className="total-amount deduction-color">
                    -₱{fmt(breakdown.totalMonthlyContributions)}
                  </span>
                </div>
                <div className="total-row employer-total">
                  <span>Total Annual Contributions</span>
                  <span className="total-amount deduction-color">
                    -₱{fmt(breakdown.totalAnnualContributions)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Based on <strong>TRAIN Law (RA 10963)</strong>,{' '}
          <strong>SSS Circular 2023-033</strong>, and current PhilHealth & Pag-IBIG schedules
        </p>
        <p className="footer-disclaimer">
          This calculator is for reference purposes only. Freelance/self-employed tax obligations
          may vary based on BIR registration, business type, and applicable deductions.
          Consult a tax professional or the BIR for official computations.
        </p>
      </footer>
    </>
  );
}

export default FreelanceCalculator;
