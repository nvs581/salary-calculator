import { useEffect, useRef } from 'react';

function SalaryChart({ deductions }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const { grossPay, gsis, philhealth, pagibig, tax, netPay } = deductions;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 40;
    const innerRadius = radius * 0.6;

    const segments = [
      { label: 'Take Home', value: netPay, color: '#22c55e' },
      { label: 'GSIS', value: gsis.employeeShare, color: '#3b82f6' },
      { label: 'PhilHealth', value: philhealth.employeeShare, color: '#10b981' },
      { label: 'Pag-IBIG', value: pagibig.employeeShare, color: '#f59e0b' },
      { label: 'Tax', value: tax.monthlyTax, color: '#ef4444' },
    ];

    const total = segments.reduce((sum, s) => sum + s.value, 0);

    let animProgress = 0;
    const animDuration = 800;
    const startTime = performance.now();

    function draw(now) {
      const elapsed = now - startTime;
      animProgress = Math.min(elapsed / animDuration, 1);
      const eased = 1 - Math.pow(1 - animProgress, 3);

      ctx.clearRect(0, 0, w, h);

      let currentAngle = -Math.PI / 2;

      segments.forEach((seg) => {
        const sliceAngle = total > 0 ? (seg.value / total) * 2 * Math.PI * eased : 0;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();

        // Segment border
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        currentAngle += sliceAngle;
      });

      // Center text
      ctx.fillStyle = '#f8fafc';
      ctx.font = `bold ${Math.max(14, radius * 0.18)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const displayNet = Math.round(netPay * eased);
      ctx.fillText(`₱${displayNet.toLocaleString()}`, cx, cy - 8);

      ctx.fillStyle = '#94a3b8';
      ctx.font = `${Math.max(10, radius * 0.1)}px Inter, sans-serif`;
      ctx.fillText('Net Pay', cx, cy + 14);

      if (animProgress < 1) {
        animRef.current = requestAnimationFrame(draw);
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [grossPay, gsis, philhealth, pagibig, tax, netPay]);

  const segments = [
    { label: 'Take Home', value: netPay, color: '#22c55e' },
    { label: 'GSIS', value: gsis.employeeShare, color: '#3b82f6' },
    { label: 'PhilHealth', value: philhealth.employeeShare, color: '#10b981' },
    { label: 'Pag-IBIG', value: pagibig.employeeShare, color: '#f59e0b' },
    { label: 'Tax', value: tax.monthlyTax, color: '#ef4444' },
  ];

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="salary-chart">
      <div className="section-header">
        <div className="section-icon chart-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
            <path d="M22 12A10 10 0 0 0 12 2v10z"/>
          </svg>
        </div>
        <div>
          <h2>Salary Breakdown</h2>
          <p className="section-sub">Visual distribution of your monthly salary</p>
        </div>
      </div>

      <div className="chart-container">
        <canvas ref={canvasRef} className="donut-canvas" />
        <div className="chart-legend">
          {segments.map((seg) => (
            <div key={seg.label} className="legend-item">
              <span className="legend-dot" style={{ background: seg.color }} />
              <span className="legend-label">{seg.label}</span>
              <span className="legend-value">
                ₱{seg.value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>
              <span className="legend-percent">
                {total > 0 ? ((seg.value / total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalaryChart;
