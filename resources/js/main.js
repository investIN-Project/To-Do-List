//'database' stored directly in code
var data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: [],
      priority: [],
      completed: []
    };

// Remove and complete icons in SVG format
var removeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var prioritySVG =
  '<svg class="svg-icon" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" ><rect y="0" class="noFill" width="22" height="22"/><g> <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path> </svg>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById("add").addEventListener("click", function() {
  //Collects the data inputted by the user
  var value = document.getElementById("item").value;
  if (value) {
    //checks that the data is not empty
    addItem(value);
  }
});

//Allows users to also add a task by pressing the enter key
document.getElementById("item").addEventListener("keydown", function(e) {
  var value = this.value;
  if ((e.code === "Enter" || e.code === "NumpadEnter") && value) {
    addItem(value);
  }
});

//This function adds the new task to the to do list and updates the screen
function addItem(value) {
  addItemToDOM(value);
  document.getElementById("item").value = "";

  data.todo.push(value);
  dataObjectUpdated();
}

//This function displays the to-do list
function renderTodoList() {
  //Checks that the lists are not empty
  if (!data.todo.length && !data.completed.length) return;

  //If they are not empty then this code will run to display each item in a for loop
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value, false, false);
  }

  //displays the completed list
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true, false);
  }

  //displays for priority list
  //checks that the priority list exists before running
  if (data.priority) {
    //Your code here
  } else {
    //Ensures that local storage is reset when priority list is added
    localStorage.clear();
  }
}

//Update the local database
function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// This function removes an item (deletion not completion)
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

//complete this function
function prioritise() {
  //Your code here
}

//This function is called when a user clicks the 'complete' button
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === "todo") {
    //if the item is not completed
    //take the item out of the to-do list and add it to completed list
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    //take item out of completed list and add to to do
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  dataObjectUpdated();

  var target =
    id === "todo"
      ? document.getElementById("completed")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completedBool, priorityBool) {
  var list = completedBool
    ? document.getElementById("completed")
    : document.getElementById("todo");

  var item = document.createElement("li");
  item.innerText = text;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener("click", removeItem);

  //Prioritise Button
  //Prioritise event listener

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  //Add the prioritise button
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}
