/* global gsap, ScrollTrigger */

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initHeaderScroll() {
  const header = document.querySelector("#siteHeader");
  if (!header) return;

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-scrolled", y > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMagneticButtons() {
  if (typeof gsap === "undefined") return;
  if (prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;

  const strength = 0.14;

  document.querySelectorAll(".magnetic").forEach((el) => {
    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const reset = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    el.addEventListener("blur", reset);
  });
}

function initStickyCta() {
  const stickyButton = document.querySelector(".mobile-sticky");
  const requestSection = document.querySelector("#request");

  if (!stickyButton || !requestSection || !("IntersectionObserver" in window)) return;

  const ctaObserver = new IntersectionObserver(
    ([entry]) => {
      stickyButton.style.opacity = entry.isIntersecting ? "0" : "1";
      stickyButton.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
    },
    { threshold: 0.16 },
  );

  ctaObserver.observe(requestSection);
}

function initGsap() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion()) {
    gsap.set(".reveal", { autoAlpha: 1, y: 0 });
    gsap.from([".site-header .brand", ".site-header .header-action"], {
      autoAlpha: 0,
      y: -12,
      duration: 0.45,
      stagger: 0.06,
      ease: "power2.out",
    });
    gsap.from([".hero__content > *", ".hero-card"], {
      autoAlpha: 0,
      y: 16,
      duration: 0.45,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.05,
    });
    return;
  }

  const heroEase = "power3.out";

  gsap.timeline({ defaults: { ease: heroEase } }).from(
    [".site-header .brand", ".site-header .header-action"],
    {
      y: 0,
      autoAlpha: 0,
      duration: 0.65,
      stagger: 0.1,
    },
    0,
  )
    .from(
      ".hero__content > *",
      {
        y: 34,
        autoAlpha: 0,
        duration: 0.78,
        stagger: 0.11,
      },
      0.12,
    )
    .from(
      ".hero-card",
      {
        x: 42,
        autoAlpha: 0,
        duration: 0.95,
        ease: "power3.out",
      },
      0.22,
    );

  gsap.to(".hero__backdrop", {
    yPercent: 14,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.15,
    },
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.88,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      },
    );
  });
}

initHeaderScroll();
initStickyCta();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initGsap();
    initMagneticButtons();
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
} else {
  initGsap();
  initMagneticButtons();
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}
