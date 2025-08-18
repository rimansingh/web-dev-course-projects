document.addEventListener('DOMContentLoaded', () =>{
    const todoInput = document.getElementById("todo-input")
    const addTaskbutton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTask(task));

    addTaskbutton.addEventListener('click', () =>{
        const taskText = todoInput.value.trim()
        if(taskText === "")
            return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(newTask)
        saveTask()
        renderTask(newTask);
        todoInput.value = ""
        console.log(tasks)
    })

    function renderTask(task) {
        // Create a new list item for the task
        const li = document.createElement('li');
    
        // If the task is completed, add a special class for styling
        if (task.completed) {
            li.classList.add("completed");
        }
    
        // Set a unique identifier for the task (not strictly needed for this simple version)
        li.setAttribute('data-id', task.id);
    
        // Create a span to show the task text
        const span = document.createElement('span');
        span.textContent = task.text;
    
        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
    
        // When you click the task (not the button), toggle completed status
        li.addEventListener('click', function(e) {
            if (e.target === deleteBtn) return; // Don't toggle if delete button is clicked
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTask();
        });
    
        // When you click the delete button, remove the task
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the li click event
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTask();
        });
    
        // Add the text and button to the list item
        li.appendChild(span);
        li.appendChild(deleteBtn);
    
        // Add the list item to the todo list
        todoList.appendChild(li);
    }

    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})