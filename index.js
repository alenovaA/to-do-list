let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let uncompletedTasks = document.getElementById('uncomleted-tasks');
let completedTasks = document.getElementById('comleted-tasks');


function createNewElement(task, finished) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');

    if(finished){
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    }else {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    }

    let label = document.createElement('label');
    label.innerText = task;
    let input = document.createElement('input');
    input.type = "text";
    let editButton = document.createElement('button');
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    let deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;
}

function addTask() {
    if (inputTask.value) {
        let listItem = createNewElement(inputTask.value, false);
        uncompletedTasks.appendChild(listItem);
        bindTaskEvents(listItem, completeTask)
        inputTask.value = "";
    }
    save();
}
addButton.onclick = addTask;

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function editTask() {
    console.log(2);
    let editButton = this;
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');

    let containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
        save();
    } else {
        input.value = label.innerText;
        editButton.className = "material-icons save";
        editButton.innerHTML = "<i class='material-icons'>save</i>";

    }
    listItem.classList.toggle('editMode');
}

function completeTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, uncompleteTask);
    save();
}

function uncompleteTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";

    uncompletedTasks.appendChild(listItem);
    bindTaskEvents(listItem, completeTask);
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}
function save() {

    let uncompletedTasksArr = [];
    for (let i = 0; i < uncompletedTasks.children.length; i++) {
        uncompletedTasksArr.push(uncompletedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    let completedTasksArr = [];
    for (let i = 0; i < completedTasks.children.length; i++) {
        completedTasksArr.push(completedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        uncompletedTasks: uncompletedTasksArr,
        completedTasks: completedTasksArr
    }));

}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}

let data=load();

for(let i=0; i<data.uncompletedTasks.length;i++){
    let listItem=createNewElement(data.uncompletedTasks[i], false);
    uncompletedTasks.appendChild(listItem);
    bindTaskEvents(listItem, completeTask);
}

for(let i=0; i<data.completedTasks.length; i++){
    let listItem=createNewElement(data.completedTasks[i], true);
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, uncompleteTask);
}
