// Grab UI elements
const container = document.querySelector('.container'),
      seats = document.querySelectorAll('.row .seat:not(.occupied)'),
      count = document.querySelector('#count'),
      total = document.querySelector('#total'),
      movieSelect = document.querySelector('#movie'),
      clearBtn = document.querySelector('#clear');

let ticketPrice = +movieSelect.value;

populateApp();

// Access local storage and populate UI
function populateApp() {
    // Access and parse data in local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // Check if data is in local storage
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // Access movie index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    // Check if data is in local storage
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    // Access ticket price
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    // Check is data is in local storage
    if(selectedMoviePrice !== null) {
        ticketPrice = +selectedMoviePrice;
    }
    
    // Update selected seat count and price
    updateSelectedCount();
}

// Function
function updateSelectedCount() {
    // Get all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into an array
    // Map through array
    // Return a new array of indexes
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    });

    // Store selected seats in local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Count the number of selected seats
    const selectedSeatsCount = selectedSeats.length;

    // Update seat count text in UI
    count.innerText = selectedSeatsCount;
    
    // Update price value in UI
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Event Listeners
// Select movie
movieSelect.addEventListener('change', e => {
    // Set ticket price
    ticketPrice = +e.target.value;
    // Save moive data
    setMovieData(e.target.selectedIndex, e.target.value);
    // Update price based on selected seats
    updateSelectedCount();
})

// Target unoccupied seats
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('.occupied')) {
        // Give unselected seats the selected class
        e.target.classList.toggle('selected');

        // Update seat count and price
        updateSelectedCount();
    }
})

// Target clear selection button
clearBtn.addEventListener('click', e => {
    if(confirm('Are You Sure?')) {
        localStorage.clear();
        window.location.reload();
    }
})