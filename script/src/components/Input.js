'use client';
import { useState } from 'react';
import styles from '../styles/page.module.css';

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
    </div>
  );
} 