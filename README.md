# Fleet

**Fleet** is fork of [Edom.js](https://github.com/eric-fahendrena/Edom), a JavaScript library that allows you to interact with the DOM.

<div>
  <img src="fleet.png" alt="FleetLogo" style="width: 100%;">
</div>

## Installation

### Fleet as a single JavaScript file

Load fleet to your html file followed by your javascript code.
```html
<script src="fleet.js"></script>
<script>
  // Your code here ...
</script>
```

### Fleet as npm package

Install fleet with npm:
```bash
npm install fleet.js
```
Import fleet into you project:
```js
import fleet from 'fleet.js';

// if you don't use npm ...
import fleet from 'https://cdn.rivolink.mg/fleet/1.0.0/fleet.js';
```

## Examples

Fleet is easy to use.

### Hello, world!

Write "Hello, world!" in an `h1` element:
```js
import fleet from 'fleet';

// Create h1 element
const h1 = fleet.create('h1');

// Write a text
fleet.setText(h1, 'Hello, world!');

// Add the element to the body
fleet.append(h1, document.body);

// Or create many elements
const elements = fleet.create(['h2','h3','h4']);

// Write a text to all elements
fleet.setText(elements, 'Hello, world!');

// Add all elements to the body
fleet.append(elements, document.body);


```

### Functions

```js
const element = fleet.create('div'); // create an element

// setText text to an element
fleet.setText(element, "Your text here");

// set html (this completely changes the html inside the element)
fleet.setHTML(element, '<span>HTML code</span>');

// add html (this adds an html code in the element)
fleet.addHTML(element, '<span>HTML code</span>');

// inserting element
fleet.append(element, parent);
fleet.preprend(element, parent);

// add attribute
fleet.addAttr(element, {prop1: 'value', prop2: 'value'});

// add style to an element
fleet.addCSS(element, {color: 'red', fontSize: '12px'});

// get computed css
const compCSS = fleet.getComputedCSS(element, 'width');

// classes utilities
fleet.addClass(element, 'my-class'); // add class
fleet.removeClass(element, 'my-class'); // remove class
fleet.toggleClass(element, 'my-class'); // toggle class

// event handling
fleet.addEvent(element, eventType, handler); // add event listener
fleet.removeEvent(element, eventType, handler); // remove event listener

// apply css animation
fleet.applyAnimation(element, {
  name: animationName,
  duration: animationDuration,
  timingFunction: animationTimingFunction
});

// ajax get
fleet.ajaxGet(url, callback);
const promise = fleet.fetchGet(url);

// serialize form data
const jsonObject = fleet.serializeForm(formElement);

// multiply an element
const p = fleet.create('p');
fleet.setText(p, 'Hello!');
fleet.append(p, document.body);
fleet.multiply(p, 5);
```

## Contributing

We welcome contributions from the community! Please follow the guidelines outlined in the [GitHub documentation on contributing to projects](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks).

Thank you for your interest in contributing!

## License

Mozilla Public License Version 2.0
