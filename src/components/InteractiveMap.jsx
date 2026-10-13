import React, { useState } from 'react';

export function InteractiveMap() {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <div className="map-compact-container">
      <div className="map-preview-card" onClick={() => setIsEnlarged(true)}>
        <div className="map-preview-header">
          <h2 className="map-preview-title">Delhi Metro Route Map</h2>
        </div>

        <div className="map-thumbnail-wrapper">
          <img
            src="/delhi_metro_map.png"
            alt="Delhi Metro Route Map"
            className="map-thumbnail-image"
          />
        </div>
      </div>

      {isEnlarged && (
        <div className="map-modal-backdrop" onClick={() => setIsEnlarged(false)}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3 className="map-modal-title">Delhi Metro Route Map</h3>
              <button
                type="button"
                className="map-close-btn"
                onClick={() => setIsEnlarged(false)}
              >
                ✕ Close
              </button>
            </div>

            <div className="map-modal-body">
              <iframe
                src="/Metro.pdf#toolbar=1&navpanes=0"
                title="Delhi Metro Route Map"
                className="map-pdf-frame"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
