const themeSwitch = document.getElementById('themeSwitch');

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('light-mode'); // default
});

const countElement = document.getElementById("countNumber");
const loaderBar = document.querySelector(".loader-bar::before");
const bar = document.querySelector(".loader-bar");
const barBefore = bar.querySelector("::before");

let count = 0;
let maxCount = 100;

// Animate bar width and counter together
function animateLoader() {
  const barFill = bar.querySelector("::before"); // pseudo-elements aren't accessible like this, so we'll animate width manually
  const barFillEl = document.createElement("div");
  barFillEl.style.position = "absolute";
  barFillEl.style.top = "0";
  barFillEl.style.left = "0";
  barFillEl.style.height = "100%";
  barFillEl.style.backgroundColor = "white";
  barFillEl.style.width = "0%";
  bar.appendChild(barFillEl);

  const verticalLeg = bar.querySelector("::after"); // same, animate separately
  const leg = document.createElement("div");
  leg.style.position = "absolute";
  leg.style.top = "10px";
  leg.style.left = "0";
  leg.style.width = "20px";
  leg.style.height = "0%";
  leg.style.backgroundColor = "white";
  bar.appendChild(leg);

  const duration = 2500; // 2.5 seconds for horizontal fill
  const startTime = performance.now();

  function update(now) {
    let elapsed = now - startTime;
    let progress = Math.min(elapsed / duration, 1);

    // update bar fill
    barFillEl.style.width = `${progress * 100}%`;

    // update counter
    let displayCount = Math.floor(progress * maxCount);
    if (displayCount !== count) {
      count = displayCount;
      countElement.textContent = count;
      countElement.style.opacity = 0;
      countElement.style.transform = "translateY(10px)";
      setTimeout(() => {
        countElement.style.opacity = 1;
        countElement.style.transform = "translateY(0)";
      }, 10);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // After fill completes, grow vertical leg (L shape)
      animateLeg(leg);
    }
  }

  requestAnimationFrame(update);
}

function animateLeg(leg) {
  const legDuration = 800;
  const startTime = performance.now();

  function grow(now) {
    let elapsed = now - startTime;
    let progress = Math.min(elapsed / legDuration, 1);
    leg.style.height = `${progress * 100}px`;

    if (progress < 1) {
      requestAnimationFrame(grow);
    } else {
      // Hide preloader
      setTimeout(() => {
        document.getElementById("preloader").style.opacity = "0";
        setTimeout(() => {
          document.getElementById("preloader").style.display = "none";
        }, 400);
      }, 500);
    }
  }

  requestAnimationFrame(grow);
}

window.addEventListener("load", () => {
  animateLoader();
});


document.addEventListener("mousemove", function(e) {
  const ripple = document.createElement("div");
  ripple.className = "cursor-ripple-clone";
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);

  // Remove the ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 400);
});







// Smooth scroll
document.querySelector('.hero-button')?.addEventListener('click', () => {
  document.querySelector('.features')?.scrollIntoView({ behavior: 'smooth' });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
  const trigger = window.innerHeight * 0.9;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// Floating visuals activation
const triggers = document.querySelectorAll('.hover-trigger');
const visuals = document.querySelectorAll('.floating-visual');
triggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', () => {
    const target = trigger.getAttribute('data-target');
    visuals.forEach(v => v.classList.remove('active-visual'));
    document.querySelector(`.floating-visual[data-id="${target}"]`)?.classList.add('active-visual');
  });
});

