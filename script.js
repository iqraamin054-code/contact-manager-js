// Contact Manager Project


const showInfo = (contacts) => {

            let counter = 1;
            let contactList = "";
            for(let info of contacts){

                contactList += `${counter}. ${info.userName}-${info.phoneNumber}\n`;
                
                counter ++;
            }

           return contactList;

        }

// validation for string
const validateName = (input) =>{

    if(input === null || input.trim() === ""){

        return "You did not enter anything";

    }
    if (!isNaN(input)) {

        return "Error: Number cannot be used as name";

    }
    return null;

}

// validation for number
const validateNumber = (input) =>{

     if(input === null || input.trim() === ""){
        
        return "You did not enter anything";
                               
    }else if (isNaN(input)) {

        return "Error: letter cannot be used in phone number";
      
    }else{

    let value = Number(input);

    if (!Number.isInteger(value)) {
                 
        return alert("Error: phone number must be in integer (not decimal)");

        }
    }
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

        
         let error = validateName(userName);

        if (error !== null) {
            alert(error); 
            return;
        }   
         
        let phoneNumber = prompt("Enter your phoneNumber:");

        // !phoneNumber check for both null and empty string

            if(phoneNumber === null || phoneNumber.trim() === ""){
                return alert("You did not enter anything");
                               
            }else if (isNaN(phoneNumber)) {

                return alert("Error: letter cannot be used in phone number");
      
            }else if (phoneNumber.length !== 10) {

                 return alert("Error: phone number length must be 10");

                }

                let userPhoneNumber = Number(phoneNumber);

                if (!Number.isInteger(userPhoneNumber)) {
                 
                    return alert("Error: phone number must be in integer (not decimal)");

                }

                     validateName(userName);
                
                    let message = confirm("Do you want to add this name and phone number");
                
                    if (message){
                        contactManager.addContact(userName,userPhoneNumber);
                        alerSt("Contact added successfully");
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
        let value = prompt(`${contactList}\nEnter the number of the contact you want to remove:`);

        if(value === null || value.trim() === ""){

           return alert("You did not enter anything");

        }
          
        let removeContact = Number(value);

        if(isNaN(removeContact)){

            return alert("Invalid Input");

        }else if (!Number.isInteger(removeContact)) {

            return alert("Error: number must be in integer (not decimal)");
            
        } else if (removeContact < 1 || removeContact > contactManager.contacts.length) {

            alert("Error: That contact number doesn't exist in your list."); 
            
        }else{

            let index = removeContact - 1;

             let message = confirm("Do you want to remove this contact");
                
                if (message){

                    contactManager.deleteContact(index);
                    return alert("Contacts are succesfully removed");

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

            if(searchInfo === null || searchInfo.trim() === ""){

                return alert("You did not enter anything");

            }else if (!isNaN(searchInfo)) {

                return alert("Invalid input: number cannot be used as name ");
                
            }else{

                let result = searchInfo.trim().toLowerCase();
                

            let counter = 1;
            let contactList = "";
            for(let info of contactManager.contacts){

                if (info.userName.toLowerCase().includes(result)){

                contactList += `${counter}. ${info.userName}-${info.phoneNumber}\n`;
                counter ++;

                }
            }
            if (contactList === "") {
                alert("No contacts found");           
            }else{
                alert(`Your search result\n${contactList}`);
            }
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