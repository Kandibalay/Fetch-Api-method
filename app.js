
let addPostForm = document.getElementById('addPosts');
const nameValue = document.getElementById('fullName');
const emailValue = document.getElementById('email');
const ageValue = document.getElementById('age');
const addressValue = document.getElementById('address');

let output = '<div><h2>Alumni Data</h2></div><br><hr>';


// let renderPosts = (users) =>{ 
//     console.log(users.length);
//     users.forEach(user =>{
//         output += `
//             <div class='card' id=${user.id}>
//                     <h3 class='realName' id='nameCard'>${user.name}</h3>
//                     <p class='mail'><b>Email: </b><span id='emailCard'>${user.email}</span></p>
//                     <p><b>Age: </b><span id='ageCard'> ${user.age}</span></p>
//                     <p ><b>Address: </b><span id='addressCard'>${user.address}</span></p>

//                     <div id='btn_3'>
//                         <button id='btn_edit'>Edit</button>
//                         <button id='btn_delete'>Delete</button>
//                     </div>   
//             </div>
//         `
//     });
    
//     document.getElementById('output').innerHTML = output

// }

const url = 'http://localhost:3000/users';




// get All Users
// Method: GET

fetch(url)
    .then((res) => res.json())
    .then((data) =>{
        let output = '<div><h2>Alumni Data</h2></div><br><hr>';
        console.log(data.length);
        data.forEach(user =>{
        output += `
            <div class='card' id=${user.id}>
                    <h3 class='realName' id='nameCard'>${user.name}</h3>
                    <p class='mail'><b>Email: </b><span id='emailCard'>${user.email}</span></p>
                    <p><b>Age: </b><span id='ageCard'> ${user.age}</span></p>
                    <p ><b>Address: </b><span id='addressCard'>${user.address}</span></p>

                    <div id='btn_3'>
                        <button id='btn_edit'>Edit</button>
                        <button id='btn_delete'>Delete</button>
                    </div>   
            </div>
        `
        });
        document.getElementById('output').innerHTML = output
    })
    .catch((err) => console.log(err, 'error 404'))

// Create New Post
// Method: POST


addPostForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInputs();

    console.log(nameValue.value)
    console.log(emailValue.value)
    console.log(ageValue.value)
    console.log(addressValue.value)
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: nameValue.value,
            email: emailValue.value,
            age: ageValue.value,
            address: addressValue.value
        })
    })
    .then((res) => res.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data)
        renderPosts(dataArr)
        })
    
        addPostForm.submit();
  
        // Refresh the page
        window.location.assign('index.html');
});

function checkInputs(){
    // get the values of the inputs
    const mainName = nameValue.value.trim();
    const mainEmail = emailValue.value.trim();
    const mainAge = ageValue.value.trim();
    const mainAddress = addressValue.value.trim();

    if(mainName === ''){
        // show error
        // add error class
        setErrorFor(nameValue, 'Name cannot be blank');
        

    }
    else{
        // add success
        setSuccessFor(nameValue);
    }
     
    if (mainEmail === ''){
        setErrorFor(emailValue, 'Email cannot be empty');
        
        
    }
    else if (!isEmail(mainEmail)) {
        setErrorFor(emailValue, 'Email is not valid');
    } else {
        setSuccessFor(emailValue);
    }
    
    if(mainAge === ''){
        setErrorFor(ageValue, 'Input valid age');

    }
     else{
        setSuccessFor(ageValue);
    }

    if (mainAddress === '') {
        setErrorFor(addressValue, 'Address must be captured')
    } else {
        setSuccessFor(addressValue);
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small'); 

    // add error message inside small tag

    small.innerText = message;

    

    // add error class
    formControl.className = 'form-control error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'

}
function setErrorFor(textarea, message){
    const formControl = textarea.parentElement;
    const small = formControl.querySelector('small'); 

    // add error message inside small tag

    small.innerText = message;

    

    // add error class
    formControl.className = 'form-control error'
}

function setSuccessFor(textarea) {
    const formControl = textarea.parentElement
    formControl.className = 'form-control success'

}

function isEmail(emailValue) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue);
}

// addPostForm.addEventListener("submit", (e) => {
//     e.preventDefault();

 
// })

document.getElementById('output').addEventListener('click', (e) =>{
    e.preventDefault();
    console.log('cat');
    let editButtonPressed = e.target.id == 'btn_edit';
    let delButtonPressed = e.target.id == 'btn_delete';


    let id = e.target.parentElement.parentElement.id;

    // Delete - Remove the Existing Post
    // Method: DELETE

    if (delButtonPressed) {
        fetch(`${url}/${id}`,{
            method: 'DELETE',

        })
            .then((res) => res.json())
            .then(() => location.reload())
    }

    if (editButtonPressed) {
        const parent = e.target.parentElement.parentElement;
        console.log(parent)
        console.log(parent.id)
        console.log(parent.querySelector('#emailCard'))
        let nameInput = parent.querySelector('#nameCard').textContent;
        let emailInput = parent.querySelector('#emailCard').textContent;
        let ageInput = parent.querySelector('#ageCard').textContent;
        let addressInput = parent.querySelector('#addressCard').textContent;

        
        console.log(nameInput);
        nameValue.value = nameInput;
        emailValue.value = emailInput;
        ageValue.value = ageInput;
        addressValue.value = addressInput;

    }
})

