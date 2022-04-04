// fetching the HTML element
const btn = document.getElementById("btn");
const name = document.getElementById("name");
const email = document.getElementById("email");
const contactList = document.getElementById("contact-list");

//Creating a blank array which is going to be stored in local storage
// of the browser
var array = [];

//setting clickable event on btn
btn.addEventListener("click", function (e) {
    //to prevent the default nature of the form of submitting
    e.preventDefault();
    //checking the validity of the form, name or email is empty or not
    //basically it is a inbuilt function having boolean return type
    const isValid = form.checkValidity();
    if (isValid) {
        //on restarting the page we need to retrieve the previous data so
        var data = localStorage.getItem("contact");
        var result = JSON.parse(data);
        //creating an object containing the details entered
        var details = {
            name: name.value,
            email: email.value
        }
        //if localstorage result array is null then
        if(result == null){
            array.push(details);
            localStorage.setItem("contact", JSON.stringify(array));
            
        }
        else{
            //pushing this details object into the array
        //so that the problem of overwritting on the same key
        //can resolve
        result.push(details);
        //a method of storing data to the local storage
        // we cannot directly pass an result as parameter in
        //setItem. So we need to convert it into string by using
        //JSON.stringify
        localStorage.setItem("contact", JSON.stringify(result));
        }
        
        //To remove the contacts which are already there on the screen
        contactList.innerHTML = null;

        //calling the createContact function on clicking submit button
        createContact();
        //After running the createContact function the name and email should
        // automatically be cleared from the screen
        name.value = "";
        email.value = "";
    }
    else {
        console.log("Kindly fill the complete form");
    }


})

//creating contact functionn
// function createContact() {
//     const plate = document.createElement("div");
//     plate.classList.add("contact");
//     //setting the HTML of the div using javascript
//     plate.innerHTML = `<p id="nameDisplay"> ${name.value} </p>
//                         <p id="emailDisplay"> ${email.value} </p>
//                         <button id="delete" onclick = "remove(this)" >Delete</button>`;
//     contactList.appendChild(plate);
// }

//making the delete button work properly
function remove(contact , detail) {
    //for confirmation while deleting
    var confirm = window.confirm("Do you want to delete this contact?");
    if(confirm){
        var data = localStorage.getItem("contact");
        var result = JSON.parse(data);
        //removing the index of the array
        result.splice(detail,1);
        //now again overwritting the array of the localStorage 
        localStorage.setItem("contact" , JSON.stringify(result));
    
        var element = contact;
        element.parentElement.remove();
    }
    else{
        console.log("Not deleted");
    }
  
}

//to load the contacts which are stored in the local storage
function createContact(){
    var data = localStorage.getItem("contact");
    //now we want the contacts to be in array form insteat of string
    var result = JSON.parse(data);
    //checking
    console.log(result);
    //Now for each element of the array we are creating the
    //HTML part
    result.forEach((detail) => {
        const plate = document.createElement("div");
        plate.classList.add("contact");
        //setting the HTML of the div using javascript
        plate.innerHTML = `<p id="nameDisplay"> ${detail.name} </p>
                            <p id="emailDisplay"> ${detail.email} </p>
                            <button id="delete" onclick = "remove(this , ${result.indexOf(detail)})" >Delete</button>`;
        contactList.appendChild(plate);  
    });
}
//calling the localContacts function
createContact();