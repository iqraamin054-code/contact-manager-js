// Contact Manager Project



const nameInput = document.querySelector("#user_name");
const phoneInput = document.querySelector("#phone_number");
const addButton = document.querySelector("#button1");
const searchInput = document.querySelector("#search_name");
const searchButton = document.querySelector("#search-btn");
const contactList = document.querySelector("#contact_list")
const showContacts = document.querySelector("#show_all")




// validation for string

const validateName = (userName) =>{

    if(userName === null || userName.trim() === ""){

        return "You did not enter anything";

    }
    if (!isNaN(userName)) {

        return "Error: Number cannot be used as name";

    }
    return null;

}


// validation for number
const validateNumber = (number) =>{

    if(number === null || number.trim() === ""){
        return "You did not enter anything";
    }

    let numValue = Number(number);

    if (isNaN(numValue)) {
        return "Invalid Input";
    }

    if(!Number.isInteger(numValue)){
        return "Error: number must contain digits only";
    }

    return null;

    }

    
// validate phone number

const validatePhone = (phoneNumber) => {

    let numError = validateNumber(phoneNumber);

    if(numError !== null){  
        return (numError);
    }
   
    if (phoneNumber.trim().length !== 11) {

        return "Error: phone number length must be 11";

    }
    
    return null;
}




const contactManager = {
    contacts: [],

    addContact: function(userName, phoneNumber){
        if (!userName || !phoneNumber) {
            throw new Error("Invalid contact data");
        }

        this.contacts.push({userName, phoneNumber});
},


    showAllContacts: function(){
        contactList.innerHTML = ""; 
        for (let index = 0; index < this.contacts.length; index++) {
            const contact = this.contacts[index];
            const infoToShow = `${contact.userName}-${contact.phoneNumber}`;
            this.renderContact(contactList, infoToShow,index);
    }
},


    renderContact: function (parent,iter,index) {
        const newList = document.createElement("li");
        newList.textContent = iter;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (event) => {
            this.deleteContact(index);
            this.saveContacts();
            this.showAllContacts();
        }); 
        newList.append(deleteButton);
        parent.append(newList);
            
    },

    deleteContact: function(index){

        this.contacts.splice(index, 1);

    },


    saveContacts: function(){

        localStorage.setItem("contacts",JSON.stringify(this.contacts));

    },


    loadContacts: function(){

        try {
            this.contacts = JSON.parse(localStorage.getItem("contacts")) || []; 
                       
        }catch (error) {

            console.error("Data Error: Local storage corrupted."+ error.message);

            this.contacts = []; 
    
            alert("There was an issue loading your contacts. The list has been reset.");
        }
            
    }

};


    contactManager.loadContacts();
    contactManager.showAllContacts();

// ADD CONTACT

    addButton.addEventListener("click", (event) => {     

        try {

            event.preventDefault();

            let userName = nameInput.value.trim();
            let phoneNumber = phoneInput.value.trim();
      
    
            let nameError = validateName(userName);

                if (nameError !== null) {
                    alert(nameError); 
                    return;
                } 
        

            let phoneError = validatePhone(phoneNumber);

                if(phoneError !== null){
                    alert(phoneError);
                    return;        

                }

 
            contactManager.addContact(userName, phoneNumber);
            contactManager.saveContacts();
            contactManager.showAllContacts();

            console.log(`${userName} - ${phoneNumber}`); 
            
            nameInput.value = "";
            phoneInput.value = "";

    }catch(error){
    alert(error.message);
    }
});


    // SEARCH CONTACTS

    searchButton.addEventListener("click", (event) =>{

        event.preventDefault();

        let searchInfo = searchInput.value.trim().toLowerCase();

        let searchError = validateName(searchInfo);

            if (searchError !== null) {
                alert(searchError); 
                return;
            }; 
        
            
        contactList.innerHTML = "";
        let searchFound = false;

                
            contactManager.contacts.forEach((contact, index) => {
                if (contact.userName.toLowerCase().includes(searchInfo)) {
                    const infoToShow = `${contact.userName}-${contact.phoneNumber}`;
                    contactManager.renderContact(contactList, infoToShow, index);
                    searchFound = true;
                 }
            });

            if (searchFound === false) {
                const searchResult = document.createElement("li");
                searchResult.textContent = "No contacts found";
                searchResult.style.listStyleType = "none";
                contactList.append(searchResult);
                
            }
            
         searchInput.value = "";          
 
    });

// SHOW ALL CONTACTS

    showContacts.addEventListener("click", (event) => {
        event.preventDefault();
        contactManager.showAllContacts();

});
        
        