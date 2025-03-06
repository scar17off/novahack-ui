import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './components/Page';

// Wait for document to be ready
const init = () => {
    // Create container for react renderer
    const container = document.createElement('div');
    container.id = 'novahack-container';
    document.body.appendChild(container);

    // Apply some reset styles to our container
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999999;
        pointer-events: none;
    `;

    // Create style element for global styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        #novahack-container * {
            pointer-events: auto;
        }
    `;
    document.head.appendChild(styleEl);

    // Render the React app
    const root = createRoot(container);
    root.render(React.createElement(Page));
};

// Run the initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}