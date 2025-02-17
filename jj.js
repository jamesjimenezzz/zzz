document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // GSAP ScrollTrigger Plugin for Dynamic Color Changes
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ trialWarn: false });

  let sections = document.querySelectorAll("[data-color]");

  sections.forEach((section) => {
    let [bgColor, textColor] = section.getAttribute("data-color").split(" ");

    ScrollTrigger.create({
      trigger: section,
      start: "top 50%", // Delay activation for smoother transitions
      end: "bottom 50%", // Prevent frequent triggers
      onEnter: () => changeColors(bgColor, textColor),
      onEnterBack: () => changeColors(bgColor, textColor),
    });
  });

  function changeColors(bgColor, textColor) {
    gsap.to(["body", "header"], {
      backgroundColor: bgColor,
      color: textColor,
      duration: 0.3, // Reduce duration for faster switching
      immediateRender: true, // Ensure it applies immediately
    });

    gsap.to(".main-logo", {
      color: textColor,
      duration: 0.3,
      immediateRender: true,
    });
    gsap.to("header nav a:not(.contact-talk)", {
      color: textColor,
      duration: 0.3,
      immediateRender: true,
    });

    // ✅ Reverse colors for the "Contact Me" button
    gsap.to(".contact-talk", {
      backgroundColor: textColor,
      color: bgColor,
      duration: 0.3,
      immediateRender: true,
    });

    // ✅ Ensure mobile navigation updates correctly
    gsap.to(".mobile-nav", {
      backgroundColor: bgColor,
      duration: 0.3,
      immediateRender: true,
    });
    gsap.to(".mobile-nav a:not(.contact-talk)", {
      color: textColor,
      duration: 0.3,
      immediateRender: true,
    });
    gsap.to(".mobile-nav .contact-talk", {
      backgroundColor: textColor,
      color: bgColor,
      duration: 0.3,
      immediateRender: true,
    });

    // ✅ Change hamburger color only between 768px and 1062px
    if (window.innerWidth >= 768 && window.innerWidth <= 1062) {
      let hamburgerColor = bgColor === "#e8e8e3" ? "#161614" : "#ffffff";
      gsap.to(".hamburger span", {
        backgroundColor: hamburgerColor,
        duration: 0.3,
        immediateRender: true,
      });
    }
  }

  // ✅ Ensure the hamburger is only visible between 768px and 1062px
  function checkScreenSize() {
    if (window.innerWidth > 1062) {
      gsap.set(".hamburger", { display: "none" }); // Hide hamburger
    } else if (window.innerWidth >= 768) {
      gsap.set(".hamburger", { display: "flex" }); // Show hamburger
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  enableGSAP(); // ✅ Run GSAP animations only for screens 768px and above

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
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;
  const jamesText = document.querySelectorAll(".text-effect p");
  const navLinks = document.querySelectorAll("nav a");
  const roadmapSection = document.querySelector("#roadmap");
  const roadmapText = document.querySelectorAll(
    "#roadmap h1, #roadmap p, #roadmap h3"
  );

  // ✅ Fix Hamburger Menu Click and Show Mobile Navigation
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open");

    // ✅ Show/hide mobile nav properly
    if (mobileNav.classList.contains("active")) {
      mobileNav.style.display = "none";
      mobileNav.style.visibility = "hidden";
    } else {
      mobileNav.style.display = "block";
      mobileNav.style.visibility = "visible";
    }

    document.documentElement.classList.toggle("no-scroll");
  });

  // ✅ Detect Mobile and Apply Dark Mode (Only for Mobile View)
  function applyMobileMode() {
    if (window.innerWidth <= 768) {
      document.body.classList.add("dark-mode");
      document.body.style.backgroundColor = "#0b0b0a"; // Dark Background
      document.body.style.color = "#FFFFFF"; // Light Text
      document.querySelector("header").style.backgroundColor = "#0b0b0a";

      // ✅ Ensure Roadmap Section **Does NOT Have a Background**
      roadmapSection.style.backgroundColor = "transparent"; // Removes background

      // ✅ Make Roadmap Text White
      roadmapText.forEach((text) => {
        text.style.color = "#e8e8e3";
      });

      // ✅ Make "HEY, I'M JAMES JIMENEZ" Text White

      // ✅ Ensure Navigation Links are Light
      navLinks.forEach((link) => {
        link.style.color = "#FFFFFF";
      });

      // ✅ Fix Mobile Navigation Pop-Up (If Open, Ensure It's Visible)
      if (mobileNav.classList.contains("active")) {
        mobileNav.style.display = "flex";
        mobileNav.style.backgroundColor = "#0b0b0a";
        mobileNav.style.visibility = "visible";
      }
    }
  }

  applyMobileMode(); // Run on Load
  window.addEventListener("resize", applyMobileMode); // Run on Resize

  // ✅ ScrollTrigger for Color Changes on Desktop (Only)
  if (window.innerWidth > 768) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ trialWarn: false });

    let sections = document.querySelectorAll("[data-color]");

    sections.forEach((section) => {
      let [bgColor, textColor] = section.getAttribute("data-color").split(" ");

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
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

      gsap.to(".contact-talk", {
        backgroundColor: textColor,
        color: bgColor,
        duration: 0.5,
      });

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

      gsap.to(".hamburger span", { backgroundColor: textColor, duration: 0.5 });
    }
  }

  // ✅ Prevent Scroll Restoration
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open");

    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when closed
    }
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll(".mobile-nav a");
  const contactLink = document.querySelector(".mobile-nav a.contact-talk");

  function checkScreenSize() {
    if (window.innerWidth > 1062) {
      hamburger.style.display = "none"; // Hide hamburger on desktop
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open"); // Reset hamburger animation
    } else {
      hamburger.style.display = "flex"; // Show on mobile
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // ✅ Toggle menu and animate hamburger to "X"
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open"); // Toggle "X" animation
    document.body.style.overflow = mobileNav.classList.contains("active")
      ? "hidden"
      : "";
  });

  // ✅ Close menu when clicking any nav link (except keep background for "Contact")
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open"); // Reset hamburger back
      document.body.style.overflow = "";

      // Keep "Contact" button background color
      if (link === contactLink) {
        setTimeout(() => {
          contactLink.style.backgroundColor = "#f39c12";
        }, 10);
      }
    });
  });

  // ✅ Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open"); // Reset hamburger back
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  function toggleMenu() {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("open");

    // Disable scrolling when the menu is open
    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Show/hide menu on hamburger click
  hamburger.addEventListener("click", toggleMenu);

  // Close menu when clicking a navigation link
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Show hamburger menu only on mobile
  function checkScreenSize() {
    if (window.innerWidth > 1062) {
      hamburger.style.display = "none"; // Hide on larger screens
      mobileNav.classList.remove("active"); // Ensure nav is closed
      hamburger.classList.remove("open");
      document.body.style.overflow = ""; // Reset scrolling
    } else {
      hamburger.style.display = "flex"; // Show on mobile
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Optimized Fade-in Animation for Sections (No Upward Motion for Mobile)
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      duration: window.innerWidth <= 768 ? 0.5 : 1, // Reduce duration for mobile
      ease: "power2.out",
      ...(window.innerWidth > 768 && { y: 30 }), // Apply upward motion only for larger screens
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ✅ Optimized Image Fade-in Animation (No Upward Motion for Mobile)
  gsap.utils.toArray("img").forEach((image) => {
    gsap.from(image, {
      opacity: 0,
      duration: window.innerWidth <= 768 ? 0.5 : 1,
      ease: "power2.out",
      ...(window.innerWidth > 768 && { scale: 0.95 }), // Slight zoom-in only for larger screens
      scrollTrigger: {
        trigger: image,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ✅ Refresh GSAP Animations on Resize
  function updateAnimations() {
    ScrollTrigger.refresh();
  }
  window.addEventListener("resize", updateAnimations);
});

// ✅ Typing effect remains as is
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const words = [
    "software development",
    "web development",
    "graphic designing",
    "web designing",
    "cybersecurity",
  ];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false,
    typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex--);
      typingSpeed = 50;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex++);
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const intervalTime = 50;
  const shuffleDuration = 400;

  function applyShuffleEffect() {
    if (window.innerWidth >= 768) {
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
    } else {
      // ✅ Disable shuffle effect on smaller screens
      navLinks.forEach((link) => {
        link.onmouseenter = null;
        link.onmouseleave = null;
      });
    }
  }

  // ✅ Apply shuffle effect initially if screen width is 768px+
  applyShuffleEffect();

  // ✅ Re-check on window resize
  window.addEventListener("resize", applyShuffleEffect);
});
