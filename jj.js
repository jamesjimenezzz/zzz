document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;
  const mainLogo = document.querySelector(".main-logo"); // Selecting "james" in navbar

  // Toggle mobile nav and animate hamburger
  hamburger.addEventListener("click", () => {
    requestAnimationFrame(() => {
      mobileNav.classList.toggle("active");
      hamburger.classList.toggle("open");
      document.documentElement.classList.toggle("no-scroll");
    });
  });

  // GSAP ScrollTrigger Plugin for Dynamic Color Changes
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ trialWarn: false });

  let sections = document.querySelectorAll("[data-color]");

  sections.forEach((section) => {
    let [bgColor, textColor] = section.getAttribute("data-color").split(" ");

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%", // Delay activation for smoother transitions
      end: "bottom 20%", // Prevent frequent triggers
      onEnter: () => changeColors(bgColor, textColor),
      onEnterBack: () => changeColors(bgColor, textColor),
    });
  });

  function changeColors(bgColor, textColor) {
    gsap.to(["body", "header"], {
      backgroundColor: bgColor,
      color: textColor,
      duration: 0.5,
    });

    gsap.to(".main-logo", { color: textColor, duration: 0.5 });
    gsap.to("header nav a:not(.contact-talk)", {
      color: textColor,
      duration: 0.5,
    });

    // Reverse colors for the "Contact Me" button
    gsap.to(".contact-talk", {
      backgroundColor: textColor,
      color: bgColor,
      duration: 0.5,
    });

    // Update mobile navigation background and link colors
    gsap.to(".mobile-nav", { backgroundColor: bgColor, duration: 0.5 });
    gsap.to(".mobile-nav a:not(.contact-talk)", {
      color: textColor,
      duration: 0.5,
    });
    gsap.to(".mobile-nav .contact-talk", {
      backgroundColor: textColor,
      color: bgColor,
      duration: 0.5,
    });

    // Update hamburger menu line color
    gsap.to(".hamburger span", { backgroundColor: textColor, duration: 0.5 });
  }

  // Typing effect for "I have profound interest in ..."
  const typingText = document.querySelector(".typing-text");
  const words = [
    "software development",
    "web development",
    "graphic designing",
    "web designing",
    "cybersecurity",
  ];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    typingText.textContent = isDeleting
      ? currentWord.substring(0, charIndex--)
      : currentWord.substring(0, charIndex++);

    if (!isDeleting && charIndex === currentWord.length)
      setTimeout(() => (isDeleting = true), 1500);
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
  typeEffect();

  // Shuffle text effect on hover (Disabled on Mobile)
  const navLinks = document.querySelectorAll("nav a");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const intervalTime = 50,
    shuffleDuration = 400;
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    navLinks.forEach((link) => {
      let originalText = link.innerText.trim();
      let textNode = Array.from(link.childNodes).find(
        (node) => node.nodeType === 3
      );
      if (!textNode) return;

      link.addEventListener("mouseenter", function () {
        let elapsedTime = 0;
        let shuffleInterval = setInterval(() => {
          textNode.nodeValue = originalText
            .split("")
            .map((char) =>
              char === " "
                ? " "
                : characters[Math.floor(Math.random() * characters.length)]
            )
            .join("");

          elapsedTime += intervalTime;
          if (elapsedTime >= shuffleDuration) {
            clearInterval(shuffleInterval);
            textNode.nodeValue = originalText;
          }
        }, intervalTime);
        link.dataset.shuffleId = shuffleInterval;
      });

      link.addEventListener("mouseleave", function () {
        clearInterval(link.dataset.shuffleId);
        textNode.nodeValue = originalText;
      });
    });
  }

  // Image lazy loading
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // Optimize Resize Events (Prevent Frequent Layout Shifts)
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log("Resize event optimized! Adjusting layout...");
    }, 250);
  });

  // Prevent Scroll Restoration
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
});
