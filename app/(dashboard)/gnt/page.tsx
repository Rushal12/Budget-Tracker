

"use client";

import React, { useState } from 'react';
import './MoneyHistoryPage.css';

interface LoanEntry {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: string;
  type: 'lend' | 'borrow';
}

const LoanTracker: React.FC = () => {
  const [entries, setEntries] = useState<LoanEntry[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'lend' | 'borrow'>('lend');

  const addEntry = () => {
    if (name && description && amount && date) {
      const newEntry: LoanEntry = {
        id: Date.now(),
        name,
        description,
        amount: parseFloat(amount),
        date,
        type,
      };
      setEntries([...entries, newEntry]);
      setName('');
      setDescription('');
      setAmount('');
      setDate('');
    }
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const netAmount = entries.reduce((acc, entry) => {
    return entry.type === 'lend' ? acc + entry.amount : acc - entry.amount;
  }, 0);

  return (
    <div className="loan-tracker">
      <h1>Give And Take</h1>
      <h2 className={netAmount >= 0 ? 'positive' : 'negative'}>
        Net Amount: {netAmount >= 0 ? `+${netAmount}` : `${netAmount}`}
      </h2>
      <div className="entry-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value as 'lend' | 'borrow')}>
          <option value="lend">Lend</option>
          <option value="borrow">Borrow</option>
        </select>
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <ul className="entries-list">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.type}>
            <span>{entry.name}</span>
            <span>{entry.description}</span>
            <span>{entry.amount}</span>
            <span>{entry.date}</span>
            <button onClick={() => removeEntry(entry.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanTracker;