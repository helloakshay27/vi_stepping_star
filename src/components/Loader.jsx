import React from 'react';
import '../LoadingOverlay.css'; // We'll create this CSS file next

/**
 * A simple overlay component that blurs the background and shows a red loading spinner.
 * @param {object} props
 * @param {boolean} props.isLoading - Controls whether the overlay is visible.
 */
function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay" aria-live="assertive" role="alert">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loader;