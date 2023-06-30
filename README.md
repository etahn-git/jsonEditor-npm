# jsonEditor-npm

A nodejs module made to edit json files easily

![npm](https://img.shields.io/npm/dw/jsonEditor-npm)


### JsonFile Format | [more](https://www.w3schools.com/js/js_json_datatypes.asp)

```json
{
	“StringProperty”: “StringValue”,
 	“NumberProperty”: 1, 
 	“FloatProperty”: 1.1,
 	“BooleanProperty”: true,

	“NestedObjectProperty”: {
		“Name”: “Neste  Object”
	},
	“NestedArrayProperty”: ["string", 1, 1.1, ,true]
}
```

# Usage

### Creating instance of jsonEditor

```javascript
const jsonEditor = require('json-editor-module'); // require the module
// Create an instance of jsonEditor by providing the path to your JSON file
const editor = jsonEditor('/path/to/your/json/file.json');
```

### Variables

```javascript
console.log()
```

### Reading properties

```javascript
const variable = editor.read('property') // reading the property
console.log(variable) // using the property
```

### Adding properties

```javascript
// add new stringProperty to JSON file
editor.add('stringProperty', 'string value')

// add new numberProperty to JSON file
editor.add('numberProperty', 1)

// add new floatProperty to JSON file
editor.add('floatProperty', 1.1)

// add new booleanProperty(true/false) to JSON file
editor.add('booleanProperty', true)
```

### Editing properties

```javascript
// editing a property
editor.edit('propertyToEdit', 'newPropertyToEdit')
```

### Removing properties

```javascript
// remove/delete property
editor.remove('property')
```

### Other

```javascript
// resets json file to default
editor.clearAll()
```

### Nests

```javascript
// !!! you dont need to use the createNested object all the time, if you use 'editor.add(property/value)' it will create it for you !!!
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// creating a empty nest object
editor.createNested('property')

// reading, adding, editing, removing nest values
editor.read('property/value')
// with jsonEditor-npm by default "/" is the directory symbole, so in the example above we are using the nest propety then using that slash we go into the nested object and we can then select the value inside of the nested object
// "read" can be replaced with any of the other types of operations
// all the operation examples will be below
editor.read('nestProperty/property')
editor.add('nestProperty/property', 'value')
editor.edit('nestProperty/property', 'value')
editor.remove('nestProperty/property')

// empty a nest object
editor.emptyNested('property')

// removing/deleting a nest object
editor.remove('propety')
```

### Arrays

```javascript
// creating a empty array
editor.createArray('property')

// reading, adding, editing, removing arrays
editor.read('arrayProperty/value')
// with jsonEditor-npm by default "/" is the directory symbole, so in the example above we are using the array property then using that slash symbole we go into the array and we can then select the value inside of the array
// "read" can be replaced with any of the other types of operations
// all the operation examples will be below | {index} = the index of the property in the array
editor.read('arrayProperty/{index}')
editor.add('arrayProperty/{index})
editor.edit('arrayProperty/{index}', 'value')
editor.remove('arrayProperty/{index}')

// empty a array
editor.emptyArray('arrayProperty')

// removing/deleting an array
editor.remove('arrayProperty')
```
