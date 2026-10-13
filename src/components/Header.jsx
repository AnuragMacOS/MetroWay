import React from 'react';

export function Header({ balance }) {
  return (
    <header className="header-section">
      <div className="header-brand">
        <img src="/logo.png" alt="MetroWay Logo" className="header-logo" />
        <h1 className="header-title">MetroWay</h1>
      </div>
      <p className="header-subtitle">Shortest Route Finder using Dijkstra's Algorithm</p>
      <div className="header-balance">
        Balance: <strong>₹{balance}</strong>
      </div>
    </header>
  );
}
