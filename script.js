window.onload = populateSelect()
window.onload = populateDates()
var destination = [];

const names = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const telephone1 = document.getElementById("telephone1");
const telephone2 = document.getElementById("telephone2");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");

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
    country_code = selectElement.value;
    let element = document.getElementById('selectCity');

    let response = await fetch('https://amazon-api.sellead.com/city?country_code=' + country_code + '&forAccommodation=true')
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

    let destinationSelected = {
        country: selectedCountry.options[selectedCountry.selectedIndex].text,
        country_code: selectedCountry.value,
        city: selectedCity.options[selectedCity.selectedIndex].text,
        city_id: selectedCity.value
    }

    destination.push(destinationSelected);
}

async function sendForm() {
    birthDate = document.getElementById("birthdayYear").value + "-" + document.getElementById("birthdayMonth").value + "-" + document.getElementById("birthdayDay").value;
    passportValidity= document.getElementById("passportYear").value + "-" + document.getElementById("passportMonth").value + "-" + document.getElementById("passportDay").value;

    let student = {
        "student_id": 3550619,
        "name": document.getElementById("name").value,
        "surname": document.getElementById("surname").value,
        "email": document.getElementById("email").value,
        "phone1": document.getElementById("telephone1").value,
        "phone2": document.getElementById("telephone2").value,
        "passport": document.getElementById("passport").value,
        "passportValidity": passportValidity,
        "registerNumber": document.getElementById("cpf").value,
        "registerNumber2": document.getElementById("rg").value,
        "account_id": 10,
        "birthDate": birthDate,
        "destination": {
            "student_id":3550619,
            "destination": destination,
            "haveDeleted":false,
            "deletedIds": []
        }
    }
    const res = await axios.put('https://amazon-api.sellead.com/studentform/3719?hash=IcxxRVNJT2sPdTC1ygVXDEe7ohco5niMtmCd7MgpScKAELdqatH6Abn&timelog=2022-12-23+20:56:35', student);
}

function format() {
    //Validates Telephone1 number and formats it as: '(xx)xxxxx-xxxx'
    const inputTelephone1 = document.querySelector('#telephone1');
    inputTelephone1.addEventListener('input', (event) => {
      let dataHolder = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      event.target.value = !dataHolder[2] ? dataHolder[1] : `(${dataHolder[1]}) ${dataHolder[2]}-${dataHolder[3]}`;
    });

    //Validates Telephone2 number and formats it as: '(xx)xxxxx-xxxx'
    const inputTelephone2 = document.querySelector('#telephone2');
    inputTelephone2.addEventListener('input', (event) => {
      let dataHolder = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      event.target.value = !dataHolder[2] ? dataHolder[1] : `(${dataHolder[1]}) ${dataHolder[2]}-${dataHolder[3]}`;
    });

    //Validates CPF number and formats it as: 'xxx.xxx.xxx-xx'
    const inputCpf = document.querySelector('#cpf');
    inputCpf.addEventListener('input', (event) => {
      let dataHolder = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
      event.target.value = !dataHolder[2] ? dataHolder[1] : `${dataHolder[1]}.${dataHolder[2]}.${dataHolder[3]}-${dataHolder[4]}`;
    });

    //Validates RG number and formats it as: 'xx.xxx.xxx-x'
    const inputRg = document.querySelector('#rg');
    inputRg.addEventListener('input', (event) => {
      let dataHolder = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,1})/);
      event.target.value = !dataHolder[2] ? dataHolder[1] : `${dataHolder[1]}.${dataHolder[2]}.${dataHolder[3]}-${dataHolder[4]}`;
    });
}

function validateForm() {
    const namesValue = names.value;
    const surnameValue = surname.value;
    const emailValue = email.value;
    const telephone1Value = telephone1.value;
    const telephone2Value = telephone2.value;
    const cpfValue = cpf.value;
    const rgValue = rg.value;
    //Checks if any mandatory input is empty
    if (namesValue === "") {
        alert("O nome não pode ser vazio");
        return
    } 
    if (surnameValue === "") {
        alert("O sobrenome não pode ser vazio");
        return
    }
    if (emailValue === "") {
        alert("O email não pode ser vazio");
        return
    }
    if (telephone1Value === "") {
        alert("O telefone 1 não pode ser vazio");
        return
    }
    if (telephone2Value === "") {
        alert("O telephone 2 não pode ser vazio");
        return
    }

    //Checks if any number is invalid
    if (telephone1Value.length != 15) {
        alert("Digite um valor válido para telefone 1");
    return
    }
    if (telephone2Value.length != 15) {
        alert("Digite um valor válido para telefone 2");
    return
    }
    if (cpfValue.length != 14 && cpfValue.length != 0) {
        alert("Digite um valor válido para CPF");
    return
    }
    if (rgValue.length != 12 && rgValue.length != 0) {
        alert("Digite um valor válido para RG");
    return
    }

    sendForm()
}