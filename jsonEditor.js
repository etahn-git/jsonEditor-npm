const fs = require('fs');
const path = require('path');

function jsonEditor(jsonDIR, exitBoolean) {
  const currentModuleDir = path.dirname(require.main.filename);
  const absoluteJsonDIR = path.resolve(currentModuleDir, jsonDIR);

  global.exitBoolean = exitBoolean;
  global.configJSON = require(absoluteJsonDIR);
  global.JSONfile = configJSON;
  global.jsonDIR = absoluteJsonDIR;
  console.log('jsonEditor Loaded JSON: "' + absoluteJsonDIR + '"');


  return {
    read: (property) => read(property),
    remove: (property) => remove(property),
    add: (property, value) => add(property, value),
    edit: (property, newValue) => edit(property, newValue),
    createNested: (property) => createNested(property),
    emptyNested: (property) => emptyNested(property),
    createArray: (property) => createArray(property),
    emptyArray: (property) => emptyArray(property),
    clearAll: () => clearAll(),
  };
}

// ----------------------------------------- update json ----------------------------------------
function updateJSON(configJSON) {
  fs.writeFileSync(jsonDIR, JSON.stringify(configJSON, null, 2));
}

// ---------------------------------------- exit -----------------------------------------------
function exit() {
  if (exitBoolean === true) {
    process.exit();
  } else if (exitBoolean === false) {
    // Do nothing
  } else {
    exitBoolean = false;
  }
}

// ---------------------------------------- value -----------------------------------------------
function clearAll() {
    configJSON = {};
    updateJSON(configJSON);
}
    
function read(property) {
  if (configJSON[property] === undefined) {
    console.log('Error: Cannot read Value: {' + property + '}\n' + 'Reason: Property does not exist');
    exit();
  } else {
    return configJSON[property];
  }
}

function add(property, value) {
  const propertyPath = property.split('/');
  let currentObject = configJSON;
  let currentProperty = '';

  for (let i = 0; i < propertyPath.length; i++) {
    currentProperty = propertyPath[i];

    if (Array.isArray(currentObject)) {
      if (i === propertyPath.length - 1) {
        currentObject.push(value);
        updateJSON(configJSON);
        return;
      } else {
        console.log('Error: Cannot add Value: {' + property + ', ' + value + '}\n' + 'Reason: Property is an array, not an object');
        exit();
      }
    } else if (currentObject[currentProperty] === undefined) {
      if (i === propertyPath.length - 1) {
        currentObject[currentProperty] = value;
        updateJSON(configJSON);
        return;
      } else {
        currentObject[currentProperty] = {};
      }
    } else if (i === propertyPath.length - 1) {
      console.log('Error: Cannot add Value: {' + property + ', ' + value + '}\n' + 'Reason: Property already exists');
      exit();
    }

    currentObject = currentObject[currentProperty];
  }
}

function remove(property) {
  const propertyPath = property.split('/');
  let currentObject = configJSON;
  let currentProperty = '';

  for (let i = 0; i < propertyPath.length; i++) {
    currentProperty = propertyPath[i];

    if (currentObject[currentProperty] === undefined) {
      console.log('Error: Cannot delete Value: {' + property + '}\n' + 'Reason: Property does not exist');
      exit();
    } else if (i === propertyPath.length - 1) {
      if (Array.isArray(currentObject)) {
        const index = parseInt(currentProperty, 10);
        if (!isNaN(index) && index >= 1 && index <= currentObject.length) {
          currentObject.splice(index - 1, 1);
          updateJSON(configJSON);
          return;
        } else {
          console.log('Error: Cannot delete Value: {' + property + '}\n' + 'Reason: Invalid array index');
          exit();
        }
      } else {
        delete currentObject[currentProperty];
        updateJSON(configJSON);
        return;
      }
    }

    currentObject = currentObject[currentProperty];
  }
}

function edit(property, newValue) {
  const propertyPath = property.split('/');
  let currentObject = configJSON;
  let currentProperty = '';

  for (let i = 0; i < propertyPath.length; i++) {
    currentProperty = propertyPath[i];

    if (currentObject[currentProperty] === undefined) {
      console.log('Error: Cannot edit Value: {' + property + '}\n' + 'Reason: Property does not exist');
      exit();
    } else if (i === propertyPath.length - 1) {
      if (Array.isArray(currentObject)) {
        const index = parseInt(currentProperty, 10);
        if (!isNaN(index) && index >= 1 && index <= currentObject.length) {
          currentObject[index - 1] = newValue;
          updateJSON(configJSON);
          return;
        } else {
          console.log('Error: Cannot edit Value: {' + property + '}\n' + 'Reason: Invalid array index');
          exit();
        }
      } else {
        currentObject[currentProperty] = newValue;
        updateJSON(configJSON);
        return;
      }
    }

    currentObject = currentObject[currentProperty];
  }
}

// ------------------------------------- nested object ------------------------------------------
function createNested(property) {
  if (configJSON[property] === undefined) {
    configJSON[property] = {};
    updateJSON(configJSON);
  } else {
    console.log('Error: Cannot create Nested Object: {' + property + '}\n' + 'Reason: Property already exists');
    exit();
  }
}

function emptyNested(property) {
  if (configJSON[property] === undefined || typeof configJSON[property] !== 'object') {
    console.log('Error: Cannot empty Nested Object: {' + property + '}\n' + 'Reason: Property does not exist or is not a nested object');
    exit();
  } else {
    configJSON[property] = {};
    updateJSON(configJSON);
  }
}

// ------------------------------------- array ------------------------------------------
function createArray(property) {
  if (configJSON[property] === undefined) {
    configJSON[property] = [];
    updateJSON(configJSON);
  } else {
    console.log('Error: Cannot create Array: {' + property + '}\n' + 'Reason: Property already exists');
    exit();
  }
}

function emptyArray(property) {
  if (configJSON[property] === undefined || !Array.isArray(configJSON[property])) {
    console.log('Error: Cannot empty Array: {' + property + '}\n' + 'Reason: Property does not exist or is not an array');
    exit();
  } else {
    configJSON[property] = [];
    updateJSON(configJSON);
  }
}

module.exports = jsonEditor;
