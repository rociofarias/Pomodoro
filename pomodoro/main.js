const tasks=[];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

renderTime();
renderTasks();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(itTask.value !== ''){
        createTask(itTask.value);
        itTask.value ='';
        renderTasks();
    }
});

function createTask(value){
const newTask ={
    id: (Math.random() *100).toString(36).slice(2),
    title: value,
    completed: false,
};

tasks.unshift(newTask);
}

function renderTasks(){
    const html = tasks.map((task) =>{
        return `
        <div class= "task">
        <div class= "completed">${task.completed ? "<span class='done'>Finalizado!</span>" : `<button class="start-button" data-id="${task.id}">Inicio</button>`}</div>
    
        <div class= "title">${task.title}</div>
        </div>
        `;
    });

   const tasksContainer = document.querySelector("#tasks");
   tasksContainer.innerHTML=html.join(""); 

   const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", ()  =>{
            if(!timer){
                startButtonHandler(startButton.getAttribute("data-id"));  
                startButton.textContent ='En progreso...';
            }
        });
   });
}

function startButtonHandler(id){
    time = 25*60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);

    timer =setInterval(() =>{
        timerHandler(id);
    },1000);
}

function timerHandler(id = null){
    time--;
    renderTime();

    if(time === 0){
        markComplete(id);
        clearInterval(timer);
        timer = null;
        renderTasks();
        startBreak();
    }
}


function markComplete(id){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak(){
time = 5*60;
document.querySelector("#time #taskName").textContent = "Descanso";
timerBreak = setInterval(timerBreakHanlder,1000);
}

function timerBreakHanlder(){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        document.querySelector("#time #taskName").textContent = "";
        renderTime();
    }
}
function renderTime(){
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time /60);
    const seconds = parseInt(time %60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
