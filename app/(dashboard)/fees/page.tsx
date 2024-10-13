"use client";
import React, { useState, useEffect } from 'react';
import './FeesCalculator.css';
import Chart from 'chart.js/auto'; // Import Chart.js

const FeesCalculator: React.FC = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    year: '',
    category: '',
    college: '', // Added college name field
  });

  const [feesBreakdown, setFeesBreakdown] = useState({
    tutionFees: 0,
    developmentFees: 0,
    examFees: 0,
    miscFees: 0,
    totalFees: 0,
  });

  const [loanDetails, setLoanDetails] = useState({
    selectedLoan: '',
    interestRate: 0,
    tenure: 1,
    monthlyEMI: 0,
  });

  const categories = ['General', 'OBC', 'EBC', 'SC', 'ST', 'NT', 'PWD']; // Added 'No Discount'

  const colleges = [
    { name: 'Bharati Vidyapeeth', baseFees: 150000 },
    { name: 'Pimpri Chinchwad University', baseFees: 180000 },
    { name: 'MIT-WPU Pune', baseFees: 200000 },
    { name: 'Lard School Of Engineering and Technology', baseFees: 160000 },
    { name: 'Vishwakarma Institute Of Technology', baseFees: 170000 },
  ];

  const loanOptions = [
    { name: 'State Bank of India (SBI) Student Loan Scheme', interestRate: 8.65 },
    { name: 'HDFC Bank Education Loan', interestRate: 9.55 },
    { name: 'ICICI Bank Education Loan', interestRate: 10.75 },
    { name: 'Axis Bank Education Loan', interestRate: 11.25 },
    { name: 'Punjab National Bank (PNB) Saraswati Education Loan', interestRate: 8.55 },
    { name: 'Bank of Baroda Education Loan', interestRate: 9.35 },
    { name: 'Canara Bank Vidya Turant Loan Scheme', interestRate: 9.95 },
    { name: 'IDBI Bank Education Loan', interestRate: 10.15 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  const calculateFees = () => {
    let baseFees = 1000; // Default base fee if no college selected

    // Find base fees based on selected college
    const selectedCollege = colleges.find(college => college.name === studentDetails.college);
    if (selectedCollege) {
      baseFees = selectedCollege.baseFees;
    }

    let discountFactor = 1;

    switch (studentDetails.category) {
      case 'OBC':
      case 'EBC':
        discountFactor = 0.5;
        break;
      case 'SC':
      case 'ST':
      case 'NT':
        discountFactor = 0.2;
        break;
      case 'PWD':
        discountFactor = 0.1;
        break;
      case 'General': // New category with 100% fees
        discountFactor = 1;
        break;
      default:
        discountFactor = 1;
        break;
    }

    const totalFees = baseFees * discountFactor;
    const tutionFees = totalFees * 0.8;
    const developmentFees = totalFees * 0.1;
    const examFees = totalFees * 0.05;
    const miscFees = totalFees * 0.05;

    setFeesBreakdown({
      tutionFees,
      developmentFees,
      examFees,
      miscFees,
      totalFees,
    });
  };

  const handleLoanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLoan = loanOptions.find(loan => loan.name === e.target.value);
    if (selectedLoan) {
      setLoanDetails({
        ...loanDetails,
        selectedLoan: selectedLoan.name,
        interestRate: selectedLoan.interestRate,
      });
    }
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tenure = parseInt(e.target.value, 10);
    setLoanDetails({
      ...loanDetails,
      tenure: tenure,
      monthlyEMI: calculateEMI(feesBreakdown.totalFees, loanDetails.interestRate, tenure),
    });
  };

  const calculateEMI = (principal: number, interestRate: number, tenure: number) => {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) / (Math.pow(1 + monthlyRate, tenure * 12) - 1);
    return emi;
  };

  useEffect(() => {
    // Create a new chart instance
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Tuition Fees', 'Development Fees', 'Exam Fees', 'Misc. Fees'],
        datasets: [{
          label: 'Fees Breakdown',
          data: [
            feesBreakdown.tutionFees,
            feesBreakdown.developmentFees,
            feesBreakdown.examFees,
            feesBreakdown.miscFees,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart does not maintain aspect ratio
      },
    });

    return () => {
      // Clean up the chart instance
      myPieChart.destroy();
    };
  }, [feesBreakdown]);

  return (
    <div className="fees-calculator">
      <h1>Fees Calculator</h1>
      <div className="form-group">
        <label htmlFor="name">PRN:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={studentDetails.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          name="year"
          value={studentDetails.year}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={studentDetails.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="college">College:</label>
        <select
          id="college"
          name="college"
          value={studentDetails.college}
          onChange={handleChange}
        >
          <option value="">Select College</option>
          {colleges.map((college, index) => (
            <option key={index} value={college.name}>
              {college.name}
            </option>
          ))}
        </select>
      </div>
      <button className="calculate-button" onClick={calculateFees}>
        Calculate Fees
      </button>
      {feesBreakdown.totalFees > 0 && (
        <>
          <div className="fees-breakdown">
            <h2>Fees Breakdown</h2>
            <p>Tuition Fees: ₹{feesBreakdown.tutionFees.toFixed(2)}</p>
            <p>Development Fees: ₹{feesBreakdown.developmentFees.toFixed(2)}</p>
            <p>Exam Fees: ₹{feesBreakdown.examFees.toFixed(2)}</p>
            <p>Misc. Fees: ₹{feesBreakdown.miscFees.toFixed(2)}</p>
            <h3>Total Fees: ₹{feesBreakdown.totalFees.toFixed(2)}</h3>
          </div>
          <div className="loan-section">
            <h2>Select Loan Option</h2>
            <div className="form-group">
              <label htmlFor="loan">Loan Options:</label>
              <select
                id="loan"
                name="loan"
                value={loanDetails.selectedLoan}
                onChange={handleLoanChange}
              >
                <option value="">Select Loan</option>
                {loanOptions.map((loan, index) => (
                  <option key={index} value={loan.name}>
                    {loan.name} ({loan.interestRate}%)
                  </option>
                ))}
              </select>
            </div>
            {loanDetails.selectedLoan && (
              <div>
                <label htmlFor="tenure">Select Tenure (in years):</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={loanDetails.tenure}
                  onChange={handleTenureChange}
                  className="tenure-slider"
                />
                <span>{loanDetails.tenure} years</span>
                <p>Monthly EMI: ₹{loanDetails.monthlyEMI.toFixed(2)}</p>
              </div>
            )}
          </div>
        </>
      )}
      <div className="chart-container">
        <canvas id="myPieChart" width="400" height="400" />
      </div>
    </div>
  );
};

export default FeesCalculator;
