
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

// Shows a Modals When the Information button is clicked...............
const openModal = (id) => {

    document.getElementById("word-details").showModal()

    const url2 = `https://openapi.programming-hero.com/api/word/${id}`

    fetch(url2)
        .then(res => res.json())
        .then(particular => {
            console.log(particular.data.synonyms)

            const modalContainer = document.getElementById("word-details-container");

            modalContainer.innerHTML = `
            <h2 class="text-3xl font-bold">${particular.data.word} (${particular.data.pronunciation})</h2>
            <div>
                <h4 class="text-xl font-semibold">Meaning</h4>
                <p class="text-lg text-gray-700">${particular.data.meaning}</p>
            </div>
            <div>
                <h4 class="text-xl font-semibold">Example</h4>
                <p class="text-lg text-gray-700">${particular.data.sentence}</p>
            </div>

            <div>
                <h4 class="text-lg font-semibold mb-2">সমার্থক শব্দ গুলো</h4>
                <div>
                    ${particular.data.synonyms.map(item => `
                        <button class="btn bg-[#D7E4EF] border-none">${item}</button>     
                    `).join("")}
                </div>
            </div>
            `
        }
    )
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

    // If there is NO content in Lessons --------
    if (info.length == 0) {
        const lessonsDiv1 = document.createElement("div");

        // To move the content to the middle of the lessonsContainer we have to remove "grid" and add "flex"-------------------------------
        lessonsContainer.classList.remove("grid"); 
        lessonsContainer.classList.add("flex", "justify-center", "items-center", "min-h-[300px]");


        lessonsDiv1.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center min-h-[300px]">

                <img src="assets/alert-error.png" alt="">
                <p class="text-sm text-center my-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl text-center text-black font-bold">নেক্সট Lesson এ যান</p>
            </div>
        `
        lessonsContainer.append(lessonsDiv1)
    }

    // If there is Content in Info ------------
    else {
        for (let details of info) {
            const lessonsDiv2 = document.createElement("div");

            // To aligned the cards we have to grid all the items and remove the "flex"------
            lessonsContainer.classList.remove("flex", "justify-center", "items-center", "min-h-[300px]");
            lessonsContainer.classList.add("grid"); // remove grid


            lessonsDiv2.innerHTML = `
            <div class="card bg-base-100 h-80">
                <div class="card-body">

                    <h2 class="text-2xl text-center font-bold">${details.word}</h2>

                    <p class="font-medium text-sm text-center">Meaning/Pronunciation</p>

                    <p class="font-semibold text-xl text-center text-gray-500">${details.meaning}/${details.pronunciation}</p>

                    <div class="mt-7 flex justify-between">
                        <button onclick="openModal(${details.id})" class="btn bg-[#d6e7f4]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#d6e7f4]"><i class="fa-solid fa-volume-up"></i></button>
                    </div>
                </div>
            </div>
        `;

        lessonsContainer.append(lessonsDiv2)
        }
    }
}


loadLessonButtons();
