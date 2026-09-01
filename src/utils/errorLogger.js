export function logErrorToMonitoring(errorInfo) {
  const timestamp = new Date().toISOString();
  const payload = {
    timestamp,
    error: errorInfo.message || String(errorInfo),
    stack: errorInfo.stack || 'No stack trace available',
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  console.error('[PRODUCTION ERROR LOGGED]:', payload);

  // Store in localStorage for admin inspection
  try {
    const existingLogs = JSON.parse(localStorage.getItem('sv_error_logs') || '[]');
    existingLogs.unshift(payload);
    localStorage.setItem('sv_error_logs', JSON.stringify(existingLogs.slice(0, 50)));
  } catch (e) {
    // Ignore storage quota errors
  }
}
