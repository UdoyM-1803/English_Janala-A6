// Call the EventListener if the "Get Started" button clicked.

document.getElementById("get-in-btn")
    .addEventListener('click', function(event) {
        event.preventDefault();

        // Get the name form the given Form-------
        const name = document.getElementById("name-field").value;

        // Get the login Code form the given Form ----
        const password = document.getElementById("password-field").value;


        // Name and Password Validation .............
        if (name.length !== 0) {
            if (password === "123456") {

                const hideElements = document.querySelectorAll('.hide-me');
                
                hideElements.forEach(el => {
                    el.classList.remove('hide-me');
                })
                
                document.getElementById("name-field").value = '';
                document.getElementById("password-field").value = '';

                document.getElementById("banner-section").classList.add("hidden");
                
                alert("Welcome, You have entered Successfully");
            }
            else {
                alert("Enter the Correct Login Code...");
            }
        }
        else {
            alert("Please, Enter your Name Correctly..");
        }

    })