// Add simple event handling to the provided object.
// - Add `on` method
// - Add `fire` method
// - Add private event registry

var eventuality = function(that) {
  var registry = {};

  that.fire = function(event) {
    // Fire an event on the object to which we are attached. The event is
    // either a string containing the name of the event or an object containing
    // a `type` property which has the name of the event. How do we know which
    // handler should handle a given event? Why, easy! We register a handler
    // with the `on` method with the same name.
    var type = typeof event == 'string' ? event : event.type;

    // If an array of handlers (so lots of handlers for a given event) then
    // loop through it and execute the handlers in order
    var handler; // Current handler
    var allHandlers; // An array of handlers
    var func; // Function associated with a particular handler
    if (registry.hasOwnProperty(type)) {
      allHandlers = registry[type];
      for (var i = 0; i < allHandlers.length; i += 1) {
        handler = allHandlers[i];
        // We can have two types of handlers:
        // - An internal handler that's function on the object we're retrofitting
        // event handling onto. That handler will just be a regular method
        // associated with our retrofitted object
        // - An external handler that's a function defined elsewhere and passed in
        func = handler.method
        if (typeof func === 'string') {
          func = this[func];
        }

        // Invoke the handler and, if params present, then use them otherwise
        // pass the event object
        func.apply(this, handler.parameters || [event]);
        // Or maybe: func(handler.parameters || [event]);
      }
    } else {
      console.log('Did not find handler for ' + type);
    }
    return this;
  };

  that.on = function(type, method, parameters) {
    // Register an event by making a handler record in the handler array.
    // Making an array if one does not already exist.
    var handler = {
      method: method,
      parameters: parameters
    };

    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }

    return this;
  };
  return that;
};

var freddoObject = {
  name: 'freddo'
};

var arkieObject = {
  name: 'arkie',
  arkieHandler: function(data) {
    console.log('Running the bundled with object handler for arkie! With data ===> ' + data);
  }
}

freddoObject = eventuality(freddoObject);
var myHandler = function(data) {
  if (data) {
    console.log('Running external handler for freddo! With data ===> ' + data);
  }
};

freddoObject.on('myEvent', myHandler, ['some data weee']);
freddoObject.fire('myEvent');
freddoObject.on('myEventNoParam', myHandler);
freddoObject.fire('myEventNoParam');

arkieObject = eventuality(arkieObject);
arkieObject.on('arkieEvent', 'arkieHandler', ['some data for Arkie handler']);
arkieObject.fire('arkieEvent');
