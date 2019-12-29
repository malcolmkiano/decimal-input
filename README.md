# Decimal Input

A simple number input that forces decimal entry. I made this because I'm working on a web-app that requires decimal input, however, the default iOS numeric keypad does not include a period. The height feature was added just because I thought it might be useful.\
\
![decimal-input.js version](https://img.shields.io/badge/decimal--input.js-v1.0.0-brightgreen)

## Installation
All you have to do is download the **decimal-input.js** file and include it in your project. That's it.

## Usage
Include the **decimal-input.js** file at the bottom of your body and initialize it. By default, the selector to activate your inputs is `.decimal`, but you can change this to anything else in your initialization.

```html
<body>
    <!-- rest of your code -->
    <input class="decimal" type="number"/>
    ...
  
    <script type="text/javascript" src="link/to/decimal-input.js"></script>
    <script type="text/javascript">
		decimalInput();
    </script>
  
</body>
```

## Configuration
By default, this sets your inputs to 2 decimal places, however there are a few global configuration options, as well as input-level options.

### Global options

- **`selector`**: this sets the selector that decimal-input.js will watch and automatically format. Default value is `.decimal`. You should primarily use class selectors for targets if using multiple inputs.
```javascript
decimalInput({
    selector: ".decimal"
})
```

- **`display`**: this sets the formatting type for the inputs. Can be `standard` or `height`. Default value is `standard`.
```javascript
decimalInput({
    display: "standard"
})
```

- **`length`**: this sets the number of decimal places used in formatting your inputs. Default value is `2`. This value only affects inputs displaying in the standard format. Length is limited from 1-3 places (might change soon).
```javascript
decimalInput({
    length: 2
})
```

### Input-level options
All the input level options are applied using the `data` attribute.
- **`display`**: this, just like the global option, sets the formatting type for the specific input it's used on. Can be `standard` or `height`.
```html
<input class="decimal" type="number" data-display="standard"/>
```

- **`length`**: this sets the number of decimal places to be displayed for the specific input, but **only affects the standard format**.
```html
<input class="decimal" type="number" data-length="2"/>
```



