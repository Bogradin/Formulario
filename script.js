window.onload = populateSelect()
window.onload = populateDates()
var destination = [];

function populateDates() {
    let birthdayDay = document.getElementById('birthdayDay');
    let birthdayMonth = document.getElementById('birthdayMonth');
    let birthdayYear = document.getElementById('birthdayYear');
    let passportDay = document.getElementById('passportDay');
    let passportMonth = document.getElementById('passportMonth');
    let passportYear = document.getElementById('passportYear');

    for (let index = 1; index <= 31; index++) {
        birthdayDay.innerHTML = birthdayDay.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }
    for (let index = 1; index <= 12; index++) {
        birthdayMonth.innerHTML = birthdayMonth.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }
    for (let index = 1922; index <= 2022; index++) {
        birthdayYear.innerHTML = birthdayYear.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }

    for (let index = 1; index <= 31; index++) {
        passportDay.innerHTML = passportDay.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }
    for (let index = 1; index <= 12; index++) {
        passportMonth.innerHTML = passportMonth.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }
    for (let index = 2022; index <= 2040; index++) {
        passportYear.innerHTML = passportYear.innerHTML +
            '<option value="' + index + '">' + index + '</option>';
    }
}

async function populateSelect() {
    let response = await fetch('https://amazon-api.sellead.com/country')
    let users = await response.json()

    let element = document.getElementById('selectCountry');
    for (let index = 0; index < users.length; index++) {
        // BIND DATA TO <select> ELEMENT.
        element.innerHTML = element.innerHTML +
            '<option value="' + users[index].code + '">' + users[index].name + '</option>';
    }
}

async function populateSelectCities() {
    selectElement = document.querySelector('#selectCountry');
    output = selectElement.value;
    let element = document.getElementById('selectCity');

    let response = await fetch('https://amazon-api.sellead.com/city?country_code=' + output + '&forAccommodation=true')
    let users = await response.json()

    var i, L = selectCity.options.length - 1;
    for(i = L; i >= 0; i--) {
        selectCity.remove(i);
    }
    element.innerHTML = element.innerHTML +
            '<option value="' + 0 + '">' + 'City' + '</option>';
    
    for (let index = 0; index < users.length; index++) {
        // BIND DATA TO <select> ELEMENT.
        element.innerHTML = element.innerHTML +
            '<option value="' + users[index].id + '">' + users[index].name + '</option>';
    }
}

function selectDestination() {
    let selectedCountry = document.getElementById("selectCountry");
    let selectedCity = document.getElementById("selectCity");

    let destinationSelected = [{
        country: selectedCountry.options[selectedCountry.selectedIndex].text,
        country_code: selectedCountry.value,
        city: selectedCity.options[selectedCity.selectedIndex].text,
        city_id: selectedCity.value
    }]

    destination.push(destinationSelected);
}

async function sendForm() {
    birthDate = document.getElementById("birthdayYear").value + "-" + document.getElementById("birthdayMonth").value + "-" + document.getElementById("birthdayDay").value;
    passportValidity= document.getElementById("passportYear").value + "-" + document.getElementById("passportMonth").value + "-" + document.getElementById("passportDay").value;

    let student = [{
        "id": 3550618,
        "name": document.getElementById("name").value,
        "surname": document.getElementById("surname").value,
        "email": document.getElementById("email").value,
        "phone1": document.getElementById("telephone1").value,
        "phone2": document.getElementById("telephone2").value,
        "passport": document.getElementById("passport").value,
        "passportValidity": passportValidity,
        "registerNumber": document.getElementById("cpf").value,
        "registerNumber2": document.getElementById("rg").value,
        "account_id": 15,
        "birthDate": birthDate,
        "destination": {
            "student_id":3550618,
            "destination": destination,
            "haveDeleted":false,
		    "deletedIds": []
        }
    }]

    const res = await axios.put('https://amazon-api.sellead.com/studentform/3718?hash=CrZoFL5etNmYyx0TdRTy5VkOdc4yb5mzYHjhIGDc9uEYp1CPBphsGPV&timelog=2022-12-15+22:33:43', student);
}