export default function Section({ children }) {
  return (
    <div className="tabContent">
      <div className="settingGroup">
        {children}
      </div>
    </div>
  );
} 