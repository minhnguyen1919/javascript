/*global addHandler */
/*global removeCompletedTodo */
/*global toggleAllCheckbox */
/*global filterAllTodo */
/*global filterActiveTodo */
/*global filterCompletedTodo */
/*global setLeftItem */
/*global Todo */

var clearButton = document.getElementById('clear-button');
var todo = new Todo();
var toggleAllButton = document.getElementById('toggle-all');
var allTodoButton = document.getElementById('all-todo');
var activeTodoButton = document.getElementById('active-todo');
var completedTodoButton = document.getElementById('completed-todo');

addHandler(clearButton, 'click', removeCompletedTodo);
addHandler(toggleAllButton, 'click', toggleAllCheckbox);
addHandler(allTodoButton, 'click', filterAllTodo);
addHandler(activeTodoButton, 'click', filterActiveTodo);
addHandler(completedTodoButton, 'click', filterCompletedTodo);

setLeftItem(todo.todoListObj);
