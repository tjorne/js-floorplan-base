// --- DOM refs ---
const floorUpBtn = document.querySelector("#floorUp");
const floorDownBtn = document.querySelector("#floorDown");
const floorSelect = document.querySelector("#floorSelect");

const floors = document.querySelectorAll(".floor");

const markersEl = document.querySelector("#markers");

// --- State ----
const MIN_FLOOR = 0;
const MAX_FLOOR = 5;

let currentFloor = Number(floorSelect.value);

let rooms = [];

// --- Rendering ---
function render() {
    renderFloors();
    renderMarkers();
}

function renderFloors() {
    floors.forEach(img => {
        const floorNumber = Number(img.dataset.floor);
        img.classList.toggle("is-active", floorNumber === currentFloor);
    });
}

function renderMarkers() { }


// --- Events ---
floorDownBtn.addEventListener("click", () => {
    currentFloor = Math.max(MIN_FLOOR, currentFloor - 1);
    floorSelect.value = currentFloor;
    renderFloors();
});



// --- functions ---
function createMarker(room) {
    const marker = document.createElement("button");

    marker.type = "button";
    marker.className = "marker";

    marker.style.left = room.xPct + "%";
    marker.style.top = room.yPct + "%";

    marker.dataset.roomId = room.id;
    marker.dataset.label = room.label;

    return marker;
}



async function init(){
    try {
        const res = await fetch("../data/rooms.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        rooms = await res.json();
    } catch (err) {
        console.error("Could not load rooms.json, using fallback.", err);
        rooms = [
            { id: "001", floor: 0, label: "Room 001", xPct: 20, yPct: 60 },
            { id: "301", floor: 3, label: "Room 301", xPct: 62, yPct: 28 },
        ];
    }

    render();
}

init();