window.onload = populateSelect()

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

    let response = await fetch('https://amazon-api.sellead.com/city?country_code=' + output + '&forAccommodation=true')
    let users = await response.json()
    console.log(users)

    let element = document.getElementById('selectCity');
    for (let index = 0; index < users.length; index++) {
        // BIND DATA TO <select> ELEMENT.
        element.innerHTML = element.innerHTML +
            '<option value="' + users[index].code + '">' + users[index].name + '</option>';
    }
}

populateSelectCities()
