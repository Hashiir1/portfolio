// ===== Light / Dark Theme Toggle =====
(function () {
    const root = document.documentElement;
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    function setIcon(theme) {
        if (!toggleBtn) return;
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    }

    if (savedTheme === 'light') root.setAttribute('data-theme', 'light');
    setIcon(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = root.getAttribute('data-theme') === 'light';
            const nextTheme = isLight ? 'dark' : 'light';
            if (nextTheme === 'light') {
                root.setAttribute('data-theme', 'light');
            } else {
                root.removeAttribute('data-theme');
            }
            localStorage.setItem('portfolio-theme', nextTheme);
            setIcon(nextTheme);
            toggleBtn.classList.add('spin');
            setTimeout(() => toggleBtn.classList.remove('spin'), 500);
        });
    }
})();

// ===== Scroll Reveal Animations =====
(function () {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
})();

// ===== Projects Category Filter =====
(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box[data-category]');
    const categoryHeadings = document.querySelectorAll('.project-category-heading');
    if (!filterBtns.length || !projectBoxes.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
            const filter = btn.dataset.filter;

            projectBoxes.forEach(box => {
                const match = filter === 'all' || box.dataset.category === filter;
                box.classList.toggle('hidden-project', !match);
                if (match) box.classList.add('active');
            });

            categoryHeadings.forEach(h => {
                const match = filter === 'all' || h.dataset.category === filter;
                h.style.display = match ? '' : 'none';
            });
        });
    });
})();

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}