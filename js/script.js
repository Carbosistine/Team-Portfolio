// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const html = document.documentElement;

// Ensure icons are correctly synced based on initial class state
function updateIcons() {
    if (!themeToggleBtn) return;
    if (html.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
    }
}

// Initial setup based on localStorage or system config
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}
updateIcons();

// Toggle Event
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        html.classList.toggle('dark');
        updateIcons();

        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
}

// Scroll Animation Logic (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-scroll');
        } else {
            entry.target.classList.remove('show-scroll');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-scroll');
hiddenElements.forEach((el) => observer.observe(el));

// Navbar blur and shrink effect on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'py-1');
            navbar.classList.remove('py-2');
            navbar.style.background = html.classList.contains('dark') ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)';
        } else {
            navbar.classList.remove('shadow-md', 'py-1');
            navbar.classList.add('py-2');
            navbar.style.background = ''; // Reverts to the glassmorphism class style
        }
    });
}

// Ensure navbar updates background appropriately when theme toggles while scrolled Down
if (themeToggleBtn && navbar) {
    themeToggleBtn.addEventListener('click', () => {
        if (window.scrollY > 50) {
            navbar.style.background = html.classList.contains('dark') ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)';
        }
    });
}

// Burger Menu Toggle
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open', !isOpen);
        burgerIcon.classList.toggle('hidden', !isOpen);
        closeIcon.classList.toggle('hidden', isOpen);
    });

    // Close menu when a mobile nav link is clicked
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            burgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// Cursor-following tooltip for team cards
(function () {
    const tooltip = document.getElementById('card-tooltip');
    const cards = document.querySelectorAll('[data-team-card]');

    if (tooltip && cards.length) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => tooltip.classList.add('visible'));
            card.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
            card.addEventListener('mousemove', e => {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top  = e.clientY + 'px';
            });
        });
    }

    // Mobile hint: show briefly when team section enters view
    const hint = document.getElementById('team-hint');
    const teamSection = document.getElementById('team');
    let hintShown = false;

    if (hint && teamSection) {
        const teamHintObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hintShown) {
                    hintShown = true;
                    hint.classList.add('show');
                    setTimeout(() => hint.classList.remove('show'), 2500);
                }
            });
        }, { threshold: 0.25 });

        teamHintObserver.observe(teamSection);
    }
})();
