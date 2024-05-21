
function formatDate(){
    const full_date = new Date();
    const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days_of_week[full_date.getDay()];

    const date = full_date.getDate().toString().padStart(2,0);
    const month = (full_date.getMonth()+1).toString().padStart(2,0);
    const year = full_date.getFullYear().toString();

    const format_date = `${day} ${date}-${month}-${year}`;
    return format_date;
}

function formatTime(){
    const full_date = new Date();
    const hours_24_format = full_date.getHours();
    const minutes = full_date.getMinutes().toString().padStart(2,0);
    
    let ampm;
    if (hours_24_format>=12) {
        ampm = "PM";
    }
    else{
        ampm = "AM";
    }

    let hours = hours_24_format;
    if (hours_24_format>12) {
        hours = hours_24_format - 12;
    }

    hours = hours.toString().padStart(2,0);
    
    const full_time = `${hours}:${minutes} ${ampm}`
    return full_time;
}

const card__add_task = document.getElementById("card__add-task");
const task_input = document.getElementById("task-input");
const add_button = document.getElementById("add-button");
const card__functions = document.getElementById("card__functions");

const task_input_border_color = task_input.style.borderColor;
const task_input_placeholder = task_input.placeholder;

const header_date = document.getElementById("title-date");
header_date.innerHTML = formatDate();

task_input.addEventListener("keypress", function(e){
    if (e.key === "Enter") {        
        addTask();
    }
});

function addTask(){
    if (task_input.value === '') {
        task_input.placeholder = "Please write something!";
        task_input.style.borderColor = "red";
    }

    else{
        const data_field = document.createElement("div");
        data_field.className = 'card__data-field';
        card__functions.appendChild(data_field);

        const card__data_date_time = document.createElement("div");
        card__data_date_time.className = "card__data--date-time";
        data_field.appendChild(card__data_date_time);

        data_field.tabIndex=0;
        

        const card__data_date = document.createElement("div");
        card__data_date.className = "card__data--date";
        card__data_date.innerHTML = formatDate();
        card__data_date_time.appendChild(card__data_date);

        const card__data_time = document.createElement("div");
        card__data_time.className = "card__data--time";
        card__data_time.innerHTML = formatTime();
        card__data_date_time.appendChild(card__data_time);

        const card__data_activities = document.createElement("div");
        card__data_activities.className = "card__data--activities";
        card__data_activities.innerHTML = task_input.value;
        data_field.appendChild(card__data_activities);

        const card__data_action = document.createElement("div");
        card__data_action.className = "card__data--action";
        data_field.appendChild(card__data_action);

        const card__icon_pin = document.createElement("div");
        card__icon_pin.className = "card__icon--pin";
        card__icon_pin.innerHTML = "Pin";
        card__data_action.appendChild(card__icon_pin);

        const card__icon_edit = document.createElement("div");
        card__icon_edit.className = "card__icon--edit";
        card__icon_edit.innerHTML = "Edit";
        card__data_action.appendChild(card__icon_edit);

        const card__icon_remove = document.createElement("div");
        card__icon_remove.className = "card__icon--remove";
        card__icon_remove.id = "card__icon--remove";
        card__icon_remove.innerHTML = "Remove";
        card__data_action.appendChild(card__icon_remove);

        document.addEventListener("focus", function(){
            card__icon_remove.style.display = 'grid';
        });

        card__icon_remove.addEventListener("click",function(e){
            data_field.remove();
            saveData();
        });
    }
    
    task_input.value = "";
    saveData();
}



document.addEventListener("click", function(e) {
    if (e.target.tagName != "BUTTON") {
        task_input.placeholder = task_input_placeholder;
        task_input.style.borderColor = task_input_border_color;
    }
});

function saveData(){
    localStorage.setItem("data", card__functions.innerHTML);
}

function showData(){
    card__functions.innerHTML = localStorage.getItem("data");

    const removeButtons = document.querySelectorAll(".card__icon--remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            button.parentElement.parentElement.remove();
            saveData();
        });
    });
}

showData();