/*global dom */

function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      action(property, object[property]);
  }
}

// the reduce Function
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function bind(func, object) {
  return function() {
    return func.apply(object, arguments);
  };
}

// in the expression bind(testArray.push, testArray), the name testArray still occurs twice. Some people prefer this, more succinct approach to method binding:
function method(object, name) {
  return function() {
    object[name].apply(object, arguments);
  };
}

// create a html code of todo item
function createTodoHtml(todoName, type, id) {
  var checkboxProperties = {class:'checkbox', type:'checkbox', name: 'todo'};
  if (type === 'completed') {
    checkboxProperties.checked = 'checked';
  }

  var todoItem =
  dom('LI', {class: 'todo-item', 'data-id': id},
    dom('DIV', {class: 'todo-view'},
      dom('INPUT', checkboxProperties),
      dom('LABEL', null, todoName),
      dom('A', {class: 'delete'}, '×')),
    dom('INPUT', {class: 'todo-edit', type: 'text', value:'js'}));
  return todoItem;
}

// add a class to node
function addClass(node, className) {
  var currentClass = node.getAttribute('class');
  var classPosition;

  if (currentClass === null) {
    node.setAttribute('class', className);
  }else {
    // get className position in currentClass
    classPosition = currentClass.indexOf(className);
    if (classPosition === -1) {
      // if className do not exist in currentClass
      currentClass = currentClass + ' ' + className;
      node.setAttribute('class', currentClass);
    }
  }
}

// remove a class from node
function removeClass(node, className) {
  var currentClass = node.getAttribute('class');

  if (currentClass !== null) {
    currentClass = currentClass.replace(className, '');
    node.setAttribute('class', currentClass);
  }
}
