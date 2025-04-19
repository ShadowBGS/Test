function authorizedFetch(url, options = {}) {
  const token = sessionStorage.getItem("token"); // Your JWT token
  const apiKey = "your-api-key"; // Replace with your actual API key

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

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
//
const serialNumber = localStorage.getItem("selectedSerial");
const bookurl = `https://localhost:44354/api/Books/${serialNumber}`;
const userId = sessionStorage.getItem("userId");

const requestborrowurl = `https://localhost:44354/api/Books/borrowOnline/${serialNumber}/${encodeURIComponent(
  userId
)}`;
const borrowHistoryUrl = `https://localhost:44354/api/Books/borrow-history?UserId=${encodeURIComponent(
  userId
)}&serialnumber=${serialNumber}&IsReturned=false&IsOnline=True`;

document.addEventListener("DOMContentLoaded", async function () {
  const borrowResponse = await authorizedFetch(borrowHistoryUrl);
  const borrowData = await borrowResponse.json();
  const isBorrowed = borrowData.totalNotReturned > 0;
  if (serialNumber) {
    console.log(userId);
    console.log("Serial Number:", serialNumber);
    // document.getElementById("serialDisplay").textContent = serialNumber; // Display it
  } else {
    console.log("No serial number found.");
  }
  try {
    const response = await authorizedFetch(bookurl);
    const book = await response.json();
    const imageUrl = `https://localhost:44354/api/Books/image/${serialNumber}`;
    const imgresponse = await authorizedFetch(imageUrl);
    const blob = await imgresponse.blob();
    const objectURL = URL.createObjectURL(blob);
    console.log(book);
    const pdf = book.pdfPath;
    const bookName = truncateText(book.name, 7);
    document.getElementById("BName").innerText = truncateText(book.name, 7);
    document.getElementById("SerialNumber").innerText = book.serialNumber;
    document.getElementById("Image").src = objectURL;
    document.getElementById("Author").innerText = truncateText(book.name, 7);
    document.getElementById("Description").innerHTML = book.description;
    document.getElementById("Year").innerHTML = "Published: " + book.year;
    console.log(book.quantity);
    const Bbutton = document.getElementById("borrow");
    console.log(Bbutton);
    if (pdf == null) {
      Bbutton.className = "unavailable";
      Bbutton.innerHTML = "Unavailable";
    } else if (isBorrowed) {
      Bbutton.className = "borrowed";
      Bbutton.innerHTML = "Read";
    } else if (!isBorrowed && book.quantity >= 1) {
      Bbutton.className = "borrow";
      Bbutton.innerHTML = "Borrow";
    }

    document.querySelectorAll(".borrowed").forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("Clicked!"); // Save serial number
        localStorage.setItem("savedLocation", window.location.href);
        localStorage.setItem("bookName", bookName);
        window.location.href = "ReadBook.html"; // Redirect to next page
      });
    });
    document.querySelectorAll(".borrow").forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("Clicked!"); // Save serial number
        localStorage.setItem("bookName", bookName);
        localStorage.setItem("savedLocation", window.location.href);
        window.location.href = "RequestBorrow.html"; // Redirect to next page
      });
    });
  } catch (error) {
    console.error("Eroor fetching Book");
  }
});
function truncateText(text, wordCount) {
  let words = text.split(" ");
  return words.length > wordCount
    ? words.slice(0, wordCount).join(" ") + "..."
    : text;
}
