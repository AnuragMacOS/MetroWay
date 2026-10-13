import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function TicketView({
  source,
  destination,
  cost,
  isPaid,
  onPayClick,
  onClose,
}) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const payload = `METROWAY-TICKET:${source}->${destination}:COST=INR_${cost}:STATUS=${isPaid ? 'PAID' : 'UNPAID'}`;
    QRCode.toDataURL(payload, {
      width: 170,
      margin: 1,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, [source, destination, cost, isPaid]);

  const handleDownloadReceipt = () => {
    if (!qrUrl) return;

    const canvas = document.createElement('canvas');
    canvas.width = 380;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, 54);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MetroWay Ticket Receipt', canvas.width / 2, 34);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748B';
    ctx.font = '14px sans-serif';
    ctx.fillText('Source:', 30, 95);
    ctx.fillText('Destination:', 30, 125);
    ctx.fillText('Total Cost:', 30, 155);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(source, 130, 95);
    ctx.fillText(destination, 130, 125);
    ctx.fillText(`₹${cost}`, 130, 155);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 180);
    ctx.lineTo(canvas.width - 30, 180);
    ctx.stroke();

    const qrImg = new Image();
    qrImg.onload = () => {
      ctx.drawImage(qrImg, (canvas.width - 190) / 2, 200, 190, 190);

      ctx.fillStyle = isPaid ? '#12B981' : '#64748B';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isPaid ? 'PAYMENT DONE' : 'PAYMENT PENDING', canvas.width / 2, 420);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px sans-serif';
      ctx.fillText('Scan at AFC Gate Entry', canvas.width / 2, 445);

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `MetroWay_Ticket_${source}_to_${destination}.png`;
      a.click();
    };
    qrImg.src = qrUrl;
  };

  return (
    <div className="ticket-view-card">
      <div className="ticket-card-header">
        <h3 className="ticket-title">Ticket Details</h3>
      </div>

      <div className="ticket-info-list">
        <div className="ticket-info-row">
          <span className="ticket-info-label">Source:</span>
          <span className="ticket-info-val">{source}</span>
        </div>
        <div className="ticket-info-row">
          <span className="ticket-info-label">Destination:</span>
          <span className="ticket-info-val">{destination}</span>
        </div>
        <div className="ticket-info-row">
          <span className="ticket-info-label">Total Cost:</span>
          <span className="ticket-info-val highlight-fare">₹{cost}</span>
        </div>
      </div>

      <div className="ticket-qr-container">
        {qrUrl ? (
          <img src={qrUrl} alt="MetroWay QR Ticket" className="ticket-qr-image" />
        ) : (
          <div className="ticket-qr-placeholder">Generating QR code...</div>
        )}
      </div>

      <div className="ticket-action-wrapper">
        <button
          type="button"
          onClick={onPayClick}
          className={`pay-cash-btn ${isPaid ? 'paid-btn' : ''}`}
          disabled={isPaid}
        >
          {isPaid ? 'Payment Done' : 'Pay with Cash'}
        </button>
      </div>

      <div className="ticket-bottom-actions">
        <button type="button" onClick={handleDownloadReceipt} className="ticket-download-btn">
          Download
        </button>
        <button type="button" onClick={onClose} className="ticket-close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
