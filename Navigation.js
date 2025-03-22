function closeSidebar() {
  const sidebar = document.getElementById("SideH");
  if (sidebar) {
    sidebar.style.display = "none "; // Hide the sidebar
  }
}
function openSidebar() {
  const sidebar = document.getElementById("SideH");
  if (sidebar) {
    sidebar.style.display = "flex "; // Hide the sidebar
  }
}

function togglePopup(event) {
  event.stopPropagation(); // Prevents closing when clicking the profile pic
  const popup = document.getElementById("popup");
  const popup1 = document.getElementById("popup1");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
  popup1.style.display = popup1.style.display === "flex" ? "none" : "flex";
}

// Close pop-up when clicking anywhere outside of it
document.addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
  const popup1 = document.getElementById("popup1");
  popup1.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const closeButton2 = document.getElementById("close2");
  const closeButton = document.getElementById("close");
  const openButton = document.getElementById("open");

  if (closeButton) {
    closeButton.addEventListener("click", closeSidebar);
  }

  if (closeButton2) {
    closeButton2.addEventListener("click", closeSidebar);
  }
  if (openButton) {
    openButton.addEventListener("click", openSidebar);
  }
});
