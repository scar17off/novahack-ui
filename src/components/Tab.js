import { useState } from 'react';
import styles from '../App.module.css';

export default function Tab({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <>
      <div className={styles.sidebar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.mainContent}>
        {children(activeTab)}
      </div>
    </>
  );
} 