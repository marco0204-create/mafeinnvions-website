document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });

      // Hide mobile menu on link click
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('#hero h1, #hero p, #hero a', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from('#projects h2', {
    scrollTrigger: { trigger: '#projects h2', start: 'top 85%' },
    duration: 0.8, y: 50, opacity: 0,
  });

  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.project-card', start: 'top 85%' },
    duration: 0.8, x: -50, opacity: 0, stagger: 0.2,
  });

  gsap.from('#about h2, #about p', {
    scrollTrigger: { trigger: '#about h2', start: 'top 85%' },
    duration: 0.8, x: 50, opacity: 0, stagger: 0.2,
  });

  gsap.from('#contact h2, #contact p, #contact form', {
    scrollTrigger: { trigger: '#contact h2', start: 'top 85%' },
    duration: 0.8, y: 50, opacity: 0, stagger: 0.2,
  });

  // Project Modal
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');

  const projectData = {
    1: {
      title: 'Project One Detailed View',
      image: 'https://via.placeholder.com/800x400',
      description: 'This is a more detailed description of Project One, explaining the technologies used and the problems it solves. It was built with a focus on user experience and modern design principles.'
    },
    2: {
      title: 'Project Two Detailed View',
      image: 'https://via.placeholder.com/800x400',
      description: 'This is a more detailed description of Project Two. This project involved a complex backend integration and a highly interactive frontend.'
    },
    3: {
      title: 'Project Three Detailed View',
      image: 'https://via.placeholder.com/800x400',
      description: 'This is a more detailed description of Project Three. It showcases a unique approach to data visualization and user engagement.'
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const project = projectData[card.dataset.project];
      modalTitle.textContent = project.title;
      modalImage.src = project.image;
      modalDescription.textContent = project.description;
      modal.classList.remove('hidden');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const emailInput = document.getElementById('email-input');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!emailInput.checkValidity()) {
      // Browser will show default validation error
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate a network request
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.classList.remove('bg-dark-primary');
      submitBtn.classList.add('bg-green-500');
    }, 2000);
  });
});