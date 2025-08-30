import { useState, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import styles from '../App.module.css';

export default function Dropdown({ 
  options, 
  value, 
  onChange, 
  multiple = false,
  placeholder = "Select option" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleSelect = (option) => {
    if (multiple) {
      const newValue = value.includes(option.value)
        ? value.filter(v => v !== option.value)
        : [...value, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (!value.length) return placeholder;
      const selectedLabels = value.map(v => 
        options.find(opt => opt.value === v)?.label
      ).filter(Boolean);
      
      // Get the available width for text
      const maxWidth = triggerRef.current?.offsetWidth - 40; // 40px for padding and icon
      let displayText = '';
      let tempText = '';
      
      for (let i = 0; i < selectedLabels.length; i++) {
        const separator = i === selectedLabels.length - 1 ? '' : ', ';
        tempText += selectedLabels[i] + separator;
        
        // Create a temporary span to measure text width
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = '14px';
        tempSpan.textContent = tempText + '...';
        document.body.appendChild(tempSpan);
        
        if (tempSpan.offsetWidth > maxWidth) {
          if (i === 0) {
            displayText = selectedLabels[0] + '...';
          } else {
            displayText = displayText.trim() + '...';
          }
          document.body.removeChild(tempSpan);
          break;
        }
        
        displayText = tempText;
        document.body.removeChild(tempSpan);
      }
      
      return displayText;
    }
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : placeholder;
  };

  return (
    <div className={styles.dropdown}>
      <button
        ref={triggerRef}
        className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.dropdownValue}>{getDisplayValue()}</span>
        <IoChevronDown className={styles.dropdownIcon} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.dropdownItem} ${
                multiple 
                  ? value.includes(option.value) ? styles.selected : ''
                  : value === option.value ? styles.selected : ''
              }`}
              onClick={() => handleSelect(option)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 