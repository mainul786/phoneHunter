const loadPhones = async (phoneText, showPhone) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, showPhone);
}

const displayPhones = (phones, showPhone) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = ' ';

    // display phone length to short using slice
    const showContianer = document.getElementById('show-container');
    if(showPhone && phones.length > 10) {
        phones = phones.slice(0, 10);
        showContianer.classList.remove('d-none');
    } else {
        showContianer.classList.add('d-none');
    };

    // check input valid information get phones found or not using ternary 
    const noPhoneFound = document.getElementById('phone-not-found');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none');
    }else{
        noPhoneFound.classList.add('d-none');
    }
    

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                 <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Get Details</button>
                    </div>
                  </div>
        `;
        phonesContainer.appendChild(div);
    })
    // stop Lodder
    toggleSpinner(false);
};

const showPhoneLimit = (showPhone) => {
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const searchPhone = inputField.value;
    inputField.value = '';
    loadPhones(searchPhone, showPhone);
}

document.getElementById('btn-search').addEventListener('click', () => {
    // start spinner
    showPhoneLimit(10);
    
});

 //search input field enter event handler
 document.getElementById('input-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        showPhoneLimit(10);
    }
});


// toggle spinner
const toggleSpinner = isLodder => {
    const spinnerLoader = document.getElementById('spinnerLoder');
    isLodder ? spinnerLoader.classList.remove('d-none') : spinnerLoader.classList.add('d-none');
}

document.getElementById('btn-show-all').addEventListener('click', ()=>{
    showPhoneLimit();
});


const loadPhoneDetails = async (id) =>{
const url =`https://openapi.programming-hero.com/api/phone/${id}`;
const res = await fetch(url);
const data = await res.json();
displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phoneDetails) =>{
console.log(phoneDetails);
const phoneTitle = document.getElementById('phoneDetailsModalLabel');
phoneTitle.innerText = phoneDetails.name;
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML = `
<p>mainfetures: ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : 'not found memory'}</P>
<p>Realase Date: ${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'not found releaseDate'}</p>
<p>Bluetooth: ${phoneDetails.mainFeatures.sensors.length}</p>
`;
}
loadPhones('samsung');