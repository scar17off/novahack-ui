'use client';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/page.module.css';

export default function ColorPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const presetColors = [
    '#4facfe', '#00f2fe', '#ff0844', '#f9d423',
    '#00dbde', '#fc00ff', '#fbab7e', '#85FFBD'
  ];

  return (
    <div className={styles.colorPicker} ref={pickerRef}>
      <button
        className={styles.colorButton}
        onClick={() => setIsOpen(!isOpen)}
        style={{ '--color': value }}
      >
        <div className={styles.colorPreview} />
      </button>
      {isOpen && (
        <div className={styles.colorPopover}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.colorInput}
          />
          <div className={styles.presetColors}>
            {presetColors.map((color) => (
              <button
                key={color}
                className={styles.presetColor}
                style={{ '--color': color }}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 