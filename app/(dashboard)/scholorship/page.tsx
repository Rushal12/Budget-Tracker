"use client";

import React, { useState, useEffect } from 'react';
import './StudentLoanSuggestions.css';

interface LoanSuggestion {
  id: number;
  name: string;
  interestRate: string;
  description: string;
  logo: string;
  url: string; // Add URL property
}

const loanSuggestionsData: LoanSuggestion[] = [
  {
    id: 1,
    name: "State Bank of India (SBI) Student Loan Scheme",
    interestRate: "Competitive",
    description: "Covers a wide range of courses in India and abroad. Repayment starts after the course completion.",
    logo: "/image/sbi.jpg",
    url: "https://sbi.co.in/web/personal-banking/loans/education-loans" // Add appropriate URL
  },
  {
    id: 2,
    name: "HDFC Bank Education Loan",
    interestRate: "Flexible",
    description: "Offers loans for Indian and international courses. Flexible repayment options. Quick loan approval process.",
    logo: "/image/hdfc.jpg",
    url: "https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan/educational-loan-for-indian-education" // Add appropriate URL
  },
  {
    id: 3,
    name: "ICICI Bank Education Loan",
    interestRate: "Competitive",
    description: "Covers a variety of courses and institutions. Offers tax benefits under Section 80E.",
    logo: "/image/icici.jpg",
    url: "https://www.icicibank.com/personal-banking/loans/education-loan" // Add appropriate URL
  },
  {
    id: 4,
    name: "Axis Bank Education Loan",
    interestRate: "Attractive",
    description: "Loans available for a wide range of courses in India and abroad. Simple documentation process.",
    logo: "/image/axis.jpg",
    url: "https://www.axisbank.com/retail/loans/education-loan" // Add appropriate URL
  },
  {
    id: 5,
    name: "Punjab National Bank (PNB) Saraswati Education Loan",
    interestRate: "Easy",
    description: "Loans for both domestic and international studies. No processing fee for loans up to INR 4 lakh.",
    logo: "/image/pnb.jpg",
    url: "https://www.pnbindia.in/education.html" // Add appropriate URL
  },
  {
    id: 6,
    name: "Bank of Baroda Education Loan",
    interestRate: "Concessional",
    description: "Covers a wide range of academic courses. Concessional interest rates for female students.",
    logo: "/image/bob.jpg",
    url: "https://www.bankofbaroda.in/personal-banking/loans/education-loan" // Add appropriate URL
  },
  {
    id: 7,
    name: "Canara Bank Vidya Turant Loan Scheme",
    interestRate: "Concessional",
    description: "Loans for students of premier institutions like IITs, IIMs, etc. Quick processing and disbursal.",
    logo: "/image/canara.jpg",
    url: "https://canarabank.com/iba-model-education-loan-scheme" // Add appropriate URL
  },
  {
    id: 8,
    name: "IDBI Bank Education Loan",
    interestRate: "Competitive",
    description: "Loans for a variety of courses in India and abroad. No collateral required for loans up to INR 4 lakh.",
    logo: "/image/idbi.jpg",
    url: "https://www.idbibank.in/education-loan.aspx" // Add appropriate URL
  },
];

const StudentLoanSuggestions: React.FC = () => {
  const [loanSuggestions, setLoanSuggestions] = useState<LoanSuggestion[]>([]);

  useEffect(() => {
    setLoanSuggestions(loanSuggestionsData);
  }, []);

  return (
    <div className="dark-theme">
      <h1>Student Loan Suggestions</h1>
      <div className="loan-suggestions">
        {loanSuggestions.map((loan) => (
          <div className="loan-suggestion-box" key={loan.id}>
            <a href={loan.url} target="_blank" rel="noopener noreferrer">
              <img src={loan.logo} width="100" height="100" alt={loan.name} />
            </a>
            <h2>{loan.name}</h2>
            <p>Interest Rate: {loan.interestRate}</p>
            <p>{loan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentLoanSuggestions;
