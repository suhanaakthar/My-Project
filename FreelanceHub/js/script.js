/* =========================================================
   FreelanceHub — script.js
   Plain JavaScript only (no frameworks/libraries).
   Each section below only runs if the matching element
   exists on the current page, so this one file can be
   safely linked from every page.
   ========================================================= */

/* ---------- Small helper: toast message ---------- */
// Shows a short confirmation message in the bottom-right corner.
function showToast(message) {
  let toast = document.querySelector(".toast");

  // Create the toast element once, then reuse it.
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  // Hide the toast again after 2.5 seconds.
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* ---------- Mobile navbar toggle ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");

  if (navToggle && navbar) {
    navToggle.addEventListener("click", function () {
      navbar.classList.toggle("open");
    });
  }
});

/* ---------- Home page: category cards & hero search ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // Clicking a category card on the home page jumps to Find Freelancers
  // filtered to that category.
  const categoryCards = document.querySelectorAll(".category-card[data-category]");
  categoryCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const category = card.getAttribute("data-category");
      window.location.href = "freelancers.html?category=" + encodeURIComponent(category);
    });
  });

  // Hero search bar: send the typed keyword to the Find Freelancers page.
  const heroSearchForm = document.querySelector("#heroSearchForm");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const keyword = document.querySelector("#heroSearchInput").value.trim();
      window.location.href = "freelancers.html?search=" + encodeURIComponent(keyword);
    });
  }
});

/* ---------- Find Freelancers page: filtering & search ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const freelancerGrid = document.querySelector("#freelancerGrid");
  if (!freelancerGrid) return; // Not on this page, stop here.

  const searchInput = document.querySelector("#freelancerSearch");
  const categorySelect = document.querySelector("#categoryFilter");
  const skillSelect = document.querySelector("#skillFilter");
  const resultsCount = document.querySelector("#resultsCount");
  const cards = Array.from(freelancerGrid.querySelectorAll(".card"));

  // If the home page linked here with ?category=... or ?search=..., apply it.
  const params = new URLSearchParams(window.location.search);
  if (params.get("category") && categorySelect) {
    categorySelect.value = params.get("category");
  }
  if (params.get("search") && searchInput) {
    searchInput.value = params.get("search");
  }

  function applyFilters() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const category = categorySelect ? categorySelect.value : "all";
    const skill = skillSelect ? skillSelect.value : "all";
    let visibleCount = 0;

    cards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");
      const cardSkills = (card.getAttribute("data-skills") || "").toLowerCase();
      const cardName = (card.getAttribute("data-name") || "").toLowerCase();

      const matchesKeyword = keyword === "" || cardName.includes(keyword) || cardSkills.includes(keyword);
      const matchesCategory = category === "all" || category === cardCategory;
      const matchesSkill = skill === "all" || cardSkills.includes(skill.toLowerCase());

      if (matchesKeyword && matchesCategory && matchesSkill) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (resultsCount) {
      resultsCount.textContent = visibleCount + " freelancer" + (visibleCount === 1 ? "" : "s") + " found";
    }
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  if (skillSelect) skillSelect.addEventListener("change", applyFilters);

  applyFilters(); // Run once on page load.

  // "Hire" buttons show a confirmation toast instead of a real payment flow.
  freelancerGrid.querySelectorAll(".hire-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const name = btn.closest(".card").getAttribute("data-name");
      showToast("Hire request sent to " + name + "!");
    });
  });
});

/* ---------- Find Jobs page: filtering & search ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const jobGrid = document.querySelector("#jobGrid");
  if (!jobGrid) return;

  const searchInput = document.querySelector("#jobSearch");
  const categorySelect = document.querySelector("#jobCategoryFilter");
  const resultsCount = document.querySelector("#jobResultsCount");
  const cards = Array.from(jobGrid.querySelectorAll(".job-card"));

  function applyFilters() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const category = categorySelect ? categorySelect.value : "all";
    let visibleCount = 0;

    cards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");
      const title = (card.getAttribute("data-title") || "").toLowerCase();

      const matchesKeyword = keyword === "" || title.includes(keyword);
      const matchesCategory = category === "all" || category === cardCategory;

      if (matchesKeyword && matchesCategory) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (resultsCount) {
      resultsCount.textContent = visibleCount + " job" + (visibleCount === 1 ? "" : "s") + " found";
    }
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  applyFilters();

  // "Apply Now" buttons show a confirmation toast.
  jobGrid.querySelectorAll(".apply-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const title = btn.closest(".job-card").getAttribute("data-title");
      showToast('Application submitted for "' + title + '"!');
    });
  });
});

/* ---------- Freelancer profile page ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const hireMeBtn = document.querySelector("#hireMeBtn");
  const contactBtn = document.querySelector("#contactBtn");

  if (hireMeBtn) {
    hireMeBtn.addEventListener("click", function () {
      showToast("Hire request sent!");
    });
  }
  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      showToast("Message window would open here.");
    });
  }
});

/* ---------- Reusable form validation helpers ---------- */
// Marks a field as invalid and shows its error message.
function setFieldInvalid(field, isInvalid) {
  if (isInvalid) {
    field.classList.add("invalid");
  } else {
    field.classList.remove("invalid");
  }
}

function isValidEmail(value) {
  // Simple pattern: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* ---------- Login page ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const emailField = document.querySelector("#loginEmailField");
    const emailInput = document.querySelector("#loginEmail");
    const passwordField = document.querySelector("#loginPasswordField");
    const passwordInput = document.querySelector("#loginPassword");

    const emailOk = isValidEmail(emailInput.value.trim());
    setFieldInvalid(emailField, !emailOk);
    if (!emailOk) valid = false;

    const passwordOk = passwordInput.value.length >= 6;
    setFieldInvalid(passwordField, !passwordOk);
    if (!passwordOk) valid = false;

    if (valid) {
      showToast("Login successful! Redirecting to dashboard...");
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 1200);
    }
  });
});

/* ---------- Register page ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector("#registerForm");
  if (!registerForm) return;

  // Highlight whichever "Client / Freelancer" option is selected.
  const userTypeOptions = document.querySelectorAll(".user-type-option");
  userTypeOptions.forEach(function (option) {
    const input = option.querySelector("input");
    option.addEventListener("click", function () {
      userTypeOptions.forEach(function (o) { o.classList.remove("selected"); });
      option.classList.add("selected");
      input.checked = true;
    });
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const nameField = document.querySelector("#nameField");
    const nameInput = document.querySelector("#fullName");
    const emailField = document.querySelector("#registerEmailField");
    const emailInput = document.querySelector("#registerEmail");
    const passwordField = document.querySelector("#registerPasswordField");
    const passwordInput = document.querySelector("#registerPassword");
    const confirmField = document.querySelector("#confirmPasswordField");
    const confirmInput = document.querySelector("#confirmPassword");

    const nameOk = nameInput.value.trim().length >= 2;
    setFieldInvalid(nameField, !nameOk);
    if (!nameOk) valid = false;

    const emailOk = isValidEmail(emailInput.value.trim());
    setFieldInvalid(emailField, !emailOk);
    if (!emailOk) valid = false;

    const passwordOk = passwordInput.value.length >= 6;
    setFieldInvalid(passwordField, !passwordOk);
    if (!passwordOk) valid = false;

    const confirmOk = confirmInput.value === passwordInput.value && confirmInput.value !== "";
    setFieldInvalid(confirmField, !confirmOk);
    if (!confirmOk) valid = false;

    if (valid) {
      showToast("Account created! Redirecting to login...");
      setTimeout(function () {
        window.location.href = "login.html";
      }, 1200);
    }
  });
});

/* ---------- Post a Job page ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const postJobForm = document.querySelector("#postJobForm");
  if (!postJobForm) return;

  postJobForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const requiredFields = [
      { field: "#jobTitleField", input: "#jobTitle", check: (v) => v.trim().length >= 4 },
      { field: "#jobDescriptionField", input: "#jobDescription", check: (v) => v.trim().length >= 20 },
      { field: "#jobCategoryField", input: "#jobCategory", check: (v) => v !== "" },
      { field: "#jobSkillsField", input: "#jobSkills", check: (v) => v.trim().length >= 2 },
      { field: "#jobBudgetField", input: "#jobBudget", check: (v) => Number(v) > 0 },
      { field: "#jobDeadlineField", input: "#jobDeadline", check: (v) => v !== "" },
    ];

    requiredFields.forEach(function (item) {
      const fieldEl = document.querySelector(item.field);
      const inputEl = document.querySelector(item.input);
      const ok = item.check(inputEl.value);
      setFieldInvalid(fieldEl, !ok);
      if (!ok) valid = false;
    });

    if (valid) {
      postJobForm.style.display = "none";
      document.querySelector("#postJobSuccess").style.display = "block";
    }
  });

  const postAnotherBtn = document.querySelector("#postAnotherBtn");
  if (postAnotherBtn) {
    postAnotherBtn.addEventListener("click", function () {
      postJobForm.reset();
      postJobForm.style.display = "block";
      document.querySelector("#postJobSuccess").style.display = "none";
    });
  }
});
