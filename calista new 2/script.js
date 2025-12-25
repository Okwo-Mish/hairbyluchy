/* PAGE LOAD INTRO */
window.addEventListener("load", () => {
  document.getElementById("page").classList.add("loaded");
});

/* MOBILE MENU */
// const menuBtn = document.getElementById("menuBtn");
// const nav = document.getElementById("nav");

// menuBtn.addEventListener("click", () => {
//   nav.classList.toggle("show");
//   menuBtn.textContent = nav.classList.contains("show") ? "✕" : "☰";
// });

/* SCROLL ANIMATIONS */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

/* SERVICE SELECTION */
let selectedService = null;

const cards = document.querySelectorAll(".service-card");
const form = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("serviceSelect");
const totalPrice = document.getElementById("totalPrice");
const confirmBtn = document.getElementById("confirmBtn");


serviceSelect.addEventListener("change", () =>{
  const option = serviceSelect.selectedOptions[0];

  if (!option || !option.dataset.price) {
    selectedService = null;
    confirmBtn.disabled = true;
    totalPrice.textContent = "";
    return;
  }
  selectedService={
    name: option.value,
    price: option.dataset.price,
    duration: option.dataset.duration
  };

  cards.forEach(c => c.classList.remove("active"));
  totalPrice.textContent = `Total Price: ₦${selectedService.price}`;
  confirmBtn.disabled=false;
  console.log("service:", selectedService);
});




cards.forEach(card => {
  card.querySelector(".select").addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    selectedService = {
      name: card.dataset.name,
      price: card.dataset.price,
      duration: card.dataset.duration
    };

    serviceSelect.value = selectedService.name;
    totalPrice.textContent = `Total Price: ₦${selectedService.price}`;
    confirmBtn.disabled = false;

    document.getElementById("appointment")
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* FORM SUBMIT → WHATSAPP */
form.addEventListener("submit", e => {
  e.preventDefault();

  if (!selectedService){
    alert("please select a service");
    return;
  }

  const name = form.querySelector("#fullName").value;
  const email = form.querySelector("#email").value;
  const date = form.querySelector("#date").value;
  const location = document.getElementById("location").value;

  const msg =
    `Hello Luchy, I would like to book an appointment

    Name: ${name}

    Email: ${email}

    Date: ${date}

    Service: ${selectedService.name}

    Location: ${location}

    Price: ₦${selectedService.price}

    Duration: ${selectedService.duration}`;

// console.log(msg);
const encodedmsg = encodeURIComponent(msg);


  window.open(`https://wa.me/2348081628904?text=${encodedmsg}`, "_blank");
  setTimeout(() => location.href = "thank-you.html", 600);
});



const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const links = sidebar.querySelectorAll("a");

function openSidebar() {
  sidebar.classList.add("open");
  menuBtn.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  menuBtn.classList.remove("active");
}

// Toggle via button
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

// Prevent sidebar clicks from closing it
sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Close when clicking outside
document.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  }
});

// ✅ Close sidebar when a link is clicked
links.forEach(link => {
  link.addEventListener("click", closeSidebar);
});