document.addEventListener("DOMContentLoaded", async function () {
  const booksContainer = document.querySelector(".book_list");
  const booksApiUrl = "https://localhost:44315/api/Books";
  const matricNumber = "22/2464"; // Change dynamically if needed

  try {
    // Fetch the book list
    const response = await fetch(booksApiUrl);
    const books = await response.json();

    // Render books dynamically
    booksContainer.innerHTML = "";
    for (const book of books) {
      const borrowHistoryUrl = `https://localhost:44315/api/Books/borrow-history?matricNumber=${encodeURIComponent(
        matricNumber
      )}&serialnumber=${book.serialNumber}&IsReturned=false`;

      // Check if the book has been borrowed
      const imageUrl = `https://localhost:44315/api/books/image/${book.serialNumber}`;
      const borrowResponse = await fetch(borrowHistoryUrl);
      const borrowData = await borrowResponse.json();
      const isBorrowed = borrowData.totalNotReturned > 0; // Check if book is not returned

      // Create book card
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.innerHTML = `
        <img src="${imageUrl}" alt="${book.name}" />
        <h3>${book.name}</h3>
        <p>${book.author}</p>
        <div class="book_details">
          <button class="${isBorrowed ? "borrowed" : "borrow"}">
            ${isBorrowed ? "Borrowed" : "Borrow"}
          </button>
          <a href="BookDetails.html?serialNumber=${
            book.serialNumber
          }" class="details">View <br />Details</a>
        </div>
      `;

      booksContainer.appendChild(bookElement);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
});
