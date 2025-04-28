import React from 'react';
import '../LoadingOverlay.css'; // We'll create this CSS file next

/**
 * A simple overlay component that blurs the background and shows a red loading spinner.
 * @param {object} props
 * @param {boolean} props.isLoading - Controls whether the overlay is visible.
 */
function Loader({ isLoading }) {
  // If not loading, don't render anything
  if (!isLoading) {
    return null;
  }

  // Otherwise, render the overlay and spinner
  return (
    <div className="loading-overlay" aria-live="assertive" role="alert">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loader;