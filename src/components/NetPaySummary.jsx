import { useEffect, useRef, useState } from 'react';

function NetPaySummary({ deductions, benefits }) {
  const [displayNet, setDisplayNet] = useState(0);
  const [isMonthly, setIsMonthly] = useState(true);
  const prevNetRef = useRef(0);

  const netPay = deductions.netPay;
  const annualNet = deductions.annualNet;
  const grossPay = deductions.grossPay;
  const totalDeductions = deductions.totalEmployeeDeductions;

  // Animate counter
  useEffect(() => {
    const target = isMonthly ? netPay : annualNet;
    const start = prevNetRef.current;
    const diff = target - start;
    const duration = 600;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplayNet(Math.round(current * 100) / 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevNetRef.current = target;
      }
    }

    requestAnimationFrame(animate);
  }, [netPay, annualNet, isMonthly]);

  const deductionPercent = grossPay > 0 ? ((totalDeductions / grossPay) * 100).toFixed(1) : 0;
  const takeHomePercent = grossPay > 0 ? (100 - deductionPercent).toFixed(1) : 100;

  return (
    <div className="net-pay-summary">
      <div className="net-pay-header">
        <h2>Take-Home Pay</h2>
        <div className="period-toggle">
          <button
            className={`toggle-btn ${isMonthly ? 'active' : ''}`}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={`toggle-btn ${!isMonthly ? 'active' : ''}`}
            onClick={() => setIsMonthly(false)}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="net-pay-amount">
        <span className="currency-symbol">₱</span>
        <span className="amount-value">
          {displayNet.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      <div className="pay-bar">
        <div
          className="pay-bar-fill take-home"
          style={{ width: `${takeHomePercent}%` }}
        >
          <span className="bar-label">Take Home {takeHomePercent}%</span>
        </div>
        <div
          className="pay-bar-fill deductions"
          style={{ width: `${deductionPercent}%` }}
        >
          <span className="bar-label">{deductionPercent}%</span>
        </div>
      </div>

      <div className="pay-stats">
        <div className="stat">
          <span className="stat-label">Gross {isMonthly ? 'Monthly' : 'Annual'}</span>
          <span className="stat-value">
            ₱{(isMonthly ? grossPay : grossPay * 12).toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Deductions</span>
          <span className="stat-value deduction-color">
            -₱{(isMonthly ? totalDeductions : totalDeductions * 12).toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">+ Monthly PERA</span>
          <span className="stat-value benefit-color">
            +₱{benefits.pera.monthly.toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NetPaySummary;
