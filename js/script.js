document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // MOBILE NAV TOGGLE
  // ============================
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Allow tapping a dropdown parent link to expand it on mobile instead of navigating
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          link.parentElement.classList.toggle('dropdown-open');
        }
      });
    });
  }

  // ============================
  // NEWSLETTER FORM
  // ============================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.hidden = true;
    newsletterSuccess.hidden = false;
  });

  // ============================
  // ANIMATED STAT COUNTERS
  // ============================
  const counters = document.querySelectorAll('.counter');

  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ============================
  // INGREDIENT CARD EXPAND
  // ============================
  document.querySelectorAll('.ingredient-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.ingredient-card');
      const moreText = card.querySelector('.ingredient-more');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      moreText.hidden = isExpanded;
      btn.setAttribute('aria-expanded', String(!isExpanded));
      btn.innerHTML = isExpanded
        ? 'Learn More <i class="fa-solid fa-chevron-down"></i>'
        : 'Show Less <i class="fa-solid fa-chevron-up"></i>';
    });
  });

  // ============================
  // TESTIMONIAL CAROUSEL
  // ============================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialCards = Array.from(testimonialTrack.querySelectorAll('.testimonial-card'));
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  let testimonialIndex = 0;

  testimonialCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDotsContainer.appendChild(dot);
  });
  const testimonialDots = Array.from(testimonialDotsContainer.querySelectorAll('.dot'));

  function updateTestimonialCarousel() {
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
      dot.setAttribute('aria-current', i === testimonialIndex ? 'true' : 'false');
    });
  }

  function goToTestimonial(index) {
    testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
    updateTestimonialCarousel();
  }

  testimonialNext.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));
  testimonialPrev.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));

  document.getElementById('testimonialCarousel').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToTestimonial(testimonialIndex + 1);
    if (e.key === 'ArrowLeft') goToTestimonial(testimonialIndex - 1);
  });

});