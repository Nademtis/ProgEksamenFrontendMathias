const addNewHotelURL = "http://localhost:3333/addNewHotel"
const getAllHotelsURL = "http://localhost:3333/getAllHotels"
const updateHotelURL = "http://localhost:3333/updateHotel"
const deleteHotelURL = "http://localhost:3333/deleteHotel/"
const addNewGuestURL = "http://localhost:3333/addNewGuest"
const addNewRoomURL = "http://localhost:3333/addNewRoom"
const addNewReservationURL = "http://localhost:3333/addNewReservation"
const getRoomsURL = "http://localhost:3333/getRooms/"

let allHotels = {}
let rooms = {}

function addNewHotel() {
    event.preventDefault();

    let name = document.getElementById("name")
    let street = document.getElementById("street")
    let city = document.getElementById("city")
    let zip = document.getElementById("zip")
    let country = document.getElementById("country")

    let hotel = {
        name: name.value,
        street: street.value,
        city: city.value,
        zip: zip.value,
        country: country.value
    }
    let body = JSON.stringify(hotel)
    console.log(body)

    fetch(addNewHotelURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error in addNewHotel()")
        }
        return response.json()
    }).then(data => {
        console.log("Hotel added" + data)
        alert("Hotel was successfully added")
    }).catch(error => {
        console.error("error saving Hotel" + error)
    })

}

function addNewRoom() {
    event.preventDefault();
    let hotelID = document.getElementById("hotelID").value;
    let price = document.getElementById("roomPrice").value;
    let amountOfBeds = document.getElementById("numberOfBeds").value;

    console.log("fetch looks like: " + addNewRoomURL + "/" + price + "/" + amountOfBeds + "/" + hotelID)
    fetch(addNewRoomURL + "/" + price + "/" + amountOfBeds + "/" + hotelID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error adding room");
            }
        })
        .then(data => {
            console.log("Room was added successfully");
            alert("Room was added successfully")
            window.location.reload();
        })
        .catch(error => {
            console.error('Error adding room:', error);
        });
}

function addNewReservation() {
    event.preventDefault();
    let username = document.getElementById("usernameForReservation").value;
    let selectedDate = document.getElementById("selectedDate").value;
    let roomID = document.getElementById("selectedRoomID").value;

    // console.log("fetch looks like: " + addNewRoomURL + "/" + username + "/" + selectedDate + "/" + roomID)
    fetch(addNewReservationURL + "/" + username + "/" + selectedDate + "/" + roomID, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error adding reservation");
            }
        })
        .then(data => {
            console.log("The Reservation was successful");
            alert("reservation was added successfully")
            window.location.reload();
        })
        .catch(error => {
            console.error('Error making reservation:', error);
        });
}

function cancelReservation(){
    //TODO
}

function updateHotel() {
    event.preventDefault();
    let idToChange = document.getElementById("idToChange")
    let nameToChange = document.getElementById("nameToChange")
    let streetToChange = document.getElementById("streetToChange")
    let cityToChange = document.getElementById("cityToChange")
    let zipToChange = document.getElementById("zipToChange")
    let countryToChange = document.getElementById("countryToChange")

    let hotel = {
        hotelID: idToChange.value,
        name: nameToChange.value,
        street: streetToChange.value,
        city: cityToChange.value,
        zip: zipToChange.value,
        country: countryToChange.value
    }
    let body = JSON.stringify(hotel)
    console.log(body)

    fetch(updateHotelURL, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: body
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error in updateHotel()")
        }
        return response.json()
    }).then(data => {
        console.log("Hotel updated" + data)
        alert("Hotel was successfully updated")
        window.location.reload();
    }).catch(error => {
        console.error("error updating Hotel" + error)
    })
}

function addNewGuest() {
    event.preventDefault();

    let username = document.getElementById("username")
    let firstName = document.getElementById("firstName")
    let lastName = document.getElementById("lastName")
    let email = document.getElementById("email")
    let phoneNumber = document.getElementById("phoneNumber")

    let guest = {
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value
    }
    let body = JSON.stringify(guest)
    console.log(body)

    fetch(addNewGuestURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    }).then(response => {
        if (!response.ok) {
            throw new Error("Error in addNewGuest()")
        }
        return response.json()
    }).then(data => {
        console.log("Guest added" + data)
        alert("You have signed up successfully")
    }).catch(error => {
        console.error("error saving Guest" + error)
    })
}

function showHotels() {
    let tableBody = document.getElementById("listAllHotelsTableBody")

    for (let i = 0; i < allHotels.length; i++) {
        let tableRow = document.createElement("tr")

        let hotelName = document.createElement("td")
        hotelName.textContent = allHotels[i].name
        tableRow.appendChild(hotelName)

        let hotelID = document.createElement("td")
        hotelID.textContent = allHotels[i].hotelID
        tableRow.appendChild(hotelID)

        let hotelRoomAmount = document.createElement("td")
        hotelRoomAmount.textContent = allHotels[i].amountOfRooms
        tableRow.appendChild(hotelRoomAmount)

        let hotelStreet = document.createElement("td")
        hotelStreet.textContent = allHotels[i].street
        tableRow.appendChild(hotelStreet)

        // let hotelCity = document.createElement("td")
        // hotelCity.textContent = allHotels[i].city
        // tableRow.appendChild(hotelCity)
        //
        // let hotelZip = document.createElement("td")
        // hotelZip.textContent = allHotels[i].zip
        // tableRow.appendChild(hotelZip)
        //
        // let hotelCountry = document.createElement("td")
        // hotelCountry.textContent = allHotels[i].country
        // tableRow.appendChild(hotelCountry)

        tableRow.classList.add("tableData")
        tableBody.appendChild(tableRow)
        tableRow.addEventListener("click", function () {
            fillOutForm(allHotels[i]);
        });
    }

}

function deleteHotel() {
    event.preventDefault();
    let hotelIDToDelete = document.getElementById("idToChange").value;

    fetch(deleteHotelURL + hotelIDToDelete, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error deleting hotel");
            }
        })
        .then(data => {
            console.log("Hotel was deleted successfully");
            alert("Hotel was deleted successfully")
            window.location.reload();
        })
        .catch(error => {
            console.error('Error deleting hotel:', error);
        });
}

function fillOutForm(selectedHotel) {
    let onGuestPage = document.getElementById("onGuestPage")
    if (onGuestPage.value === 0) {
        let idToChange = document.getElementById("idToChange")
        let nameToChange = document.getElementById("nameToChange")
        let streetToChange = document.getElementById("streetToChange")
        let cityToChange = document.getElementById("cityToChange")
        let zipToChange = document.getElementById("zipToChange")
        let countryToChange = document.getElementById("countryToChange")


        nameToChange.value = selectedHotel.name
        streetToChange.value = selectedHotel.street
        cityToChange.value = selectedHotel.city
        zipToChange.value = selectedHotel.zip
        countryToChange.value = selectedHotel.country
        idToChange.value = selectedHotel.hotelID

        let hotelIDtoAddRoom = document.getElementById("hotelID")
        hotelIDtoAddRoom.value = selectedHotel.hotelID
    } else {
        fetchRoomsWithHotelID(selectedHotel.hotelID)
    }
}

function fetchRoomsWithHotelID(hotelID) {
    fetch(getRoomsURL + hotelID)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetchRoomsWithHotelID()");
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched rooms:', data);
            populateRoomDropdown(data)
        })
        .catch(error => {
            console.error("Error fetching rooms:" + error);
        });
}

function fetchHotels() {
    fetch(getAllHotelsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetchHotels()");
            }
            return response.json();
        })
        .then(data => {
            allHotels = data;
            console.log('Fetched hotels:', allHotels);
            showHotels()
        })
        .catch(error => {
            console.error('Error fetching hotels:', error);
        });
}

function populateRoomDropdown(rooms) {
    let roomDropdownMenu = document.getElementById("roomDropdownMenu")

    roomDropdownMenu.innerHTML = ""

    rooms.forEach(room => {
        let option = document.createElement("a")
        option.classList.add("dropdown-item")
        option.style.cursor = "pointer"

        option.textContent = "RoomID: " + room.room_id + ", Room number: " + room.roomNumber + ", with " + room.numberOfBeds + " beds for: " + room.roomPrice + "kr"

        option.addEventListener("click", function() {
            document.getElementById("selectedRoomID").value = room.room_id
        });

        roomDropdownMenu.appendChild(option);
    });
}