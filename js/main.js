let input = document.querySelector('#task-text');
let tasksContainer = document.querySelector('.tasks-container');
let submit = document.querySelector('#add');

let arrayOfTasks=[];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

submit.onclick = function() {
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value="";
    }
};

function addTaskToArray(taskText) {
    const task={
        id: Date.now(),
        content: taskText,
        completed: false
    }
    arrayOfTasks.push(task);
    addTaskToContainer(arrayOfTasks);
    addTaskToStorage(arrayOfTasks);
}

function addTaskToContainer(arrayOfTasks){
    tasksContainer.innerHTML="";
    arrayOfTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = `task ${task.completed ? "completed" : ""}`;
        div.setAttribute("data-id", task.id);
        div.innerHTML = `
            <p>${task.content}</p>
            <button class="btn done" data-id="${task.id}" onclick="compeletedTask(this.getAttribute('data-id'))" ><i class="fa-regular fa-circle-check"></i></button>
            <button class="btn del" data-id="${task.id}"  onclick="deleteTask(this.getAttribute('data-id'))" ><i class="fa-solid fa-trash"></i></button>
        `;
        tasksContainer.appendChild(div);
    });
}

function addTaskToStorage(arrayOfTasks){
    localStorage.setItem('tasks',JSON.stringify(arrayOfTasks))
}

getDataFromStorage();

function getDataFromStorage(){
    let data = localStorage.getItem('tasks');
    if(data){
        let tasks= JSON.parse(data);
        addTaskToContainer(tasks);
    }
}

function compeletedTask(taskId){
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            if(arrayOfTasks[i].completed){
                arrayOfTasks[i].completed=false;
            }
            else{
                arrayOfTasks[i].completed=true;
            }
            addTaskToContainer(arrayOfTasks)  
            addTaskToStorage(arrayOfTasks); 
        }
    }
}

function deleteTask(taskId){
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id==taskId) {
            console.log('yes')
            arrayOfTasks.pop(i);
            addTaskToContainer(arrayOfTasks);
            addTaskToStorage(arrayOfTasks); 
        }
    }
}
