'useclient';
import { useState, useCallback } from 'react';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5';
import styles from '../App.module.css';

export default function Table({ 
  columns, 
  data,
  contextMenuOptions = []
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, rowData: null });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  const handleContextMenu = (e, rowData) => {
    e.preventDefault();
    
    // Get the window element
    const windowElement = e.currentTarget.closest(`.${styles.window}`);
    const windowRect = windowElement.getBoundingClientRect();
    
    // Get click position relative to the viewport
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate position relative to the window
    const menuX = x - windowRect.left;
    const menuY = y - windowRect.top;
    
    setContextMenu({
      visible: true,
      x: menuX,
      y: menuY,
      rowData
    });
  };

  const handleContextMenuClick = (handler) => {
    if (contextMenu.rowData && handler) {
      handler(contextMenu.rowData);
    }
    closeContextMenu();
  };

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, rowData: null });
  }, []);

  // Close context menu when clicking outside
  useState(() => {
    document.addEventListener('click', closeContextMenu);
    return () => document.removeEventListener('click', closeContextMenu);
  }, [closeContextMenu]);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className={`${styles.tableHeader} ${styles.sortable}`}
                onClick={() => handleSort(column.key)}
              >
                <div className={styles.headerContent}>
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span className={styles.sortIcon}>
                      {sortConfig.direction === 'asc' ? <IoCaretUp /> : <IoCaretDown />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={styles.tableRow}
              onContextMenu={(e) => handleContextMenu(e, row)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={styles.tableCell}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {contextMenu.visible && contextMenuOptions.length > 0 && (
        <div 
          className={styles.contextMenu}
          style={{ 
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y
          }}
        >
          {contextMenuOptions.map((option, index) => (
            <button
              key={index}
              className={styles.contextMenuItem}
              onClick={() => handleContextMenuClick(option.handler)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 