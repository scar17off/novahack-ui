import { createContext, useContext, useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import styles from '../App.module.css';

const TooltipContext = createContext();

export function TooltipProvider({ children }) {
  const [tooltip, setTooltip] = useState({ visible: false, text: '' });

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>
      {children}
      <div className={`${styles.tooltipFooter} ${tooltip.visible ? styles.visible : ''}`}>
        <div className={styles.tooltipContent}>
          <span className={styles.tooltipIcon}>
            <IoInformationCircleOutline />
          </span>
          <p>{tooltip.text}</p>
        </div>
      </div>
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
}

export function TooltipTrigger({ tooltip, children }) {
  const { setTooltip } = useTooltip();

  return (
    <div
      onMouseEnter={() => setTooltip({ visible: true, text: tooltip })}
      onMouseLeave={() => setTooltip({ visible: false, text: '' })}
    >
      {children}
    </div>
  );
} 