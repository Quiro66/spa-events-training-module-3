import { navigateTo } from "./router";

// Wait until the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Handle all clicks on links with [data-link]
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.getAttribute("href")); // Navigate without reload
    }
  });

  // On initial load, navigate to the current path
  navigateTo(location.pathname);
});

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  navigateTo(location.pathname);
});
