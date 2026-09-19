// =========================================
// 1. GET ELEMENTS
// =========================================

const form = document.getElementById("registrationForm");

const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const progressLines = document.querySelectorAll(".progress-line");

const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

const loadingScreen = document.getElementById("loadingScreen");
const successScreen = document.getElementById("successScreen");
const continueButton = document.getElementById("continueButton");

// =========================================
// 2. INPUTS
// =========================================

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const dateOfBirth = document.getElementById("dateOfBirth");
const country = document.getElementById("country");
const countrySelect = document.getElementById("countrySelect");
const countryTrigger = document.getElementById("countryTrigger");
const countrySelectedText = document.getElementById("countrySelectedText");
const countryOptions = document.querySelectorAll(".country-option");

const email = document.getElementById("email");
const username = document.getElementById("username");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// =========================================
// 3. CURRENT STEP
// =========================================

let currentStep = 1;

// =========================================
// 4. SHOW STEP
// =========================================

function showStep(step) {
  formSteps.forEach((formStep) => {
    const stepNumber = Number(formStep.dataset.step);

    formStep.classList.remove("active");

    if (stepNumber === step) {
      formStep.classList.add("active");
    }
  });

  updateProgress(step);
  updateButtons(step);
}

// =========================================
// 5. UPDATE PROGRESS
// =========================================

function updateProgress(step) {
  progressSteps.forEach((progressStep) => {
    const stepNumber = Number(progressStep.dataset.step);

    progressStep.classList.remove("active");
    progressStep.classList.remove("completed");

    // Completed steps

    if (stepNumber < step) {
      progressStep.classList.add("completed");
    }

    // Current step
    else if (stepNumber === step) {
      progressStep.classList.add("active");
    }
  });

  // Progress lines

  progressLines.forEach((line, index) => {
    if (index < step - 1) {
      line.classList.add("completed");
    } else {
      line.classList.remove("completed");
    }
  });
}

// =========================================
// 6. UPDATE BUTTONS
// =========================================

function updateButtons(step) {
  // Step 1

  if (step === 1) {
    backButton.style.visibility = "hidden";
  } else {
    backButton.style.visibility = "visible";
  }

  // Step 4

  if (step === 4) {
    nextButton.innerHTML = `
            <span>Create Account</span>
            <i class="fa-solid fa-check"></i>
        `;
  } else {
    nextButton.innerHTML = `
            <span>Next</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;
  }
}

// =========================================
// 7. ERROR FUNCTIONS
// =========================================

function showError(input) {
  const inputGroup = input.closest(".input-group");

  if (inputGroup) {
    inputGroup.classList.add("error");
  }
}

function removeError(input) {
  const inputGroup = input.closest(".input-group");

  if (inputGroup) {
    inputGroup.classList.remove("error");
  }
}

// =========================================
// 8. REQUIRED FIELD VALIDATION
// =========================================

function validateRequired(input) {
  if (input.value.trim() === "") {
    showError(input);

    return false;
  }

  removeError(input);

  return true;
}

// =========================================
// 9. EMAIL VALIDATION
// =========================================

function validateEmail() {
  const emailValue = email.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    showError(email);

    return false;
  }

  if (!emailPattern.test(emailValue)) {
    showError(email);

    return false;
  }

  removeError(email);

  return true;
}

// =========================================
// 10. STEP 1 VALIDATION
// =========================================

function validateStep1() {
  let isValid = true;

  if (!validateRequired(firstName)) {
    isValid = false;
  }

  if (!validateRequired(lastName)) {
    isValid = false;
  }

  if (!validateRequired(phone)) {
    isValid = false;
  }

  if (!validateRequired(dateOfBirth)) {
    isValid = false;
  }

  if (!validateRequired(country)) {
    isValid = false;
  }

  return isValid;
}

// =========================================
// 11. STEP 2 VALIDATION
// =========================================

function validateStep2() {
  let isValid = true;

  if (!validateEmail()) {
    isValid = false;
  }

  if (!validateRequired(username)) {
    isValid = false;
  }

  return isValid;
}

// =========================================
// 12. PASSWORD RULES
// =========================================

function getPasswordRules(value) {
  return {
    length: value.length >= 8,

    uppercase: /[A-Z]/.test(value),

    lowercase: /[a-z]/.test(value),

    number: /[0-9]/.test(value),

    special: /[^A-Za-z0-9]/.test(value),
  };
}

// =========================================
// 13. UPDATE PASSWORD RULES UI
// =========================================

function updatePasswordRules() {
  const value = password.value;

  const rules = getPasswordRules(value);

  updateRule("rule-length", rules.length);

  updateRule("rule-uppercase", rules.uppercase);

  updateRule("rule-lowercase", rules.lowercase);

  updateRule("rule-number", rules.number);

  updateRule("rule-special", rules.special);

  updatePasswordStrength(rules);
}

// =========================================
// 14. UPDATE SINGLE RULE
// =========================================

function updateRule(id, isValid) {
  const rule = document.getElementById(id);

  if (!rule) {
    return;
  }

  if (isValid) {
    rule.classList.add("valid");

    const icon = rule.querySelector("i");

    icon.className = "fa-solid fa-circle-check";
  } else {
    rule.classList.remove("valid");

    const icon = rule.querySelector("i");

    icon.className = "fa-solid fa-circle-xmark";
  }
}

// =========================================
// 15. PASSWORD STRENGTH
// =========================================

function updatePasswordStrength(rules) {
  const strengthText = document.getElementById("strengthText");

  const strengthProgress = document.getElementById("strengthProgress");

  let score = 0;

  if (rules.length) {
    score++;
  }

  if (rules.uppercase) {
    score++;
  }

  if (rules.lowercase) {
    score++;
  }

  if (rules.number) {
    score++;
  }

  if (rules.special) {
    score++;
  }

  // Empty password

  if (password.value.length === 0) {
    strengthText.textContent = "Weak";

    strengthProgress.style.width = "0%";

    strengthProgress.style.backgroundColor = "#ef4444";

    return;
  }

  // Weak

  if (score <= 2) {
    strengthText.textContent = "Weak";

    strengthProgress.style.width = "33%";

    strengthProgress.style.backgroundColor = "#ef4444";
  }

  // Medium
  else if (score <= 4) {
    strengthText.textContent = "Medium";

    strengthProgress.style.width = "66%";

    strengthProgress.style.backgroundColor = "#f59e0b";
  }

  // Strong
  else {
    strengthText.textContent = "Strong";

    strengthProgress.style.width = "100%";

    strengthProgress.style.backgroundColor = "#22c55e";
  }
}

// =========================================
// 16. PASSWORD VALIDATION
// =========================================

function validatePassword() {
  const rules = getPasswordRules(password.value);

  const allRulesValid =
    rules.length &&
    rules.uppercase &&
    rules.lowercase &&
    rules.number &&
    rules.special;

  if (!allRulesValid) {
    showError(password);

    return false;
  }

  removeError(password);

  return true;
}

// =========================================
// 17. CONFIRM PASSWORD VALIDATION
// =========================================

function validateConfirmPassword() {
  if (
    confirmPassword.value === "" ||
    confirmPassword.value !== password.value
  ) {
    showError(confirmPassword);

    return false;
  }

  removeError(confirmPassword);

  return true;
}

// =========================================
// 18. STEP 3 VALIDATION
// =========================================

function validateStep3() {
  let isValid = true;

  if (!validatePassword()) {
    isValid = false;
  }

  if (!validateConfirmPassword()) {
    isValid = false;
  }

  return isValid;
}

// =========================================
// 19. VALIDATE CURRENT STEP
// =========================================

function validateCurrentStep() {
  if (currentStep === 1) {
    return validateStep1();
  }

  if (currentStep === 2) {
    return validateStep2();
  }

  if (currentStep === 3) {
    return validateStep3();
  }

  return true;
}

// =========================================
// 20. NEXT BUTTON
// =========================================

nextButton.addEventListener("click", () => {
  // STEP 1 → STEP 2

  if (currentStep === 1) {
    if (!validateStep1()) {
      return;
    }
  }

  // STEP 2 → STEP 3

  if (currentStep === 2) {
    if (!validateStep2()) {
      return;
    }
  }

  // STEP 3 → STEP 4

  if (currentStep === 3) {
    if (!validateStep3()) {
      return;
    }

    updateConfirmation();
  }

  // STEP 4 → CREATE ACCOUNT

  if (currentStep === 4) {
    createAccount();

    return;
  }

  currentStep++;

  showStep(currentStep);
});

// =========================================
// 21. BACK BUTTON
// =========================================

backButton.addEventListener("click", () => {
  if (currentStep <= 1) {
    return;
  }

  currentStep--;

  showStep(currentStep);
});

// =========================================
// 22. PASSWORD SHOW / HIDE
// =========================================

const togglePassword = document.getElementById("togglePassword");

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

function togglePasswordVisibility(input, button) {
  const icon = button.querySelector("i");

  if (input.type === "password") {
    input.type = "text";

    icon.classList.remove("fa-eye");

    icon.classList.add("fa-eye-slash");

    button.setAttribute("aria-label", "Hide password");
  } else {
    input.type = "password";

    icon.classList.remove("fa-eye-slash");

    icon.classList.add("fa-eye");

    button.setAttribute("aria-label", "Show password");
  }
}

togglePassword.addEventListener("click", () => {
  togglePasswordVisibility(password, togglePassword);
});

toggleConfirmPassword.addEventListener("click", () => {
  togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
});

// =========================================
// 23. PASSWORD INPUT EVENT
// =========================================

password.addEventListener("input", () => {
  updatePasswordRules();

  // Remove error when password becomes valid

  const rules = getPasswordRules(password.value);

  const allValid =
    rules.length &&
    rules.uppercase &&
    rules.lowercase &&
    rules.number &&
    rules.special;

  if (allValid) {
    removeError(password);
  }
});

// =========================================
// 24. CONFIRM PASSWORD INPUT EVENT
// =========================================

confirmPassword.addEventListener("input", () => {
  if (
    confirmPassword.value !== "" &&
    confirmPassword.value === password.value
  ) {
    removeError(confirmPassword);
  }
});

// =========================================
// 25. COUNTRY DROPDOWN
// =========================================

function syncCountrySelection() {
  const selectedOption = country.options[country.selectedIndex];

  const selectedText = selectedOption
    ? selectedOption.textContent
    : "Select your country";

  countrySelectedText.textContent = selectedText;

  countryOptions.forEach((option) => {
    const isSelected = option.dataset.value === country.value;

    option.classList.toggle("is-selected", isSelected);
  });

  countryTrigger.setAttribute(
    "aria-label",
    selectedText === "Select your country"
      ? "Select your country"
      : `Selected country: ${selectedText}`,
  );
}

countryTrigger.addEventListener("click", () => {
  const isOpen = countrySelect.classList.contains("active");

  countrySelect.classList.toggle("active", !isOpen);

  countryTrigger.setAttribute("aria-expanded", String(!isOpen));
});

countryOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const value = option.dataset.value;

    country.value = value;

    country.dispatchEvent(new Event("change"));

    syncCountrySelection();

    countrySelect.classList.remove("active");

    countryTrigger.setAttribute("aria-expanded", "false");
  });
});

country.addEventListener("change", () => {
  syncCountrySelection();

  removeError(country);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".country-select")) {
    countrySelect.classList.remove("active");

    countryTrigger.setAttribute("aria-expanded", "false");
  }
});

syncCountrySelection();

// =========================================
// 26. REMOVE ERROR WHILE TYPING
// =========================================

const requiredInputs = [
  firstName,
  lastName,
  phone,
  dateOfBirth,
  country,
  username,
];

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      removeError(input);
    }
  });
});

// =========================================
// 26. EMAIL INPUT EVENT
// =========================================

email.addEventListener("input", () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email.value.trim())) {
    removeError(email);
  }
});

// =========================================
// 27. CONFIRMATION PAGE
// =========================================

function updateConfirmation() {
  document.getElementById("confirmFirstName").textContent =
    firstName.value.trim() || "—";

  document.getElementById("confirmLastName").textContent =
    lastName.value.trim() || "—";

  document.getElementById("confirmPhone").textContent =
    phone.value.trim() || "—";

  document.getElementById("confirmDateOfBirth").textContent =
    dateOfBirth.value || "—";

  document.getElementById("confirmCountry").textContent =
    country.options[country.selectedIndex].textContent || "—";

  document.getElementById("confirmEmail").textContent =
    email.value.trim() || "—";

  document.getElementById("confirmUsername").textContent =
    username.value.trim() || "—";

  document.getElementById("confirmPasswordText").textContent = "••••••••";
}

// =========================================
// 28. EDIT BUTTONS
// =========================================

const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const editStep = Number(button.dataset.edit);

    currentStep = editStep;

    showStep(currentStep);
  });
});

// =========================================
// 29. CREATE ACCOUNT
// =========================================

function createAccount() {
  loadingScreen.classList.add("active");

  setTimeout(() => {
    loadingScreen.classList.remove("active");

    form.style.display = "none";

    document.querySelector(".progress-container").style.display = "none";

    document.querySelector(".form-header").style.display = "none";

    successScreen.classList.add("active");
  }, 1000);
}

// =========================================
// 30. CONTINUE / RESET
// =========================================

continueButton.addEventListener("click", () => {
  // Reset form

  form.reset();

  // Reset password fields

  password.type = "password";

  confirmPassword.type = "password";

  // Reset password icons

  const passwordIcon = togglePassword.querySelector("i");

  passwordIcon.className = "fa-solid fa-eye";

  const confirmPasswordIcon = toggleConfirmPassword.querySelector("i");

  confirmPasswordIcon.className = "fa-solid fa-eye";

  // Remove all errors

  document.querySelectorAll(".input-group.error").forEach((group) => {
    group.classList.remove("error");
  });

  // Reset password rules

  document.querySelectorAll(".password-rules li").forEach((rule) => {
    rule.classList.remove("valid");

    const icon = rule.querySelector("i");

    icon.className = "fa-solid fa-circle-xmark";
  });

  // Reset password strength

  document.getElementById("strengthText").textContent = "Weak";

  document.getElementById("strengthProgress").style.width = "0%";

  // Show form again

  form.style.display = "block";

  document.querySelector(".progress-container").style.display = "flex";

  document.querySelector(".form-header").style.display = "block";

  successScreen.classList.remove("active");

  // Go back to Step 1

  currentStep = 1;

  showStep(currentStep);
});

// =========================================
// 31. INITIALIZE
// =========================================

showStep(currentStep);

updatePasswordRules();
// =========================================
// PERSIAN CALENDAR
// =========================================

const calendarToggle = document.getElementById("calendarToggle");

const jalaliDateGroup = document.querySelector(".jalali-date-group");

const persianCalendar = document.getElementById("persianCalendar");

const previousMonth = document.getElementById("previousMonth");

const nextMonth = document.getElementById("nextMonth");

const calendarMonthTitle = document.getElementById("calendarMonthTitle");

const calendarYearTitle = document.getElementById("calendarYearTitle");

const calendarDays = document.getElementById("calendarDays");

const calendarWeekdays = document.querySelector(".calendar-weekdays");

// Current Jalali date

const currentGregorianDate = new Date();

const currentJalali = jalaali.toJalaali(
  currentGregorianDate.getFullYear(),
  currentGregorianDate.getMonth() + 1,
  currentGregorianDate.getDate(),
);

let calendarYear = currentJalali.jy;

let calendarMonth = currentJalali.jm;

let selectedDate = null;

let isYearPickerOpen = false;

let isMonthPickerOpen = false;

// =========================================
// MONTH NAMES
// =========================================

const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// =========================================
// PERSIAN NUMBERS
// =========================================

function toPersianNumber(number) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return String(number).replace(/\d/g, (digit) => persianNumbers[digit]);
}

// =========================================
// RENDER CALENDAR
// =========================================

function renderMonthPicker() {
  isMonthPickerOpen = true;
  isYearPickerOpen = false;

  calendarWeekdays.style.display = "none";
  calendarDays.classList.remove("year-picker-mode");
  calendarDays.classList.add("month-picker-mode");

  calendarMonthTitle.style.display = "inline-flex";
  calendarMonthTitle.textContent = "ماه";
  calendarYearTitle.disabled = false;
  calendarYearTitle.style.pointerEvents = "auto";
  calendarYearTitle.style.cursor = "pointer";
  calendarYearTitle.textContent = toPersianNumber(calendarYear);

  calendarDays.innerHTML = "";

  jalaliMonths.forEach((monthName, index) => {
    const monthButton = document.createElement("button");

    monthButton.type = "button";

    monthButton.classList.add("calendar-day", "month-option");

    monthButton.textContent = monthName;

    if (index + 1 === calendarMonth) {
      monthButton.classList.add("selected");
    }

    monthButton.addEventListener("click", (event) => {
      event.stopPropagation();

      calendarMonth = index + 1;
      isMonthPickerOpen = false;
      persianCalendar.classList.add("active");
      renderCalendar();
    });

    calendarDays.appendChild(monthButton);
  });
}

function renderYearPicker() {
  isYearPickerOpen = true;
  isMonthPickerOpen = false;

  calendarWeekdays.style.display = "none";
  calendarDays.classList.remove("month-picker-mode");
  calendarDays.classList.add("year-picker-mode");

  const decadeStart = Math.floor(calendarYear / 10) * 10;
  const decadeEnd = decadeStart + 9;

  calendarMonthTitle.style.display = "none";
  calendarYearTitle.disabled = true;
  calendarYearTitle.style.pointerEvents = "none";
  calendarYearTitle.style.cursor = "default";
  calendarYearTitle.textContent = `${toPersianNumber(decadeStart)} - ${toPersianNumber(decadeEnd)}`;

  calendarDays.innerHTML = "";

  for (let year = decadeStart; year <= decadeEnd; year++) {
    const yearButton = document.createElement("button");

    yearButton.type = "button";

    yearButton.classList.add("calendar-day", "year-option");

    yearButton.textContent = toPersianNumber(year);

    if (year === calendarYear) {
      yearButton.classList.add("selected");
    }

    yearButton.addEventListener("click", (event) => {
      event.stopPropagation();

      calendarYear = year;
      isYearPickerOpen = false;
      persianCalendar.classList.add("active");
      renderCalendar();
    });

    calendarDays.appendChild(yearButton);
  }
}

function renderCalendar() {
  isYearPickerOpen = false;
  isMonthPickerOpen = false;

  calendarWeekdays.style.display = "grid";
  calendarDays.classList.remove("year-picker-mode", "month-picker-mode");

  calendarMonthTitle.style.display = "inline-flex";
  calendarMonthTitle.textContent = jalaliMonths[calendarMonth - 1];
  calendarYearTitle.disabled = false;
  calendarYearTitle.style.pointerEvents = "auto";
  calendarYearTitle.style.cursor = "pointer";
  calendarYearTitle.textContent = toPersianNumber(calendarYear);

  calendarDays.innerHTML = "";

  const daysInMonth = jalaali.jalaaliMonthLength(calendarYear, calendarMonth);

  const firstDay = jalaali.toGregorian(calendarYear, calendarMonth, 1);

  const firstGregorianDate = new Date(
    firstDay.gy,
    firstDay.gm - 1,
    firstDay.gd,
  );

  let firstDayOfWeek = firstGregorianDate.getDay();

  /*
        JavaScript:
        Sunday = 0

        Persian Calendar:
        Saturday = 0
    */

  firstDayOfWeek = (firstDayOfWeek + 1) % 7;

  // Empty cells

  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement("div");

    emptyDay.classList.add("calendar-day", "empty");

    calendarDays.appendChild(emptyDay);
  }

  // Days

  for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");

    dayButton.type = "button";

    dayButton.classList.add("calendar-day");

    dayButton.textContent = toPersianNumber(day);

    // Check selected date

    if (
      selectedDate &&
      selectedDate.jy === calendarYear &&
      selectedDate.jm === calendarMonth &&
      selectedDate.jd === day
    ) {
      dayButton.classList.add("selected");
    }

    // Check today

    if (
      currentJalali.jy === calendarYear &&
      currentJalali.jm === calendarMonth &&
      currentJalali.jd === day
    ) {
      dayButton.classList.add("today");
    }

    dayButton.addEventListener("click", () => {
      selectDate(day);
    });

    calendarDays.appendChild(dayButton);
  }
}

// =========================================
// SELECT DATE
// =========================================

function selectDate(day) {
  selectedDate = {
    jy: calendarYear,

    jm: calendarMonth,

    jd: day,
  };

  const year = toPersianNumber(calendarYear);

  const month = toPersianNumber(String(calendarMonth).padStart(2, "0"));

  const selectedDay = toPersianNumber(String(day).padStart(2, "0"));

  dateOfBirth.value = `${year}/${month}/${selectedDay}`;

  removeError(dateOfBirth);

  persianCalendar.classList.remove("active");

  renderCalendar();
}

// =========================================
// OPEN / CLOSE CALENDAR
// =========================================

calendarToggle.addEventListener("click", () => {
  persianCalendar.classList.toggle("active");

  renderCalendar();
});

jalaliDateGroup.addEventListener("click", (event) => {
  if (
    event.target.closest("#dateOfBirth") ||
    event.target.closest(".calendar-toggle")
  ) {
    persianCalendar.classList.add("active");

    renderCalendar();
  }
});

// =========================================
// YEAR / MONTH NAVIGATION
// =========================================

calendarMonthTitle.addEventListener("click", () => {
  if (isMonthPickerOpen) {
    renderCalendar();
    return;
  }

  renderMonthPicker();
});

calendarYearTitle.addEventListener("click", () => {
  if (isYearPickerOpen) {
    renderCalendar();
    return;
  }

  renderYearPicker();
});

previousMonth.addEventListener("click", () => {
  if (isYearPickerOpen) {
    calendarYear -= 10;
    renderYearPicker();
    return;
  }

  if (isMonthPickerOpen) {
    calendarYear -= 1;
    renderMonthPicker();
    return;
  }

  calendarMonth--;

  if (calendarMonth < 1) {
    calendarMonth = 12;

    calendarYear--;
  }

  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  if (isYearPickerOpen) {
    calendarYear += 10;
    renderYearPicker();
    return;
  }

  if (isMonthPickerOpen) {
    calendarYear += 1;
    renderMonthPicker();
    return;
  }

  calendarMonth++;

  if (calendarMonth > 12) {
    calendarMonth = 1;

    calendarYear++;
  }

  renderCalendar();
});

// =========================================
// CLOSE WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener("click", (event) => {
  const insideDatePicker =
    event.target.closest(".jalali-date-group") ||
    event.target.closest(".persian-calendar") ||
    event.target.closest("#calendarToggle") ||
    event.target.closest("#dateOfBirth");

  if (!insideDatePicker) {
    persianCalendar.classList.remove("active");
  }
});

// =========================================
// INITIAL RENDER
// =========================================

renderCalendar();
