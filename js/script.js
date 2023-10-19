{
  let tasks = [];

  let hideDoneTask = false;

  const toggleHideTask = () => {
    hideDoneTask = !hideDoneTask
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (removedTask) => {
    tasks = tasks.filter((_, task) => task !== removedTask);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) => (index === taskIndex ? { ...task, done: !task.done } : task));
    render();
  };

  const allTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, index) => {
      removeButtons.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };


  const renderTasksList = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
        <li class="tasks__list ${hideDoneTask && task.done ? "tasks__list--hiden" : ""}">
          <button class="js-done tasks__buttons tasks__buttons--done">
           ${task.done ? "✔" : " "}
          </button>
             <span class="task__item${task.done ? " task__item--done" : ""}">
             ${task.content}
             </span>
          <button class="js-remove tasks__buttons tasks__buttons--remove">🗑</button>
        </li>
      `;
    }
    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderHeaderButtons = () => {
    const taskListHeaderButtons = tasks.length > 0 ? `
           <button class= "js-hideDoneButton section__buttons">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
           <button class= "js-markAllDoneButton section__buttons"${tasks.every(({ done }) => done) ? "disabled" : " "} >Ukończ wszystkie</button>
           ` : "";


    document.querySelector(".js-buttons").innerHTML = taskListHeaderButtons;
  };

  const bindHeaderButtonsEvents = () => {
    const someTaskDone = tasks.some(({ done }) => done);
    const hideTaskDoneButton = document.querySelector(".js-hideDoneButton");
    if (someTaskDone) {
      hideTaskDoneButton.addEventListener("click", () => {
        toggleHideTask();
      });
    };


    const doneAllButton = document.querySelector(".js-markAllDoneButton");
    if (doneAllButton) {
      doneAllButton.addEventListener("click", () => {
        allTasksDone();
      });
    };
  };


  const render = () => {
    renderTasksList();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderHeaderButtons();
    bindHeaderButtonsEvents();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };


  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}