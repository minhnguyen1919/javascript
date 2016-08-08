/*global todo */
/*global addClass */
/*global removeClass */
/*global toggleAllButton */
/*global clearButton */
/*global addHandler */
/*global createTodoHtml */
/*global method */
/*global allTodoButton */
/*global activeTodoButton */
/*global completedTodoButton */

var todoListNode = document.getElementById('todo-list');

function setLeftItem(listObj) {
  var total = 0;
  var status;
  var leftItemNode = document.getElementById('item-left');

  for (var i = 0; i < listObj.length; i++) {
    status = listObj[i].type;
    if (status === 'active') {
      total++;
    }
  }

  leftItemNode.textContent = total + ' item' + (total > 1 ? 's ' : ' ') + 'left';
  if (todo.todoListObj.length - total === 0) {
    clearButton.style.display = 'none';
  }else {
    clearButton.style.display = 'block';
  }
}

function addTodo(todo, type, id, value) {
  todo.todoListNode.appendChild(createTodoHtml(value, type, id));

  var lastTodo = todo.todoListNode.lastChild;
  var del = lastTodo.firstChild.getElementsByClassName('delete')[0];
  var checkbox = lastTodo.getElementsByClassName('todo-view')[0].getElementsByClassName('checkbox')[0];
  var label = lastTodo.getElementsByTagName('label')[0];
  var edit = lastTodo.getElementsByClassName('todo-edit')[0];

  addHandler(lastTodo, 'mouseover', method(todo, 'displayDelete'));
  addHandler(lastTodo, 'mouseout', method(todo, 'hideDelete'));
  addHandler(del, 'click', method(todo, 'deleteTodo'));
  addHandler(checkbox, 'change', method(todo, 'checkTodo'));
  addHandler(label, 'dblclick', method(todo, 'editTodo'));
  addHandler(edit, 'blur', method(todo, 'closeEditTodoBlur'));
  addHandler(edit, 'keydown', method(todo, 'closeEditTodoKeydown'));

  setLeftItem(todo.todoListObj);
}

function rerenderAllTodoItem(type) {
  var todoItemObj;

  todoListNode.innerHTML = '';
  for (var i = 0; i < todo.todoListObj.length; i++) {
    todoItemObj = todo.todoListObj[i];
    if (todoItemObj.type === type) {
      addTodo(todo, todoItemObj.type, todoItemObj.id, todoItemObj.value);
    }else if (type === 'all') {
      addTodo(todo, todoItemObj.type, todoItemObj.id, todoItemObj.value);
    }
  }
}

function removeClassOfAllChildNode(parent, className) {
  var childNodeList = parent.getElementsByClassName('button');

  for (var i = 0; i < childNodeList.length; i++) {
    removeClass(childNodeList[i], className);
  }
}

function fakeFilterEvent() {
  if (allTodoButton.getAttribute('class').indexOf('btn-active') !== -1) {
    allTodoButton.click();
  }

  if (activeTodoButton.getAttribute('class').indexOf('btn-active') !== -1) {
    activeTodoButton.click();
  }

  if (completedTodoButton.getAttribute('class').indexOf('btn-active') !== -1) {
    completedTodoButton.click();
  }
}

function filterAllTodo(event) {
  var node = event.target;

  rerenderAllTodoItem('all');
  removeClassOfAllChildNode(node.parentNode.parentNode, 'btn-active');
  addClass(node, 'btn-active');
}

function filterActiveTodo() {
  var node = event.target;

  rerenderAllTodoItem('active');
  removeClassOfAllChildNode(node.parentNode.parentNode, 'btn-active');
  addClass(node, 'btn-active');
}

function filterCompletedTodo() {
  var node = event.target;

  rerenderAllTodoItem('completed');
  removeClassOfAllChildNode(node.parentNode.parentNode, 'btn-active');
  addClass(node, 'btn-active');
}

function toggleAllCheckbox() {
  var status;

  if (toggleAllButton.checked) {
    status = 'completed';
  }else {
    status = 'active';
  }

  for (var i = 0; i < todo.todoListObj.length; i++) {
    todo.updateTodoStatus(todo.todoListObj[i].id, status);
  }

  setLeftItem(todo.todoListObj);
  fakeFilterEvent();
}

function removeCompletedTodo() {
  var status;

  for (var i = 0; i < todo.todoListObj.length; i++) {
    status = todo.todoListObj[i].type;
    if (status === 'completed') {
      todo.todoListObj.splice(i, 1);
      i--;
    }
  }

  fakeFilterEvent();
  if (todo.todoListObj.length === 0) {
    clearButton.style.display = 'none';
  }
}

function setStatusToggleAll(listObj) {
  var status;
  var count = 0;

  for (count; count < listObj.length; count++) {
    status = listObj[count].type;
    if (status === 'active') {
      break;
    }
  }

  if (count < listObj.length) {
    toggleAllButton.checked = false;
  }else {
    toggleAllButton.checked = true;
  }
}
