document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;
  const mainLogo = document.querySelector(".main-logo"); // Selecting "james" in navbar

  // Toggle mobile nav and animate hamburger
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open");
    body.classList.toggle("no-scroll");
  });

  // GSAP ScrollTrigger Plugin for Dynamic Color Changes
  gsap.registerPlugin(ScrollTrigger);

  let sections = document.querySelectorAll("[data-color]");

  sections.forEach((section) => {
    let [bgColor, textColor] = section.getAttribute("data-color").split(" ");

    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) {
          // Apply background and text colors to body and header
          gsap.to(["body", "header"], {
            backgroundColor: bgColor,
            color: textColor,
            duration: 0.5,
            overwrite: "auto",
          });

          // Ensure the "james" logo in navbar changes color
          gsap.to(mainLogo, {
            color: textColor,
            duration: 0.5,
            overwrite: "auto",
          });

          // Change nav link colors
          gsap.to("header nav a:not(.contact-talk)", {
            color: textColor,
            duration: 0.5,
            overwrite: "auto",
          });

          // Reverse colors for the "Contact Me" button
          gsap.to(".contact-talk", {
            backgroundColor: textColor,
            color: bgColor,
            duration: 0.5,
            overwrite: "auto",
          });

          // Update mobile navigation background and link colors
          gsap.to(".mobile-nav", {
            backgroundColor: bgColor,
            duration: 0.5,
          });

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
          gsap.to(".hamburger span", {
            backgroundColor: textColor,
            duration: 0.5,
          });
        }
      },
    });
  });

  // Typing effect
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

  // Shuffle text effect on hover
  const navLinks = document.querySelectorAll("nav a");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const intervalTime = 50,
    shuffleDuration = 400;

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

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
});
