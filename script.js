let selectedCar = "";

function selectCar(name, image) {
  selectedCar = name;
  document.getElementById('selectedCarName').textContent = name;
  document.getElementById('bookingFormContainer').classList.remove('hidden');
  document.getElementById('bookingFormContainer').scrollIntoView({ behavior: 'smooth' });
}

function submitBooking(event) {
  event.preventDefault();

  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const location = document.getElementById('pickupLocation').value;

  // Show confirmation popup
  document.getElementById('confirmModal').classList.remove('hidden');

  // Update WhatsApp link
  const msg = `*Booking Confirmed!*\n\nName: ${name}\nPhone: ${phone}\nCar: ${selectedCar}\nDate: ${date}\nTime: ${time}\nPickup: ${location}`;
  const encodedMsg = encodeURIComponent(msg);
  const whatsappLink = `https://wa.me/91${phone}?text=${encodedMsg}`;
  document.getElementById('whatsappLink').href = whatsappLink;

  // Save to localStorage (for admin table)
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push({ name, phone, car: selectedCar, date, time, location });
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Auto open WhatsApp after 3s
  setTimeout(() => {
    window.open(whatsappLink, '_blank');
  }, 3000);
}

function checkAdminPass() {
  const pass = document.getElementById('adminPass').value;
  if (pass === "admin2025") {
    document.getElementById('adminLoginModal').style.display = 'none';
    showAdminPanel();
  } else {
    alert("Wrong password.");
  }
}

function showAdminPanel() {
  document.getElementById('adminPanel').classList.remove('hidden');
  const data = JSON.parse(localStorage.getItem("bookings") || "[]");
  const tbody = document.getElementById("adminTableBody");
  tbody.innerHTML = "";
  data.forEach(booking => {
    const row = `<tr>
      <td>${booking.name}</td>
      <td>${booking.phone}</td>
      <td>${booking.car}</td>
      <td>${booking.date}</td>
      <td>${booking.time}</td>
      <td>${booking.location}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function checkUserStatus() {
  // You can manage popup/login check here
}

function filterTable() {
  const val = document.getElementById('searchBox').value.toLowerCase();
  const rows = document.querySelectorAll("#adminTableBody tr");
  rows.forEach(row => {
    const match = row.innerText.toLowerCase().includes(val);
    row.style.display = match ? "" : "none";
  });
}
