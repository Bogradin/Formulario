window.onload = populateSelect()

async function populateSelect() {
    let response = await fetch('https://amazon-api.sellead.com/country')
    let users = await response.json()
    console.log(users[1].code)

    let element = document.getElementById('selectCountry');
    for (let index = 0; index < users.length; index++) {
        // BIND DATA TO <select> ELEMENT.
        element.innerHTML = element.innerHTML +
            '<option value="' + users[index].code + '">' + users[index].name + '</option>';
    }
}

