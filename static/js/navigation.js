// Simple header position animation from home to subpages
document.addEventListener('DOMContentLoaded', function () {
  // Only run animation logic if we're on the home page
  const isHomePage = document.body.classList.contains('home');
  const links = isHomePage ? document.querySelectorAll('a.transition-subpage') : document.querySelectorAll('a.transition-home');

  // Function to calculate precise transform distance
  function calculateTransformDistance() {
    const isDesktop = window.innerWidth >= 600;
    const viewportHeight = window.innerHeight;
    const header = document.querySelector('section.header');

    if (!header) return 0;

    // Get the actual header dimensions
    const headerRect = header.getBoundingClientRect();
    const headerHeight = headerRect.height;

    // On home page: header is vertically centered, so its top position is:
    // (viewport center) - (half of header height)
    const homeHeaderTopPosition = (viewportHeight / 2) - (headerHeight / 2);
    const extraOffset = isDesktop ? 0 : -16; // Extra offset for mobile view

    return (homeHeaderTopPosition + extraOffset) * (isHomePage ? -1 : 1);
  }
  console.log({ links })

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Prevent default navigation
      e.preventDefault();

      if (!isHomePage) {
        const mainSection = document.querySelector('section.main');
        mainSection.innerHTML = ''; // Clear main section content immediately
      }

      // Calculate precise transform distance at the moment of click
      const transformDistance = calculateTransformDistance();

      // Apply the calculated transform directly to the header
      const header = document.querySelector('section.header');
      if (header) {
        header.style.transform = `translateY(${transformDistance}px)`;
      }

      // Add transitioning class for other styles
      document.body.classList.add('transitioning-to-subpage');
      
      // Preload image to avoid flicker
      new Image().src = "/img/profile.jpg"

      // Start preloading the next page immediately
      fetch(href)
        .then(response => response.text())
        .then(html => {
          // Parse the response HTML
          const parser = new DOMParser();
          const newDoc = parser.parseFromString(html, 'text/html');

          // Wait for animation to complete, then update the page
          setTimeout(() => {
            // Update the page title and main content first
            document.body.classList.remove('transitioning-to-subpage');
            document.title = newDoc.title;
            document.body.innerHTML = newDoc.body.innerHTML;
            document.body.className = newDoc.body.className;

            // Update browser history
            history.pushState({}, newDoc.title, href);

            // Re-initialize event listeners after page content update
            document.dispatchEvent(new Event('DOMContentLoaded'));
          }, 350);
        })
        .catch(error => {
          // If preloading fails, fall back to normal navigation
          console.warn('Preload failed, using normal navigation:', error);
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        });
    });
  });
});
