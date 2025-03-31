// Only run in web page context, not in extension popup
if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
  // Convert all password fields to text fields
  function convertPasswordFields() {
    document.querySelectorAll('input[type="password"]').forEach((input) => {
      input.setAttribute("type", "text");
      (input as HTMLElement).style.backgroundColor = "red";
    });
  }

  // Set up observer and run initial conversion
  function setupObserver() {
    convertPasswordFields();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          convertPasswordFields();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }
}
