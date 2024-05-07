

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to the JSON file that will store the tasks
const filePath = path.join(__dirname, 'tasks.json');

// Ensure data file exists or create an empty one
const initializeTasksFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
    }
};

// Read tasks from the file
const readTasks = () => {
    const tasks = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(tasks);
};

// Write tasks to the file
const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 4), 'utf8');
};

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Main menu function
const mainMenu = () => {
    rl.question('\nSelect an option:\n1. Add a new task\n2. View list of tasks\n3. Mark a task as complete\n4. Remove a task\n5. Exit\n\n', (answer) => {
        switch (answer) {
            case '1':
                rl.question('Enter the task description: ', (taskDesc) => {
                    addTask(taskDesc);
                });
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                rl.question('Enter the index of the task to mark as complete: ', (index) => {
                    markTaskAsComplete(parseInt(index));
                });
                break;
            case '4':
                rl.question('Enter the index of the task to remove: ', (index) => {
                    removeTask(parseInt(index));
                });
                break;
            case '5':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
        }
    });
};

// Function to add a task
const addTask = (description) => {
    const tasks = readTasks();
    tasks.push({ description, completed: false });
    writeTasks(tasks);
    console.log('Task added successfully.');
    mainMenu();
};

// Function to view all tasks
const viewTasks = () => {
    const tasks = readTasks();
    tasks.forEach((task, index) => {
        console.log(`${index}: ${task.description} - ${task.completed ? 'Completed' : 'Pending'}`);
    });
    mainMenu();
};

// Function to mark a task as complete
const markTaskAsComplete = (index) => {
    const tasks = readTasks();
    if (tasks[index]) {
        tasks[index].completed = true;
        writeTasks(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Task index not found.');
    }
    mainMenu();
};

// Function to remove a task
const removeTask = (index) => {
    const tasks = readTasks();
    if (tasks[index]) {
        tasks.splice(index, 1);
        writeTasks(tasks);
        console.log('Task removed successfully.');
    } else {
        console.log('Task index not found.');
    }
    mainMenu();
};

// Initialize file and show the main menu
initializeTasksFile();
mainMenu();
