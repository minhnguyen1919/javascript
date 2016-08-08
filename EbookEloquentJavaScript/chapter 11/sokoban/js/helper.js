function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      action(property, object[property]);
  }
}

// The reduce Function
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function method(object, name) {
  return function() {
    object[name].apply(object, arguments);
  };
}
