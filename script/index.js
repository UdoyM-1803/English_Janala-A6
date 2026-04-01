
// Fetched the first API
const loadLessonButtons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        //2. Convert promise to json
        .then(res => res.json())
        //3. Send data to displayLearningButtons() function
        .then(information => displayLearningButtons(information.data))
}




function displayLearningButtons(levels) {
    // Get the Container...
    const buttonContainer = document.getElementById("lesson-button-container");

    // Running the for of loop operation on coming Array of Objects.
    for (let level of levels) {
        const buttonsDiv = document.createElement("div")

        // Creates Buttons.......
        buttonsDiv.innerHTML = `
        <button id="btn-${level.id}" class="btn btn-outline border-1 btn-primary border-2 group font-semibold"><span><img src="assets/fa-book-open.png" class="transition group-hover:invert group-hover:brightness-0"></span>
        Lesson -${level.level_no}
        </button>
        `;
        buttonContainer.append(buttonsDiv);
    }
}

loadLessonButtons();