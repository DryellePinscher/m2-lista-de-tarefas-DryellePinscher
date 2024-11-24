const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

function createTaskItem(task, taskIndex) {
  const taskItem = document.createElement('li');
  const taskInfoContainer = document.createElement('div');
  const taskType = document.createElement('span');
  const taskTitle = document.createElement('p');
  const removeButton = document.createElement('button');

  taskItem.classList.add('task__item');
  taskInfoContainer.classList.add('task-info__container');
  taskType.classList.add('task-type');
  taskTitle.textContent = task.title;
  removeButton.classList.add('task__button--remove-task');

  const typeLower = task.type.toLowerCase();
  if (typeLower === 'urgente') {
    taskType.classList.add('span-urgent');
  } else if (typeLower === 'importante') {
    taskType.classList.add('span-important');
  } else if (typeLower === 'normal') {
    taskType.classList.add('span-normal');
  }

  removeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  `;

  removeButton.addEventListener('click', () => {
    tasks.splice(taskIndex, 1);

    renderElements(tasks);
  });

  taskInfoContainer.appendChild(taskType);
  taskInfoContainer.appendChild(taskTitle);
  taskItem.appendChild(taskInfoContainer);
  taskItem.appendChild(removeButton);

  return taskItem;
}

function renderElements(tasks) {
  const taskList = document.querySelector('.tasks__list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    taskList.appendChild(taskItem);
  });
}

function captureInputs() {
  const taskTitleInput = document.querySelector('#input_title');
  const taskTypeSelect = document.querySelector('.form__input--priority');
  const addTaskButton = document.querySelector('.form__button--add-task');

  addTaskButton.addEventListener('click', event => {
    event.preventDefault();

    const title = taskTitleInput.value.trim();
    const type = taskTypeSelect.value;

    if (title && type) {
      const newTask = { title, type };
      tasks.push(newTask);

      taskTitleInput.value = '';
      taskTypeSelect.selectedIndex = 0;

      renderElements(tasks);
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  });
}

captureInputs();
renderElements(tasks);