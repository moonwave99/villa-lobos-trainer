import { fingers, strings } from "./lib/data";

export default function AccentModesView({ accentMode, onSelect, disabled }) {
  function onChange(event) {
    onSelect(event.target.value);
  }

  return (
    <div className="accent-modes-view">
      <div className="accent-group">
        <h3>Accent By Note</h3>
        <div className="radio-group">
          <label>
            Quarter
            <input
              type="radio"
              value="notes.quarter"
              onChange={onChange}
              checked={accentMode === "notes.quarter"}
              disabled={disabled}
            />
          </label>
          <label>
            Even
            <input
              type="radio"
              value="notes.even"
              onChange={onChange}
              checked={accentMode === "notes.even"}
              disabled={disabled}
            />
          </label>
          <label>
            Odd
            <input
              type="radio"
              value="notes.odd"
              onChange={onChange}
              checked={accentMode === "notes.odd"}
              disabled={disabled}
            />
          </label>
        </div>
      </div>
      <div className="accent-group">
        <h3>Accent By Finger</h3>
        <div className="radio-group circular">
          {fingers.map((finger) => (
            <label key={finger}>
              {finger}
              <input
                type="radio"
                value={`fingers.${finger}`}
                onChange={onChange}
                checked={accentMode === `fingers.${finger}`}
                disabled={disabled}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="accent-group">
        <h3>Accent By String</h3>
        <div className="radio-group circular">
          {strings.map((string) => (
            <label key={string}>
              {string}
              <input
                type="radio"
                value={`strings.${string}`}
                onChange={onChange}
                checked={accentMode === `strings.${string}`}
                disabled={disabled}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
