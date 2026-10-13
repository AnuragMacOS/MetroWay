import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RouteForm } from './components/RouteForm';
import { InteractiveMap } from './components/InteractiveMap';
import { RouteResults } from './components/RouteResults';
import { PaymentModal } from './components/PaymentModal';

import { STATIONS, findShortestPath } from './utils/graph';

export default function App() {
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [calculatedRoute, setCalculatedRoute] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('metroway_wallet_balance');
    return saved !== null ? parseInt(saved, 10) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('metroway_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  const handleFindRoute = (e) => {
    if (e) e.preventDefault();
    if (!sourceStation || !destinationStation) return;

    const result = findShortestPath(sourceStation, destinationStation);
    if (result) {
      setCalculatedRoute(result);
      setIsPaid(false);
      setShowResults(true);
    }
  };

  const handlePayClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!calculatedRoute) return;
    if (walletBalance >= calculatedRoute.cost) {
      setWalletBalance((prev) => prev - calculatedRoute.cost);
      setIsPaid(true);
      setIsPaymentModalOpen(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <div className="metro-app-wrapper">
      <Header balance={walletBalance} />

      <RouteForm
        stations={STATIONS}
        sourceStation={sourceStation}
        destinationStation={destinationStation}
        onSourceChange={setSourceStation}
        onDestinationChange={setDestinationStation}
        onSubmit={handleFindRoute}
      />

      <InteractiveMap />

      {showResults && calculatedRoute && (
        <RouteResults
          route={calculatedRoute}
          source={sourceStation}
          destination={destinationStation}
          isPaid={isPaid}
          onPayClick={handlePayClick}
          onClose={handleCloseResults}
        />
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        balance={walletBalance}
        cost={calculatedRoute ? calculatedRoute.cost : 0}
        onConfirm={handleConfirmPayment}
        onCancel={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
}
