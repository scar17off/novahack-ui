export default function Section({ title, children }) {
  return (
    <div className="tabContent">
      <div className="settingGroup">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
} 