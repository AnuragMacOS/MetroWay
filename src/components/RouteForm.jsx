import React from 'react';

export function RouteForm({
  stations,
  sourceStation,
  destinationStation,
  onSourceChange,
  onDestinationChange,
  onSubmit,
}) {
  return (
    <form className="route-form-section" onSubmit={onSubmit}>
      <div className="dropdowns-split">
        <div className="station-dropdown-block">
          <label htmlFor="source-station" className="dropdown-label">
            Source station
          </label>
          <div className="select-wrapper">
            <select
              id="source-station"
              value={sourceStation}
              onChange={(e) => onSourceChange(e.target.value)}
              className="station-select"
            >
              <option value="">-- select station --</option>
              {stations.map((st) => (
                <option key={`src-${st}`} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="station-dropdown-block">
          <label htmlFor="destination-station" className="dropdown-label">
            Destination Station
          </label>
          <div className="select-wrapper">
            <select
              id="destination-station"
              value={destinationStation}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="station-select"
            >
              <option value="">-- select station --</option>
              {stations.map((st) => (
                <option key={`dest-${st}`} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="button-center-wrapper">
        <button
          type="submit"
          className="find-route-btn"
          disabled={!sourceStation || !destinationStation}
        >
          Find Route
        </button>
      </div>
    </form>
  );
}
