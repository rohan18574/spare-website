(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const menuLinks = menu ? menu.querySelectorAll("a") : [];
  const form = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  const setHeaderState = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    if (!menuToggle || !menu) return;
    menuToggle.classList.remove("is-active");
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const opening = !menu.classList.contains("is-open");
    menuToggle.classList.toggle("is-active", opening);
    menu.classList.toggle("is-open", opening);
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", opening);
  });
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animated = document.querySelectorAll(".reveal, .reveal-art");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    animated.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll(":scope > .reveal")];
        const index = siblings.indexOf(entry.target);
        if (index > -1) entry.target.style.transitionDelay = `${Math.min(index * 65, 250)}ms`;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    animated.forEach((element) => observer.observe(element));
  }

  const invalidMessage = (field) => {
    if (field.validity.valueMissing) return "Please complete the required fields before continuing.";
    if (field.validity.typeMismatch) return "Please enter a valid email address.";
    return "Please check the highlighted fields.";
  };

  const validateForm = () => {
    const fields = [...form.querySelectorAll("[required]")];
    let firstInvalid = null;
    fields.forEach((field) => {
      const isInvalid = !field.checkValidity();
      field.setAttribute("aria-invalid", String(isInvalid));
      if (isInvalid && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  };

  form?.addEventListener("input", (event) => {
    if (event.target.matches("[required]")) event.target.setAttribute("aria-invalid", "false");
    if (formStatus) { formStatus.textContent = ""; formStatus.classList.remove("is-success"); }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstInvalid = validateForm();
    if (firstInvalid) {
      formStatus.textContent = invalidMessage(firstInvalid);
      formStatus.classList.remove("is-success");
      firstInvalid.focus();
      return;
    }

    const values = new FormData(form);
    const subject = `Website project enquiry — ${values.get("business") || values.get("name")}`;
    const body = [
      `Name: ${values.get("name")}`,
      `Business / Brand: ${values.get("business") || "Not provided"}`,
      `Email: ${values.get("email")}`,
      `Project type: ${values.get("projectType")}`,
      `Budget: ${values.get("budget") || "Not provided"}`,
      "",
      "Project details:",
      values.get("details")
    ].join("\n");
    formStatus.textContent = "Opening your email app with the project details…";
    formStatus.classList.add("is-success");
    window.location.href = `mailto:morerohan9850@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
