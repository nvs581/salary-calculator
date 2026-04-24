# 🇵🇭 Philippines Salary & Freelance Calculator

An income calculator designed for **Philippine Government Employees** and **Freelancers/Self-Employed Professionals**. Built with modern glassmorphism aesthetics and updated 2026 contribution rates.

## 🚀 Live Demo

https://salary-calculator-sooty-rho.vercel.app/

---

## ✨ Features

### 🏛️ Government Employee Calculator
*   **2026 Salary Schedule:** Includes the latest Fourth Tranche salary grades.
*   **Automatic Computation:** Simply select your Salary Grade (SG) and Step.
*   **Breakdown of Deductions:** Real-time calculation of GSIS, PhilHealth (2026 rates), and Pag-IBIG.
*   **Tax Analysis:** TRAIN Law (RA 10963) income tax computation.
*   **Bonus & Benefits:** View monthly and annual bonuses including PERA and mid-year/year-end bonuses.

### 💻 Freelance & Self-Employed Calculator
*   **Dual Tax Modes:** Toggle between **8% Flat Rate** (on gross exceeding ₱250k) and **Graduated Regular Tax**.
*   **Manual Entry:** Input your income either **Monthly** or **Annually** with automatic conversion.
*   **Flexible Contributions:** Computes SSS (Self-Employed full 14% rate), PhilHealth, and Pag-IBIG.
*   **Quick Presets:** Instant assessment using common income milestones (240k to 3M).
*   **Monthly/Annual Views:** Comparative breakdown of take-home pay across different time scales.

---

## 🛠️ Tech Stack
*   **Framework:** React 18+ with Vite
*   **Routing:** React Router 6
*   **Styling:** Vanilla CSS
*   **Icons:** Lucide-inspired SVG components

---

## 📊 Logic & References
Follows official Philippine government mandates:
*   **Income Tax:** TRAIN Law (RA 10963) brackets.
*   **SSS:** Circular 2023-033 (Monthly Salary Credit table).
*   **PhilHealth:** 5% premium rate.
*   **Pag-IBIG:** 2% contribution (capped at ₱10,000 MFS).

---

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/nvs581/salary-calculator.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    ```

---

## ⚠️ Disclaimer
This application is for **reference purposes only**. While it uses the latest available government tables and laws, individual tax obligations may vary based on specific BIR registrations, business types, or changes in legislation. Always consult a tax professional or the respective government agencies for official computations.
