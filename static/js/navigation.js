const pageCache = {};

// Simple header position animation from home to subpages
document.addEventListener('DOMContentLoaded', function () {
    // Only run animation logic if we're on the home page
    const isHomePage = document.body.classList.contains('home');
    const links = isHomePage ? document.querySelectorAll('a.transition-subpage') : document.querySelectorAll('a.transition-home');
    if (isHomePage) {
        const navItems = document.querySelectorAll('body.home section.header nav li');
        Array.from(navItems).forEach(li => {
            const pageName = li.textContent.trim().toLocaleLowerCase();
            fetchPageContent(pageName);
        });
    }

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

        return homeHeaderTopPosition * (isHomePage ? -1 : 1);
    }

    async function fetchPageContent(href) {
        const urlPath = new URL(href, window.location.origin).pathname;
        const pathSegment = urlPath.split('/').filter(Boolean).pop() || '';

        if (pageCache[pathSegment]) {
            return pageCache[pathSegment];
        }

        const response = await fetch(href)
        const parser = new DOMParser();
        const page = parser.parseFromString(await response.text(), 'text/html');

        pageCache[pathSegment] = page;
        return page;
    }

    links.forEach(link => {
        link.addEventListener('click', async function (e) {
            // Prevent default navigation
            e.preventDefault();

            if (!isHomePage) {
                const mainSection = document.querySelector('section.main');
                mainSection.innerHTML = ''; // Clear main section content immediately
            }

            // Start preloading the next page 
            const href = this.getAttribute('href');
            newDocPromise = fetchPageContent(href);
            // Preload image to avoid flicker
            new Image().src = "/img/profile.jpg"

            // Calculate precise transform distance at the moment of click
            const transformDistance = calculateTransformDistance();

            // Apply the calculated transform directly to the header
            const header = document.querySelector('section.header');
            if (header) {
                header.style.transform = `translateY(${transformDistance}px)`;
            }

            // Add transitioning class for other styles
            document.body.classList.add('transitioning-to-subpage');

            const startTime = Date.now();
            let newDoc = null;
            try {
                newDoc = await newDocPromise
            } catch (error) {
                console.log({ error })
                // If preloading fails, fallback to normal navigation
                window.location.href = href;
                return;
            }
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, 350 - elapsed);
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
            }, delay);
        })
    });
});
