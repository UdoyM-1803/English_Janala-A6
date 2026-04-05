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


function scrollToSection(id) {
    const target = document.getElementById(id);
    const start = window.pageYOffset;
    const end = target.offsetTop;

    const distance = end - start;
    const duration = 1000; // 1 second

    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        let progress = timeElapsed / duration;

        progress = Math.min(progress, 1); // prevent overflow

        const ease = easeInOut(progress);

        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOut(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animation);
}
