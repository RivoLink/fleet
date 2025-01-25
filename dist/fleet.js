/*!
 * Fleet v1.0.0
 * https://github.com/RivoLink/fleet
 *
 * Date: 2025-01-25T15:35Z
 */
(function (global, factory) {

    // Load the factory into the right environment
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    class Fleet {

        /**
         * Constructor for Fleet.
         * @param {Document|HTMLElement} root The root element to operate within. Defaults to `document`.
         */
        constructor(root = document) {
            this.root = root;
            this.globals = {};
        }

        /**
         * Retrieve an element or return the element itself.
         * @param {String|HTMLElement} element The CSS selector or an element.
         * @return {HTMLElement} The selected or provided element.
         */
        $el(element) {
            if (typeof element === "string") {
                return this.root.querySelector(element);
            } else {
                return element;
            }
        }

        /**
         * Generate an HTML tag string with a specified name, class, and content.
         * @param {String} name The name of the HTML tag (e.g., "div", "span").
         * @param {String} classStr The class attribute for the tag.
         * @param {String} content The inner content of the tag.
         * @return {String} A string representing the complete HTML tag.
         */
        $tag(name, classStr, content) {
            return `<${name} class="${classStr}">${content}</${name}>`
        }

        /**
         * Set a global variable.
         * @param {String} key The key for the global variable.
         * @param {*} value The value to set for the global variable.
         */
        $set(key, value) {
            this.globals[key] = value;
        }

        /**
         * Get a global variable.
         * @param {String} key The key for the global variable.
         * @param {*} _default The default value to return if the key is not found (optional).
         * @return {*} The value of the global variable or the default value if the key is not found.
         */
        $get(key, _default = null) {
            return this.globals[key] || _default;
        }

        /**
         * Save a value in localStorage.
         * @param {String} key The key for the stored value.
         * @param {*} value The value to store.
         */
        $save(key, value) {
            localStorage.setItem(key, this.$stringify(value));
        }

        /**
         * Load a value from localStorage.
         * @param {String} key The key for the stored value.
         * @param {*} _default The default value to return if the key is not found (optional).
         * @return {*} The value stored for the key or the default value if the key is not found.
         */
        $load(key, _default = null) {
            const value = localStorage.getItem(key);
            return value ? this.$json(value) : _default;
        }

        /**
         * Safely parse a JSON string into a JavaScript object.
         * @param {String} text The JSON string to parse.
         * @return {Object} The parsed JavaScript object, or an empty object if parsing fails.
         */
        $json(text) {
            try {
                return JSON.parse(text);
            } catch (e) {
                return {};
            }
        }

        /**
         * Safely stringify a JavaScript object into a JSON string.
         * @param {Object} object The JavaScript object to stringify.
         * @return {String} The JSON string representation of the object.
         */
        $stringify(object) {
            return JSON.stringify(object || {});
        }

        /**
         * Initialize a new Fleet instance with a specific root element.
         * @param {HTMLElement} root The root element to use. If null, defaults to document.
         * @return {Fleet} A new instance of the Fleet class with the specified root.
         */
        init(root) {
            if (typeof root === "string") {
                return new Fleet(document.querySelector(root) || document);
            } else {
                return new Fleet(root || document);
            }
        }

        /**
         * Create an HTML element or an array of HTML elements.
         * @param {String|String[]} elName The tag name or an array of tag names to create.
         * @return {HTMLElement|HTMLElement[]} The created element(s).
         */
        create(elName) {
            if (Array.isArray(elName)) {
                return elName.map((name) => this.root.createElement(name));
            } else {
                return this.root.createElement(elName);
            }
        }

        /**
         * Find an element by id.
         * @param {String} id Element id (without #).
         * @return {HTMLElement|null} The element with the given id, or null if not found.
         */
        find(id) {
            return this.root.getElementById(id);
        }

        /**
         * Select the first element that matches the CSS query.
         * @param {String} query CSS selector query.
         * @return {HTMLElement|null} The matching element or null if none found.
         */
        select(query) {
            return this.root.querySelector(query);
        }

        /**
         * Select all elements that match the CSS query.
         * @param {String} query CSS selector query.
         * @return {NodeList} A NodeList of matching elements.
         */
        selectAll(query) {
            return this.root.querySelectorAll(query);
        }

        /**
         * Select a child element within a parent element that matches the CSS query.
         * @param {HTMLElement} parent The parent element.
         * @param {String} query The CSS selector to find the child element.
         * @return {HTMLElement|null} The first matching child element or null if none found.
         */
        child(parent, query) {
            return parent.querySelector(query);
        }

        /**
         * Count the number of elements matching a CSS selector.
         * @param {String} query The CSS selector to match elements against.
         * @return {Number} The number of elements matching the CSS selector.
         */
        count(query) {
            return this.root.querySelectorAll(query).length;
        }

        /**
         * Set attributes on an element.
         * @param {HTMLElement} element The target element.
         * @param {Object} attrsObj An object of attributes to set.
         * @return {void}
         */
        setAttr(element, attrsObj) {
            Object.entries(attrsObj).forEach(([key, value]) => {
                this.$el(element).setAttribute(key, value);
            });
        }

        /**
         * Get an attribute from an element.
         * @param {HTMLElement} element The target element.
         * @param {String} attrName The attribute name.
         * @return {String|null} The attribute value or null if not found.
         */
        getAttr(element, attrName) {
            return this.$el(element).getAttribute(attrName);
        }

        /**
         * Set data attributes on an element.
         * @param {HTMLElement} element The target element.
         * @param {Object} dataObj An object of data attributes to set.
         * @return {void}
         */
        setData(element, dataObj) {
            Object.entries(dataObj).forEach(([key, value]) => {
                this.$el(element).setAttribute(`data-${key}`, value);
            });
        }

        /**
         * Get a data attribute from an element.
         * @param {HTMLElement} element The target element.
         * @param {String} dataName The data attribute name.
         * @return {String|null} The data attribute value or null if not found.
         */
        getData(element, dataName) {
            return this.$el(element).getAttribute(`data-${dataName}`);
        }

        /**
         * Set inline styles on an element.
         * @param {HTMLElement} element The target element.
         * @param {Object} style An object of styles to apply.
         * @return {void}
         */
        setCSS(element, style) {
            Object.entries(style).forEach(([key, value]) => {
                this.$el(element).style[key] = value;
            });
        }

        /**
         * Get an inline style property from an element.
         * @param {HTMLElement} element The target element.
         * @param {String} cssProp The CSS property name to retrieve.
         * @return {String} The value of the CSS property.
         */
        getCSS(element, cssProp) {
            return this.$el(element).style[cssProp];
        }

        /**
         * Get the computed style of an element.
         * @param {HTMLElement} element The target element.
         * @param {String} cssProp The CSS property name to retrieve.
         * @return {String} The computed value of the CSS property.
         */
        getComputedCSS(element, cssProp) {
            return window.getComputedStyle(this.$el(element)).getPropertyValue(cssProp);
        }

        /**
         * Check if an element has a class.
         * @param {HTMLElement} element The target element.
         * @param {String} className The class name to check.
         * @return {Boolean} True if the element has the class, false otherwise.
         */
        hasClass(element, className) {
            return this.$el(element).classList.contains(className);
        }

        /**
         * Add one or more classes to an element.
         * @param {HTMLElement} element The target element.
         * @param {String|String[]} classNames A class name or array of class names to add.
         * @return {void}
         */
        addClass(element, classNames) {
            if (!Array.isArray(element)) {
                element = (typeof element === "string") 
                    ? this.root.querySelectorAll(element) 
                    : [element];
            }

            classNames = Array.isArray(classNames) ? classNames : [classNames];
            classNames.forEach((name) => element.forEach((el) => this.$el(el).classList.add(name)))
        }

        /**
         * Remove one or more classes from an element.
         * @param {HTMLElement} element The target element.
         * @param {String|String[]} classNames A class name or array of class names to remove.
         * @return {void}
         */
        removeClass(element, classNames) {
            if (!Array.isArray(element)) {
                element = (typeof element === "string") 
                    ? this.root.querySelectorAll(element) 
                    : [element];
            }

            classNames = Array.isArray(classNames) ? classNames : [classNames];
            classNames.forEach((name) => element.forEach((el) => this.$el(el).classList.remove(name)))
        }

        /**
         * Toggle a class on an element.
         * @param {HTMLElement} element The target element.
         * @param {String} className The class name to toggle.
         * @param {Boolean} [force] Whether to force add/remove. Defaults to toggling.
         * @return {void}
         */
        toggleClass(element, className, force) {
            this.$el(element).classList.toggle(className, force);
        }

        /**
         * Set the text content of an element.
         * @param {HTMLElement} element The target element.
         * @param {String} textContent The text string to set.
         * @return {void}
         */
        setText(element, textContent) {
            this.$el(element).innerText = textContent;
        }

        /**
         * Get the text content of an element.
         * @param {HTMLElement} element The target element.
         * @return {String} The text content of the element.
         */
        getText(element) {
            return this.$el(element).innerText;
        }

        /**
         * Set the innerHTML of an element.
         * @param {HTMLElement} element The target element.
         * @param {String} htmlCode The HTML string to set.
         * @return {void}
         */
        setHTML(element, htmlCode) {
            this.$el(element).innerHTML = htmlCode;
        }

        /**
         * Get the innerHTML of an element.
         * @param {HTMLElement} element The target element.
         * @return {String} The HTML string of the element.
         */
        getHTML(element) {
            return this.$el(element).innerHTML;
        }

        /**
         * Add HTML code to an element's existing content.
         * @param {HTMLElement} element The target element.
         * @param {String} htmlCode The HTML string to append.
         * @return {void}
         */
        addHTML(element, htmlCode) {
            this.$el(element).innerHTML += htmlCode;
        }

        /**
         * Append a child element or elements to a parent element.
         * @param {HTMLElement} parent - The parent element to append to.
         * @param {HTMLElement|HTMLElement[]} child - The child element or an array of child elements to append.
         * @returns {void}
         */
        append(parent, child) {
            if (Array.isArray(child)) {
                child.forEach((el) => this.$el(parent).appendChild(this.$el(el)));
            } else {
                this.$el(parent).appendChild(this.$el(child));
            }
        }

        /**
         * Prepend a child element or elements to a parent element.
         * @param {HTMLElement} parent - The parent element to prepend to.
         * @param {HTMLElement|HTMLElement[]} child - The child element or an array of child elements to prepend.
         * @returns {void}
         */
        prepend(parent, child) {
            if (Array.isArray(child)) {
                child.forEach((el) => this.$el(parent).prepend(this.$el(el)));
            } else {
                this.$el(parent).prepend(this.$el(child));
            }
        }

        /**
         * Rotate an element by a given number of degrees.
         * @param {HTMLElement} element - The target element to rotate.
         * @param {Number} degrees - The number of degrees to rotate the element.
         * @returns {void}
         */
        rotate(element, degrees) {
            this.setCSS(element, { transform: `rotate(${degrees}deg)` });
        }

        /**
         * Load an external script dynamically.
         * @param {String} src - The source URL of the script to load.
         * @returns {void}
         */
        loadScript(src) {
            const script = this.create("script");
            this.setAttr(script, { src });
            this.append(document.body, script);
        }

        /**
         * Add an event listener to an element or elements.
         * @param {HTMLElement|String|HTMLElement[]} element - The target element(s) or CSS selector for the element(s).
         * @param {String} event - The event type to listen for (e.g., "click").
         * @param {Function} handler - The event handler function to execute when the event is triggered.
         * @returns {void}
         */
        addEvent(element, event, handler) {
            if (typeof element === "string") {
                this.selectAll(element).forEach((el) => el.addEventListener(event, handler));
            } else if (Array.isArray(element)) {
                element.forEach((el) => this.$el(el).addEventListener(event, handler));
            } else {
                this.$el(element).addEventListener(event, handler);
            }
        }

        /**
         * Remove an event listener from an element or elements.
         * @param {HTMLElement|String|HTMLElement[]} element - The target element(s) or CSS selector for the element(s).
         * @param {String} event - The event type to remove (e.g., "click").
         * @param {Function} handler - The event handler function to remove.
         * @returns {void}
         */
        removeEvent(element, event, handler) {
            if (typeof element === "string") {
                this.selectAll(element).forEach((el) => el.removeEventListener(event, handler));
            } else if (Array.isArray(element)) {
                element.forEach((el) => this.$el(el).removeEventListener(event, handler));
            } else {
                this.$el(element).removeEventListener(event, handler);
            }
        }

        /**
         * Perform an AJAX POST request and send JSON data.
         * @param {string} url - The URL to send the request to
         * @param {string} token - The Bearer token for authorization
         * @param {object} data - The data to send
         * @param {Function(result, data)} onSuccess - The callback function to handle success response
         * @param {Function(data)} onError - The callback function to handle error response
         */
        ajaxPost(url, token, data, onSuccess, onError) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.setRequestHeader('authorization', 'bearer ' + token);
            xhr.onload = () => {onSuccess(this.$json(xhr.responseText), data)};
            xhr.onerror = () => {onError(data)};
            xhr.send(JSON.stringify(data));
        }

        /**
         * Perform an AJAX GET request and retrieve JSON data.
         * @param {string} url - The URL to send the request to
         * @param {string} token - The Bearer token for authorization
         * @param {Function(result)} onSuccess - The callback function to handle success response
         * @param {Function()} onError - The callback function to handle error response
         */
        ajaxGet(url, token, onSuccess, onError) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('authorization', 'bearer ' + token);
            xhr.onload = () => {onSuccess(this.$json(xhr.responseText))};
            xhr.onerror = () => {onError()};
            xhr.send();
        }
    }

    const fleet = new Fleet();

    if (!noGlobal) {
        window.fleet = fleet;
    }

    return fleet;
});
