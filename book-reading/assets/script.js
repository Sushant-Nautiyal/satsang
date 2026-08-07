const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const heroArt = document.querySelector('.hero-art');
if (heroArt) {
  window.addEventListener(
    'scroll',
    () => {
      const offset = Math.max(-12, Math.min(12, window.scrollY * 0.04));
      heroArt.style.transform = `translateY(${offset}px)`;
    },
    { passive: true }
  );
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove('active');
      const otherButton = otherItem.querySelector('.faq-question');
      const otherAnswer = otherItem.querySelector('.faq-answer');
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.style.maxHeight = '0px';
    });

    if (!isActive) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });

  if (item.classList.contains('active')) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }
});

const track = document.querySelector('.books-track');
const prevButton = document.querySelector('[data-carousel-prev]');
const nextButton = document.querySelector('[data-carousel-next]');

if (track && prevButton && nextButton) {
  const getScrollAmount = () => {
    const firstCard = track.querySelector('.book-tile');
    return firstCard ? firstCard.getBoundingClientRect().width + 16 : 240;
  };

  prevButton.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextButton.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}
