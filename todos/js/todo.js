/*global todo */
/*global addTodo */
/*global addHandler */
/*global method */
/*global completedTodoButton */
/*global setLeftItem */
/*global addClass */
/*global removeClass */
/*global setStatusToggleAll */
/*global fakeFilterEvent */

function Todo() {
  this.todoListObj = [];
  this.todoListNode = document.getElementById('todo-list');

  this.todoInputNode = document.getElementById('input-todo');
  addHandler(this.todoInputNode, 'keydown', method(this, 'addNewTodo'));

  this.id = 0;
}

Todo.prototype.addNewTodo = function addNewTodo(event) {
  var nodeValue = this.todoInputNode.value;

  if (event.keyCode === 13 && nodeValue !== '') {
    if (completedTodoButton.getAttribute('class').indexOf('btn-active') === -1) {
      // if current panel is not completed
      addTodo(this, 'active', this.id, nodeValue);
    }

    // add item to todoListObj
    var todoObj = {id: this.id++, type: 'active', value: nodeValue};
    this.todoListObj.push(todoObj);
    setLeftItem(this.todoListObj);

    this.todoInputNode.value = '';
  }
};

Todo.prototype.displayDelete = function displayDelete(event) {
  var parent = event.target.parentNode;
  var del = parent.getElementsByClassName('delete');

  del[0].style.display = 'block';
};

Todo.prototype.hideDelete = function hideDelete(event) {
  var parent = event.target.parentNode;
  var del = parent.getElementsByClassName('delete');

  del[0].style.display = 'none';
};

Todo.prototype.editTodo = function editTodo(event) {
  var todoNode = event.target.parentNode.parentNode;
  var view = todoNode.getElementsByClassName('todo-view')[0];
  var edit = todoNode.getElementsByClassName('todo-edit')[0];

  edit.value = view.textContent.substring(0, view.textContent.length - 1);
  view.style.display = 'none';
  edit.style.display = 'block';
  edit.focus();
};

Todo.prototype.closeEditTodoBlur = function closeEditTodoBlur(event) {
  var todoNode = event.target.parentNode;

  this.editTodoContent(todoNode);
};

Todo.prototype.closeEditTodoKeydown = function closeEditTodoKeydown(event) {
  var todoNode = event.target.parentNode;

  if (event.keyCode === 13) {
    this.editTodoContent(todoNode);
  }

  if (event.keyCode === 27) {
    todoNode.getElementsByClassName('todo-view')[0].style.display = 'block';
    todoNode.getElementsByClassName('todo-edit')[0].style.display = 'none';
  }
};

Todo.prototype.editTodoContent = function editTodoContent(todoNode) {
  var view = todoNode.getElementsByClassName('todo-view')[0];
  var edit = todoNode.getElementsByClassName('todo-edit')[0];
  var id;

  if (edit.style.display !== 'none') {
    view.getElementsByTagName('label')[0].textContent = edit.value;
    id = todoNode.getAttribute('data-id');
    if (edit.value === '') {
      todoNode.getElementsByClassName('delete')[0].click();
    }else {
      this.todoListObj[this.findItemInTodoListObj(id)].value = edit.value;
    }
  }

  view.style.display = 'block';
  edit.style.display = 'none';
};

Todo.prototype.deleteTodo = function deleteTodo(event) {
  // get 'LI' node
  var node = event.target.parentNode.parentNode;

  // delete item from todoListObj
  var id = node.getAttribute('data-id');

  // get'DIV#todo-list' node
  var parent = node.parentNode;

  this.todoListObj.splice(this.findItemInTodoListObj(id), 1);
  parent.removeChild(node);

  setLeftItem(this.todoListObj);
};

Todo.prototype.updateTodoStatus = function updateTodoStatus(id, status) {
  var nodeId = this.findItemInTodoListObj(Number(id));
  this.todoListObj[nodeId].type = status;
};

Todo.prototype.findItemInTodoListObj = function findItemInTodoListObj(id) {
  for (var i = 0; i < todo.todoListObj.length; i++) {
    if (todo.todoListObj[i].id === id) {
      return i;
    }
  }
};

Todo.prototype.checkTodo = function checkTodo(event) {
  var node = event.target;
  var todoNode = node.parentNode.parentNode;
  var dataId = todoNode.getAttribute('data-id');

  if (node.checked) {
    addClass(todoNode, 'completed');
    if (dataId !== null) {
      this.updateTodoStatus(dataId, 'completed');
    }
  }else {
    removeClass(todoNode, 'completed');
    if (dataId !== null) {
      this.updateTodoStatus(dataId, 'active');
    }
  }

  // set the number of left item
  setLeftItem(this.todoListObj);

  // set status for toggle-all button
  setStatusToggleAll(this.todoListObj);

  fakeFilterEvent();
};
