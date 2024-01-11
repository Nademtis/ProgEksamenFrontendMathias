const addNewHotelURL = "http://localhost:3333/addNewHotel";

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
        console.log("product added" + data)
        alert("Hotel was succesfully added")
    }).catch(error => {
        console.error("error saving product" + error)
    })

}