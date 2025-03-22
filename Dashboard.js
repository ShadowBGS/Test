// If not logged in, redirect to login page
if (!sessionStorage.getItem("isLoggedIn")) {
  window.location.href = "StudentLogin.html";
}

function logout() {
  // Clear session storage on logout
  sessionStorage.removeItem("matricNo");
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "StudentLogin.html";
}
function togglePopup(event) {
  event.stopPropagation(); // Prevents closing when clicking the profile pic
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// Close pop-up when clicking anywhere outside of it
document.addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});

document.addEventListener("DOMContentLoaded", async function () {
  const matricNo = sessionStorage.getItem("matricNo");
  if (!matricNo) {
    console.error("Matric number not found in session storage.");
    alert("Matric number not found. Please log in again.");
    return;
  }

  const emailElement = document.getElementById("Email");
  const nameElement = document.getElementById("Name");

  if (!emailElement || !nameElement) {
    console.error("Email or Name element not found in the DOM.");
    alert("Error: Email or Name field is missing on the page.");
    return;
  }

  try {
    // Fetch student details
    const studentResponse = await fetch(
      `https://localhost:44315/api/Students/${matricNo}`
    );
    if (!studentResponse.ok) throw new Error("Student not found");

    const Student = await studentResponse.json();

    // Update the UI with fetched student details
    emailElement.innerText = Student.email;
    nameElement.innerText = Student.name;

    console.log("Email:", Student.Email);
    console.log("Email:", Student);
    console.log(matricNo);
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});
