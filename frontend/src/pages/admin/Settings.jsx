import { useState } from "react";
import "./Settings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    allowRegistration: true,
    enableAI: true,
    enableRiskAI: true,
    aiSensitivity: 60,
    maintenanceMode: false,
    emailAlerts: true
  });

  const toggle = (key) =>
    setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>
      <p className="subtitle">System configuration & platform controls</p>

      {/* SECURITY */}
      <div className="settings-card">
        <h3>🔐 Security & Access</h3>

        <SettingRow
          label="Allow New User Registration"
          checked={settings.allowRegistration}
          onChange={() => toggle("allowRegistration")}
        />

        <button className="danger-btn">Logout All Active Sessions</button>
      </div>

      {/* AI ENGINE */}
      <div className="settings-card">
        <h3>🧠 AI Engine Controls</h3>

        <SettingRow
          label="Enable AI Recommendations"
          checked={settings.enableAI}
          onChange={() => toggle("enableAI")}
        />

        <SettingRow
          label="Enable Risk Prediction AI"
          checked={settings.enableRiskAI}
          onChange={() => toggle("enableRiskAI")}
        />

        <div className="slider-row">
          <label>AI Risk Sensitivity</label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.aiSensitivity}
            onChange={(e) =>
              setSettings({ ...settings, aiSensitivity: e.target.value })
            }
          />
          <span>{settings.aiSensitivity}%</span>
        </div>
      </div>

      {/* PLATFORM */}
      <div className="settings-card">
        <h3>⚙ Platform Controls</h3>

        <SettingRow
          label="Maintenance Mode"
          checked={settings.maintenanceMode}
          onChange={() => toggle("maintenanceMode")}
        />

        <SettingRow
          label="Email Notifications"
          checked={settings.emailAlerts}
          onChange={() => toggle("emailAlerts")}
        />
      </div>

      <button className="save-btn">Save Settings</button>
    </div>
  );
}

/* Reusable toggle row */
function SettingRow({ label, checked, onChange }) {
  return (
    <div className="setting-row">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider" />
      </label>
    </div>
  );
}
