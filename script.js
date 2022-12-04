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
    let element = document.getElementById('selectCity');

    let response = await fetch('https://amazon-api.sellead.com/city?country_code=' + output + '&forAccommodation=true')
    let users = await response.json()
    console.log(users)

    var i, L = selectCity.options.length - 1;
    for(i = L; i >= 0; i--) {
        selectCity.remove(i);
    }
    element.innerHTML = element.innerHTML +
            '<option value="' + 1 + '">' + 'City' + '</option>';
    
    for (let index = 0; index < users.length; index++) {
        // BIND DATA TO <select> ELEMENT.
        element.innerHTML = element.innerHTML +
            '<option value="' + users[index].code + '">' + users[index].name + '</option>';
    }
}

