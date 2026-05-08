

// ==============================
// 2. ACTIVE NAV LINK ON SCROLL
// ==============================

// Highlights the correct nav link as user scrolls through sections
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav .right a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// ==============================
// 3. SKILL BAR ANIMATION
// ==============================

const skillBars = document.querySelectorAll('.bar span');

// set initial state
skillBars.forEach(bar => {
    bar.style.width = '0';
});

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.width;
            bar.style.transition = 'width 1.2s ease-out';
            obs.unobserve(bar);
        }
    });
}, { threshold: 0.4 });

// observe bars
skillBars.forEach(bar => observer.observe(bar));


// ==============================
// 4. SCROLL FADE-IN ANIMATION
// ==============================

// Sections and cards fade up when scrolled into view
const fadeElements = document.querySelectorAll(
    '.hero-section, .skills-section, .blog-section, .contact-section, .blog-card, .skill'
);

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach(el => fadeObserver.observe(el));


// ==============================
// 5. CONTACT FORM VALIDATION
// ==============================

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name     = form.querySelector('input[type="text"]');
    const email    = form.querySelector('input[type="email"]');
    const message  = form.querySelector('textarea');

    // Clear old errors
    clearErrors();

    let valid = true;

    if (name.value.trim() === '') {
        showError(name, 'Please enter your name');
        valid = false;
    }

    if (email.value.trim() === '') {
        showError(email, 'Please enter your email');
        valid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        valid = false;
    }

    if (message.value.trim() === '') {
        showError(message, 'Please enter a message');
        valid = false;
    }

    if (valid) {
        showSuccess();
        form.reset();
    }
});

function showError(input, message) {
    const error = document.createElement('p');
    error.classList.add('form-error');
    error.textContent = message;
    error.style.color = '#FF4D8D';
    error.style.fontSize = '12px';
    error.style.marginTop = '-10px';
    error.style.marginBottom = '10px';
    input.insertAdjacentElement('afterend', error);
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.remove());
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccess() {
    const success = document.createElement('p');
    success.textContent = 'Message sent successfully!';
    success.style.color = '#4CAF50';
    success.style.textAlign = 'center';
    success.style.marginTop = '10px';
    success.style.fontSize = '14px';
    form.appendChild(success);
    setTimeout(() => success.remove(), 4000);
}
