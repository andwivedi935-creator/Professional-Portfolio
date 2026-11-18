/**
 * Portfolio Interactive Functionality
 * Pure Vanilla JavaScript (no external libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Enable progressive enhancement styles for scroll-reveal animations
  document.documentElement.classList.add('js-enabled');

  setupProfilePhoto();
  setupFallbackImages();
  setupMobileNavigation();
  setupSmoothScrolling();
  setupScrollSpy();
  setupScrollReveal();
  setupProjectDetailsToggle();
  setupInternshipFilter();
  setupCertificateModal();
  setupCopyEmail();
  setupPrintButtons();
  setupBackToTop();
});

/**
 * 1. Handle Profile Photo vs. Clean Monogram Placeholder
 * Shows assets/profile.jpg when present; keeps editorial monogram fallback if absent.
 */
function setupProfilePhoto() {
  const portraitFrame = document.getElementById('portraitFrame');
  const profilePhoto = document.getElementById('profilePhoto');
  if (!portraitFrame || !profilePhoto) return;

  const showPhoto = () => {
    if (profilePhoto.naturalWidth > 0) {
      portraitFrame.classList.remove('is-placeholder');
    }
  };

  const showPlaceholder = () => {
    portraitFrame.classList.add('is-placeholder');
  };

  profilePhoto.addEventListener('load', showPhoto);
  profilePhoto.addEventListener('error', showPlaceholder);

  // Handle cached image state if already evaluated before listener attached
  if (profilePhoto.complete) {
    if (profilePhoto.naturalWidth > 0) {
      showPhoto();
    } else {
      showPlaceholder();
    }
  }
}

/**
 * 2. Handle Local vs. Vite Static Asset Paths
 * Ensures images with data-fallback-src load in both Vite dev/build and static GitHub Pages.
 */
function setupFallbackImages() {
  const imagesWithFallback = document.querySelectorAll('img[data-fallback-src]');
  imagesWithFallback.forEach((img) => {
    img.addEventListener('error', () => {
      const fallbackSrc = img.getAttribute('data-fallback-src');
      if (fallbackSrc && img.getAttribute('src') !== fallbackSrc) {
        img.setAttribute('src', fallbackSrc);
      }
    });
  });
}

/**
 * 3. Responsive Mobile Navigation Drawer
 */
function setupMobileNavigation() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (!menuToggle || !mobileDrawer) return;

  const setDrawerState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    mobileDrawer.hidden = !isOpen;
  };

  menuToggle.addEventListener('click', () => {
    const isCurrentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawerState(!isCurrentlyOpen);
  });

  // Close drawer when any mobile navigation link is clicked
  const mobileLinks = mobileDrawer.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerState(false));
  });

  // Close drawer with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileDrawer.hidden) {
      setDrawerState(false);
      menuToggle.focus();
    }
  });
}

/**
 * 4. Smooth Scrolling for Internal Anchor Links
 */
function setupSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
}

/**
 * 5. Active Navigation Highlighting on Scroll (Scroll-Spy)
 */
function setupScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('.primary-nav .nav-link'));
  if (!navLinks.length || !('IntersectionObserver' in window)) return;

  const sectionMap = navLinks
    .map((link) => {
      const href = link.getAttribute('href');
      const section = href ? document.querySelector(href) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === activeId);
        });
      });
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0,
    }
  );

  sectionMap.forEach(({ section }) => observer.observe(section));
}

/**
 * 6. Subtle Scroll-Reveal Animations
 */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/**
 * 7. Interactive Project Summary Toggle
 */
function setupProjectDetailsToggle() {
  const toggleButtons = document.querySelectorAll('.project-toggle-btn');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const detailsPanel = targetId ? document.getElementById(targetId) : null;
      if (!detailsPanel) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;

      button.setAttribute('aria-expanded', String(nextExpanded));
      detailsPanel.hidden = !nextExpanded;
      button.textContent = nextExpanded ? 'Hide Project Summary' : 'View Project Summary';
    });
  });
}

/**
 * 8. Interactive Internship Status Filter Tabs
 */
function setupInternshipFilter() {
  const filterButtons = document.querySelectorAll('[data-internship-filter]');
  const internshipCards = document.querySelectorAll('#internshipGrid .internship-card');
  if (!filterButtons.length || !internshipCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.getAttribute('data-internship-filter');

      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });

      internshipCards.forEach((card) => {
        const cardStatus = card.getAttribute('data-status');
        const shouldShow = selectedFilter === 'all' || cardStatus === selectedFilter;
        card.hidden = !shouldShow;
      });
    });
  });
}

/**
 * 9. Certificate Evidence Modal Lightbox
 */
function setupCertificateModal() {
  const modal = document.getElementById('certificateModal');
  const openBtn = document.getElementById('openCertificateModalBtn');
  const closeBtn = document.getElementById('closeCertificateModalBtn');
  if (!modal || !openBtn || !closeBtn) return;

  let previouslyFocusedElement = null;

  const openModal = () => {
    previouslyFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  };

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking the dark backdrop outside the modal box
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

/**
 * 10. Copy Email Address to Clipboard
 */
function setupCopyEmail() {
  const copyButton = document.getElementById('copyEmailBtn');
  if (!copyButton) return;

  let resetTimer = null;

  copyButton.addEventListener('click', async () => {
    const emailAddress = copyButton.getAttribute('data-email');
    if (!emailAddress) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = emailAddress;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyButton.textContent = 'Email Copied';
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyButton.textContent = 'Copy Email';
      }, 2200);
    } catch {
      copyButton.textContent = 'Copy Failed';
    }
  });
}

/**
 * 11. Print / Download Portfolio PDF via window.print()
 */
function setupPrintButtons() {
  const printButtons = document.querySelectorAll('.print-trigger');
  printButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.print();
    });
  });
}

/**
 * 12. Back-to-Top Floating Button
 */
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateVisibility = () => {
    backToTopBtn.hidden = window.scrollY < 420;
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
}
