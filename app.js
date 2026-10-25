const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-button');
const incompleteTaskHolder = document.getElementById('todo-list');
const completedTasksHolder = document.getElementById('completed-list');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task-item';

  label.innerText = taskString;
  label.className = 'task-label';

  checkBox.type = 'checkbox';

  editInput.type = 'text';
  editInput.className = 'task-input edit-input';

  editButton.innerText = 'Edit';
  editButton.className = 'edit-button';

  deleteButton.className = 'delete-button';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete task';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value.trim());
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskStatus);
  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.edit-input');
  const label = listItem.querySelector('.task-label');
  const editButton = listItem.querySelector('.edit-button');
  const isEditMode = listItem.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTaskStatus = function (event) {
  const listItem = this.parentNode;
  const isCompleted = event.target.checked;

  const targetList = isCompleted ? completedTasksHolder : incompleteTaskHolder;

  targetList.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskStatus);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector('.edit-button');
  const deleteButton = taskListItem.querySelector('.delete-button');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], toggleTaskStatus);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], toggleTaskStatus);
}
