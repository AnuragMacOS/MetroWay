import React from 'react';

export function PaymentModal({
  isOpen,
  balance,
  cost,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const canAfford = balance >= cost;

  return (
    <div className="payment-modal-backdrop" onClick={onCancel}>
      <div className="payment-modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="payment-modal-title">Payment Confirmation</h3>

        <p className="payment-modal-question">
          Are you sure you want to proceed with the payment?
        </p>

        <div className="payment-modal-details">
          <div className="payment-modal-row">
            <span>Ticket Cost:</span>
            <strong>₹{cost}</strong>
          </div>
          <div className="payment-modal-row">
            <span>Current Balance:</span>
            <strong>₹{balance}</strong>
          </div>
          <div className="payment-modal-row remaining-row">
            <span>Balance After Payment:</span>
            <strong style={{ color: canAfford ? '#10B981' : '#EF4444' }}>
              ₹{balance - cost}
            </strong>
          </div>
        </div>

        {!canAfford && (
          <div className="insufficient-warning">
            Insufficient balance to complete cash payment.
          </div>
        )}

        <div className="payment-modal-actions">
          <button
            type="button"
            className="payment-confirm-btn"
            onClick={onConfirm}
            disabled={!canAfford}
          >
            Yes
          </button>
          <button
            type="button"
            className="payment-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
