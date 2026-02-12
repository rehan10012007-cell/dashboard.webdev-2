const eventTitle = document.querySelector("input[type='text']");
const eventDate = document.querySelector("input[type='date']");
const category = document.querySelector("select");
const description = document.querySelector("textarea");

const addBtn = document.querySelector(".primary-btn");
const clearBtn = document.querySelectorAll(".secondary-btn")[0];
const sampleBtn = document.querySelectorAll(".secondary-btn")[1];

const eventsContainer = document.querySelector(".large-card");
const demoBox = document.querySelector(".demo-box");

document.addEventListener("DOMContentLoaded", loadEvents);

addBtn.addEventListener("click", function () {
    if (eventTitle.value === "" || eventDate.value === "") {
        alert("Please fill required fields!");
        return;
    }

    const event = {
        title: eventTitle.value,
        date: eventDate.value,
        category: category.value,
        description: description.value
    };

    addEventToDOM(event);
    saveEvent(event);

    eventTitle.value = "";
    eventDate.value = "";
    description.value = "";
});

sampleBtn.addEventListener("click", function () {
    const sampleEvents = [
        {
            title: "Tech Conference",
            date: "2026-03-15",
            category: "Conference",
            description: "Annual tech meetup"
        },
        {
            title: "Web Workshop",
            date: "2026-04-10",
            category: "Workshop",
            description: "Frontend development workshop"
        }
    ];

    sampleEvents.forEach(event => {
        addEventToDOM(event);
        saveEvent(event);
    });
});

clearBtn.addEventListener("click", function () {
    localStorage.removeItem("events");
    location.reload();
});

function addEventToDOM(event) {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-item");

    eventCard.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <button class="delete-btn">Delete</button>
        <hr>
    `;

    eventsContainer.appendChild(eventCard);

    eventCard.querySelector(".delete-btn").addEventListener("click", function () {
        eventCard.remove();
        removeFromStorage(event);
    });
}

function saveEvent(event) {
    let events = localStorage.getItem("events")
        ? JSON.parse(localStorage.getItem("events"))
        : [];

    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

function loadEvents() {
    let events = localStorage.getItem("events")
        ? JSON.parse(localStorage.getItem("events"))
        : [];

    events.forEach(event => addEventToDOM(event));
}

function removeFromStorage(eventToRemove) {
    let events = JSON.parse(localStorage.getItem("events"));

    events = events.filter(event =>
        event.title !== eventToRemove.title ||
        event.date !== eventToRemove.date
    );

    localStorage.setItem("events", JSON.stringify(events));
}

document.addEventListener("keydown", function (e) {
    demoBox.textContent = `You Pressed ${e.key}`;
});
