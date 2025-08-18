// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () =>{
    // Get references to DOM elements
    const todoInput = document.getElementById("todo-input")
    const addTaskbutton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    // Retrieve tasks from localStorage or initialize as empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render all tasks from localStorage on page load
    tasks.forEach(task => renderTask(task));

    // Add event listener for the Add Task button
    addTaskbutton.addEventListener('click', () =>{
        const taskText = todoInput.value.trim() // Get and trim input value
        if(taskText === "") // Prevent adding empty tasks
            return;

        const newTask = {
            id: Date.now(), // Unique ID based on timestamp
            text: taskText, // Task description
            completed: false // Task completion status
        }

        tasks.push(newTask) // Add new task to the array
        saveTask() // Save updated tasks to localStorage
        todoInput.value = "" // Clear input field
        console.log(tasks) // Debug: log current tasks
    })

    function renderTask(task){
        // TODO: Implement rendering logic for displaying a task in the DOM
        console.log(task) // Debug: log task being rendered
    }

    function saveTask(){
        // Save the current tasks array to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})