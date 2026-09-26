
document.addEventListener("DOMContentLoaded", function () {

    const demo = document.getElementById("demo");

    demo.textContent =
        "IPL is a popular T20 cricket tournament featuring several teams from across India. " +
        "The tournament includes exciting matches played at major cricket stadiums. " +
        "Fans can watch their favorite teams compete and book tickets to enjoy the matches live.";

});


// TOAST NOTIFICATION FUNCTION
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#0B1F5F";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "15px";

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

// VIEW SCHEDULE BUTTON WITH WORKING LOADING STATE
const viewScheduleBtn = document.getElementById("viewScheduleBtn");
const loadingText = document.getElementById("loadingText");

if (viewScheduleBtn) {
    viewScheduleBtn.addEventListener("click", function () {
        // 1. Show the loading text
        if (loadingText) {
            loadingText.style.display = "inline-block";
        }

        // 2. Scroll smoothly to matches section
        const matchesSection = document.getElementById("matches");
        if (matchesSection) {
            matchesSection.scrollIntoView({ behavior: "smooth" });
        }

        // 3. Hide loading text after 1 second (gives time for scroll animation)
        setTimeout(function () {
            if (loadingText) {
                loadingText.style.display = "none";
            }
        }, 1000);
    });
}

// BOOK TICKET BUTTON - HERO SECTION
const bookTicketBtn = document.getElementById("bookTicketBtn");
if (bookTicketBtn) {
    bookTicketBtn.addEventListener("click", function () {
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// BOOK BUTTONS - MATCH SCHEDULE TABLE
const bookLinks = document.querySelectorAll("#matches table a");
bookLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });
        showToast("Please enter your booking details!");
    });
});

// TEAM FILTER
const teamFilter = document.querySelector("#matches select");
const matchRows = document.querySelectorAll("#matches table tr");

if (teamFilter) {
    teamFilter.addEventListener("change", function () {
        const selectedTeam = this.value;

        for (let i = 1; i < matchRows.length; i++) {
            const teams = matchRows[i].cells[1].textContent;

            if (selectedTeam === "All Teams" || teams.includes(selectedTeam)) {
                matchRows[i].style.display = "";
            } else {
                matchRows[i].style.display = "none";
            }
        }
    });
}

// BOOKING FORM SUBMISSION
const form = document.querySelector("#booking form");
let bookingCounter = 1001;

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const match = form.querySelector("select").value;
        const stand = form.querySelectorAll("select")[1].value;
        const tickets = form.querySelector('input[type="number"]').value;
        const name = form.querySelector('input[type="text"]').value;

        let price = 3000;
        if (stand === "General") {
            price = 800;
        } else if (stand === "Premium") {
            price = 1500;
        }

        const total = price * tickets;

        // UPDATE BOOKING SUMMARY CARD
        const summary = document.querySelector("aside");
        summary.innerHTML = `
            <h3>Booking Summary</h3>
            <p><strong>Match:</strong> ${match}</p>
            <p><strong>Stand:</strong> ${stand}</p>
            <p><strong>Price per Ticket:</strong> ₹${price}</p>
            <p><strong>Quantity:</strong> ${tickets}</p>
            <h4>Total Amount: ₹${total}</h4>
        `;

        // UPDATE "MY TICKET BOOKINGS" TABLE
        const bookingsTable = document.querySelector("#mybookings table");
        
        const emptyRow = bookingsTable.querySelector("tr td[colspan]");
        if (emptyRow) {
            emptyRow.parentElement.remove();
        }

        const newRow = bookingsTable.insertRow(-1);
        const bookingID = "IPL" + bookingCounter++;

        newRow.innerHTML = `
            <td>${bookingID}</td>
            <td>${match}</td>
            <td>${stand}</td>
            <td>${tickets}</td>
            <td>₹${total}</td>
            <td style="color: green; font-weight: bold;">Confirmed</td>
        `;

        showToast("Booking confirmed for " + name + "!");
        form.reset();
    });
}
