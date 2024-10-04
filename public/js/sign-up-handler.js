//initialize callback function to handle new user sign ups
const newUser = async (event) => {
    event.preventDefault();

    const email = document.querySelector(`#Sign-up-Email`).value.trim();
    const user = document.querySelector(`#Sign-up-Username`).value.trim();
    const password = document.querySelector(`#Sign-up-Password`).value.trim();
    const rePass = document.querySelector(`#Sign-up-RePass`).value.trim();

    //ensure that all fields were filled in, then add to stored user database
    if(email && user && password && rePass){
        const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({email, user, password, rePass }),
            headers: {'Content-Type': 'application/json'},
        });

        //if data is succesfully stored in database then return to homepage
        if (response.ok){
            document.location.replace('/homepage');
        //else return to sign up page with instructions to fill out sections within the desired params
        }else {
            document.location.replacce('/sign-up');
        }
    }
};

//call function when submit button is pressed
document.querySelector('#Sign-up-Submit').addEventListener('submit', newUser);


