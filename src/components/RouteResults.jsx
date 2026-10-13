import React from 'react';
import { TicketView } from './TicketView';

export function RouteResults({
  route,
  source,
  destination,
  isPaid,
  onPayClick,
  onClose,
}) {
  if (!route) return null;

  return (
    <div className="results-view-overlay" onClick={onClose}>
      <div className="results-view-container" onClick={(e) => e.stopPropagation()}>
        <div className="results-top-nav">
          <button type="button" onClick={onClose} className="back-nav-btn">
            ← Back to Route Planner
          </button>
          <button type="button" onClick={onClose} className="close-x-btn" title="Close">
            ✕
          </button>
        </div>

        <div className="shortest-route-path-box">
          <div className="shortest-route-title">Shortest Route:</div>
          <div className="route-chain-text">{route.pathString}</div>
        </div>

        <div className="shortest-route-metrics-box">
          <div className="metric-item">
            <span className="metric-label">Total Distance:</span>
            <span className="metric-val">{route.distance} KM</span>
          </div>
          <div className="metric-separator">•</div>
          <div className="metric-item">
            <span className="metric-label">Total Time:</span>
            <span className="metric-val">{route.time} minutes</span>
          </div>
        </div>

        <TicketView
          source={source}
          destination={destination}
          cost={route.cost}
          isPaid={isPaid}
          onPayClick={onPayClick}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
