const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
const prioritySelect = document.getElementById("priority-select");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

// JavaScript to display the digital clock
function updateDigitalClock() {
    const clockElement = document.getElementById("digital-clock");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
}

// Update the clock every second
setInterval(updateDigitalClock, 1000);

// Initialize the clock immediately
updateDigitalClock();

document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form submission
    
    const taskInput = document.getElementById("todo-input");
    const prioritySelect = document.getElementById("priority-select");
    
    const taskText = taskInput.value;
    const priority = prioritySelect.value;
    
    if (taskText.trim() !== "") {
        addTask(taskText, priority);  // Add the task with selected priority
        taskInput.value = "";  // Clear input after adding
    }
});

function addTask(text, priority) {
    const todoList = document.getElementById("todo-list");

    // Create a new task element
    const li = document.createElement("li");
    li.classList.add("todo", priority);  // Add the priority class to the task
    
    li.innerHTML = `
        <label for="todo-${Date.now()}" class="todo-text">${text}</label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;
    
    // Append the new task to the list
    todoList.appendChild(li);
    
    // Add delete functionality
    li.querySelector(".delete-button").addEventListener("click", function() {
        todoList.removeChild(li);
    });
}

// Handle adding Todo in localStorage
function addTodo() {
    const todoText = todoInput.value.trim();
    const priority = prioritySelect.value;  // Get selected priority

    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false,
            priority: priority  // Store priority with todo
        }

        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo " + todo.priority;  // Apply the priority class
    
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;

    return todoLI;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

// Array of inspirational quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "The best way to predict your future is to create it. - Abraham Lincoln",
    "It always seems impossible until it's done. - Nelson Mandela"
];

// Function to get a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quote");
    quoteElement.textContent = quotes[randomIndex];
}

// Call the function to display a random quote when the page loads
window.onload = displayRandomQuote;

