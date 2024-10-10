const { response } = require("express");

//initialize callback function to handle new user sign ups
const newUser = async function handleNewUserCreation(event) {
    event.preventDefault();

    const email = document.querySelector(`#Sign-up-Email`).value.trim();
    const password = document.querySelector(`#Sign-up-Password`).value.trim();
    const rePass = document.querySelector(`#Sign-up-RePass`).value.trim();
    console.log(password, rePass);
    
    const validPassword = (password == rePass);

    //ensure that all fields were filled in, then add to stored user database
    if(email && password && rePass && validPassword){
        const response = await fetch(`/api/user/sign-up`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        console.log('sanity check for console log print');
        
        //if data is succesfully stored in database then return to homepage
        if (response.ok){
            console.log('user sign up successful');
            document.location.replace('/sign-up', '/login');
            
            //else return to sign up page with instructions to fill out sections within the desired params
        }else {
            console.log(response);
            
            console.log("sign up failed due to unmet requirements")
            window.alert('One or more fields do not meet requirements');
            //document.location.replace('/sign-up');
        }
        console.log(response);
        }else{
            console.log('sign up failed');
            window.alert('sign up failed, passwords do not match and or a field was left blank');
        }
    };

//call function when submit button is pressed
document.querySelector('#Sign-up-Submit').addEventListener('click', newUser);


