import { useState } from 'react';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5';
import styles from '../App.module.css';

export default function Input({ 
  value, 
  onChange, 
  type = 'text',
  min,
  max,
  step,
  placeholder = ''
}) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    if (type === 'number') {
      newValue = Number(newValue);
      if (min !== undefined && newValue < min) newValue = min;
      if (max !== undefined && newValue > max) newValue = max;
    }
    
    onChange(newValue);
  };

  const handleSpinnerClick = (direction) => {
    const currentValue = parseFloat(value);
    const stepValue = parseFloat(step || 1);
    const newValue = direction === 'up' 
      ? currentValue + stepValue 
      : currentValue - stepValue;
    
    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;
    
    onChange(newValue);
  };

  return (
    <div className={`${styles.inputWrapper} ${focused ? styles.focused : ''}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={styles.input}
      />
      {type === 'number' && (
        <div className={styles.spinnerButtons}>
          <button 
            className={styles.spinnerButton}
            onClick={() => handleSpinnerClick('up')}
            type="button"
          >
            <IoCaretUp />
          </button>
          <button 
            className={styles.spinnerButton}
            onClick={() => handleSpinnerClick('down')}
            type="button"
          >
            <IoCaretDown />
          </button>
        </div>
      )}
    </div>
  );
} 