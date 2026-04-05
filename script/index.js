
// Fetched the first API
const loadLessonButtons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        //2. Convert promise to json
        .then(res => res.json())
        //3. Send data to displayLearningButtons() function
        .then(information => displayLearningButtons(information.data))
}

// Remove the Active Class from all buttons
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("active");

    for (let button of buttons) {
        button.classList.remove("active");
    }
}

// Fetched API for bring those lessons
const loadLessons = (level, id) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`

    fetch(url)
        .then(res => res.json())
        .then(info => {

            removeActiveClass();

            const clickedButton = document.getElementById(`btn-${id}`);

            clickedButton.classList.add("active");


            displayLessons(info.data)
        })
    
}


// For displaying the Learning Buttons.
function displayLearningButtons(levels) {
    // Get the Container...
    const buttonContainer = document.getElementById("lesson-button-container");

    // Running the for of loop operation on coming Array of Objects.
    for (let level of levels) {
        const buttonsDiv = document.createElement("div")

        // Creates Buttons.......
        buttonsDiv.innerHTML = `
        <button onclick="loadLessons(${level.level_no},${level.id})" id="btn-${level.id}" class="btn btn-outline border-1 btn-primary border-2 group font-semibold"><span><img src="assets/fa-book-open.png" class="transition group-hover:invert group-hover:brightness-0"></span>
        Lesson -${level.level_no}
        </button>
        `;
        buttonContainer.append(buttonsDiv);
    }
}


// Function for displaying Lessons ------
function displayLessons(info) {

    // Showing Details to Lesson Cards---------
    const lessonsContainer = document.getElementById("lesson-container");

    lessonsContainer.innerHTML = "";

    for (let details of info) {
        const lessonsDiv = document.createElement("div");

        lessonsDiv.innerHTML = `
        <div class="card bg-base-100 h-80">
            <div class="card-body">

                <h2 class="text-2xl text-center font-bold">${details.word}</h2>

                <p class="font-medium text-sm text-center">Meaning/Pronunciation</p>

                <p class="font-semibold text-xl text-center text-gray-500">${details.meaning}/${details.pronunciation}</p>

                <div class="mt-7 flex justify-between">
                    <button class="btn bg-[#d6e7f4]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#d6e7f4]"><i class="fa-solid fa-volume-up"></i></button>
                </div>
            </div>
        </div>
        `;
        lessonsContainer.append(lessonsDiv)
    }
}



loadLessonButtons();