/**
 * register an event
 * In Internet Explorer use attachEvent()
 * On other browsers use addEventListener()
 */
function registerEventHandler(node, event, handler) {
  if (typeof node.addEventListener === 'function')
    node.addEventListener(event, handler, false);
  else
    node.attachEvent('on' + event, handler);
}

/**
 * unregister event
 * In Internet Explorer use detachEvent()
 * On other browsers use removeEventListener()
 */
function unregisterEventHandler(node, event, handler) {
  if (typeof node.removeEventListener === 'function')
    node.removeEventListener(event, handler, false);
  else
    node.detachEvent('on' + event, handler);
}

function normalizeEvent(event) {
  if (!event.stopPropagation) {
    event.stopPropagation = function() {this.cancelBubble = true;};

    event.preventDefault = function() {this.returnValue = false;};
  }

  if (!event.stop)
    event.stop = function() {
      this.stopPropagation();
      this.preventDefault();
    };

  if (event.srcElement && !event.target)
    event.target = event.srcElement;

  if ((event.toElement || event.fromElement) && !event.relatedTarget)
    event.relatedTarget = event.toElement || event.fromElement;

  if (event.clientX !== undefined && event.pageX === undefined) {
    event.pageX = event.clientX + document.body.scrollLeft;
    event.pageY = event.clientY + document.body.scrollTop;
  }

  if (event.type === 'keypress')
    event.character = String.fromCharCode(event.charCode || event.keyCode);

  return event;
}

function addHandler(node, type, handler) {
  function wrapHandler(event) {
    handler(normalizeEvent(event || window.event));
  }

  registerEventHandler(node, type, wrapHandler);
  return {node: node, type: type, handler: wrapHandler};
}

function removeHandler(object) {
  unregisterEventHandler(object.node, object.type, object.handler);
}
