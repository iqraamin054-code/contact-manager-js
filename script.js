// Contact Manager Project


const showInfo = (contacts) => {

            let counter = 1;
            let contactList = "";
            for(let info of contacts){

                contactList += `${counter}. ${info.userName}- ${info.phoneNumber}\n`;
                
                counter ++;
            }

           return contactList;

        }

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

    let numValue = Number(number)

    if (isNaN(numValue)) {
        return "Invalid Input";
    }

    if(!Number.isInteger(numValue)){
        return "Error: number must contain digits only)"
    }

    return null;

    }
    
// validate phone number

const validatePhone = (phoneNumber) => {

    let numError = validateNumber(phoneNumber);

        if(numError !== null){
            return (numError);
        }
   
    if (phoneNumber.trim().length !== 10) {

        return "Error: phone number length must be 10";

    }
    
    return null;
}





const contactManager = {
    contacts: [],

    addContact: function(userName,phoneNumber){

        return this.contacts.push({userName,phoneNumber});

    },

    viewContacts: function(){

         if (this.contacts.length === 0){
            alert ("No contacts available.");

        }else{

            let contactList = showInfo(this.contacts);
            alert(`Your Contacts:\n${contactList}`);
        }    
    },

    deleteContact: function(input){

        return this.contacts.splice(input,1);
    },

}



const userInput = (input) => {

    if(isNaN(input) || input < 1 || input > 5){
        alert("Invalid Input");
        return;
    }

// ADD CONTACT

    if(input === 1){

        let userName = prompt("Enter your name:");
    
         let nameError = validateName(userName);

        if (nameError !== null) {
            alert(nameError); 
            return;
        } 
        
        userName = userName.trim();
         
        let phoneNumber = prompt("Enter your phoneNumber:");

        let phoneError = validatePhone(phoneNumber);

        if(phoneError !== null){
            alert(phoneError);
            return;
        }

        phoneNumber = phoneNumber.trim();

        let message = confirm("Do you want to add this name and phone number");
                
        if (message){
            contactManager.addContact(userName, phoneNumber);
            alert("Contact added successfully");
        }
             
    }
                   
        
    // VIEW CONTACTS

    else if(input === 2){
            
        contactManager.viewContacts();
    }

    // REMOVE CONTACT

    else if(input === 3){

        if(contactManager.contacts.length === 0){

            alert("No contacts available");
            return;

        }

        let contactList = showInfo(contactManager.contacts);
        let indexInput = prompt(`${contactList}\nEnter the number of the contact you want to remove:`);

        let idxError = validateNumber(indexInput);

        if(idxError !== null){
            alert(idxError);
            return;
        }
        

        let removeContact = Number(indexInput);

       if (removeContact < 1 || removeContact > contactManager.contacts.length) {

            alert("Error: That contact number doesn't exist in your list."); 
            
        }else{

            let index = removeContact - 1;

             let message = confirm("Do you want to remove this contact");
                
                if (message){

                    contactManager.deleteContact(index);
                    return alert("Contact removed successfully");

                }else{

                    alert("deletion is cancelled");

                }
            }
        }

        // SEARCH CONTACTS

        else if (input === 4){

            if(contactManager.contacts.length === 0){

                alert("No contacts available");
                return;

            }

            let searchInfo = prompt("Enter the name");

            let searchError = validateName(searchInfo);

            if (searchError !== null) {
             alert(searchError); 
            return;
            }   

            let result = searchInfo.trim().toLowerCase();
                
            let counter = 1;
            let searchResult = "";
            for(let contact of contactManager.contacts){

                if (contact.userName.toLowerCase().includes(result)){

                searchResult += `${counter}. ${contact.userName}-${contact.phoneNumber}\n`;
                counter ++;

                }
            }
            
                if (searchResult === "") {
                    alert("No contacts found");           
                }else{
                    alert(`Your search result\n\n${searchResult}`);
                }
        } 
    

    // EXIT

    else{

        return "Exit";

    }

}

        

while(true){

    let contactList = showInfo(contactManager.contacts);


    let updatedList = contactManager.contacts.length === 0? "No contacts available":`Your Contacts:\n${contactList}`;

    let showOptions = `\nEnter your choice:\n1. Add Contact\n2. View All Contacts\n3. Delete Contact\n4. Search Contact\n5. Exit`

const value = prompt(updatedList + showOptions);

if (value === null || value.trim() === ""){
    console.log("Exiting out of system");
    break;
}else{
    let input = Number(value);

    let result = userInput(input);

    if (result === "Exit") {
        console.log("Exiting out of system");
        break;
    }

    let userRequest = confirm("Do you want to continue?");
    if(userRequest === false){
        break;
    }
}

} 