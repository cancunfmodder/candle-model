/* =========================
   DATA
========================= */

const models = [];

for (let i = 1; i <= 15; i++) {
    models.push({
        name: `Model ${i}`,
        image: `images/models/model${i}.jpg`
    });
}


const colors = [
    {
        name: "Alb",
        image: "images/colors/alb.jpg"
    },
    {
        name: "Roșu",
        image: "images/colors/rosu.jpg"
    },
    {
        name: "Roz",
        image: "images/colors/roz.jpg"
    },
    {
        name: "Albastru",
        image: "images/colors/albastru.jpg"
    },
    {
        name: "Verde",
        image: "images/colors/verde.jpg"
    },
    {
        name: "Galben",
        image: "images/colors/galben.jpg"
    },
    {
        name: "Mov",
        image: "images/colors/mov.jpg"
    },
    {
        name: "Portocaliu",
        image: "images/colors/portocaliu.jpg"
    },
    {
        name: "Negru",
        image: "images/colors/negru.jpg"
    },
    {
        name: "Bej",
        image: "images/colors/bej.jpg"
    }
];


const perfumes = [];

for (let i = 1; i <= 20; i++) {
    perfumes.push({
        name: `Parfumul ${i}`,
        image: `images/perfumes/parfum${i}.jpg`
    });
}


/* =========================
   SELECTIONS
========================= */

let selectedModel = null;
let selectedColor = null;
let selectedPerfume = null;

let currentScreen = 1;


/* =========================
   CREATE ITEMS
========================= */

function createItems(list, containerId, type) {

    const container = document.getElementById(containerId);

    list.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span class="item-name">${item.name}</span>
        `;

        div.onclick = () => {

            // Remove previous selection
            container.querySelectorAll(".item").forEach(el => {
                el.classList.remove("selected");
            });

            // Select this item
            div.classList.add("selected");

            if (type === "model") {
                selectedModel = item;
            }

            if (type === "color") {
                selectedColor = item;
            }

            if (type === "perfume") {
                selectedPerfume = item;
            }
        };

        container.appendChild(div);
    });
}


/* =========================
   LOAD ITEMS
========================= */

createItems(models, "models", "model");
createItems(colors, "colors", "color");
createItems(perfumes, "perfumes", "perfume");


/* =========================
   SCREEN NAVIGATION
========================= */

function showScreen(number) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(`screen${number}`).classList.add("active");

    currentScreen = number;

    window.scrollTo(0, 0);
}


function nextScreen() {

    if (currentScreen === 1 && !selectedModel) {
        alert("Te rog alege un model.");
        return;
    }

    if (currentScreen === 2 && !selectedColor) {
        alert("Te rog alege o culoare.");
        return;
    }

    if (currentScreen === 3 && !selectedPerfume) {
        alert("Te rog alege un parfum.");
        return;
    }


    if (currentScreen === 3) {
        showFinalResult();
        showScreen(4);
        return;
    }

    showScreen(currentScreen + 1);
}


function previousScreen() {

    if (currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
}


/* =========================
   FINAL RESULT
========================= */

function showFinalResult() {

    document.getElementById("finalModel").textContent =
        selectedModel.name;

    document.getElementById("finalColor").textContent =
        selectedColor.name;

    document.getElementById("finalPerfume").textContent =
        selectedPerfume.name;


    /*
       Example filename:

       model1_alb_parfum1.jpg

       Make sure your final images use
       this exact naming system.
    */

    const modelNumber =
        models.indexOf(selectedModel) + 1;

    const colorName =
        getColorFileName(selectedColor.name);

    const perfumeNumber =
        perfumes.indexOf(selectedPerfume) + 1;


    const finalFile =
        `images/final/model${modelNumber}_${colorName}_parfum${perfumeNumber}.jpg`;


    document.getElementById("finalImage").src = finalFile;


    // If the exact image doesn't exist
    document.getElementById("finalImage").onerror = function () {

        this.src = "images/final/placeholder.jpg";

        console.log(
            "Missing image:",
            finalFile
        );
    };
}


/* =========================
   COLOR FILENAMES
========================= */

function getColorFileName(color) {

    const names = {
        "Alb": "alb",
        "Roșu": "rosu",
        "Roz": "roz",
        "Albastru": "albastru",
        "Verde": "verde",
        "Galben": "galben",
        "Mov": "mov",
        "Portocaliu": "portocaliu",
        "Negru": "negru",
        "Bej": "bej"
    };

    return names[color];
}


/* =========================
   RESTART
========================= */

function restart() {

    selectedModel = null;
    selectedColor = null;
    selectedPerfume = null;

    document.querySelectorAll(".item").forEach(item => {
        item.classList.remove("selected");
    });

    showScreen(1);
}
