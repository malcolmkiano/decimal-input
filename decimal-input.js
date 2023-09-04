function decimalInput(options = false) {
  // set the options if not set
  if (!options) options = {};
  // provide for any missing values
  options.selector = options.selector || ".decimal";
  options.format = options.format || "standard";
  options.validation = options.validation || "soft";
  // check if length was provided, and if it is a number
  if (options.length) {
    if (isNaN(options.length) || options.length < 1) {
      console.warn(
        "decimal-input: Invalid length given: '" + options.length + "'"
      );
      options.length = 2;
    }
  } else {
    options.length = 2;
  }

  // run
  var inputs = document.querySelectorAll(options.selector);
  inputs.forEach(function (input) {
    // sets the pattern for the input to allow
    input.setAttribute("pattern", "\\d*");

    // checks if input-level length is set, and is valid
    if (input.dataset.length) {
      if (isNaN(input.dataset.length) || input.dataset.length < 1) {
        console.warn(
          "decimal-input: Invalid length given: '" + input.dataset.length + "'"
        );
        input.dataset.length = 2;
      }
    }
    var length = input.dataset.length
      ? parseInt(input.dataset.length)
      : options.length;
    var mid = ".";
    var end = "";
    var isHeight =
      input.dataset.format == "height" ||
      (!input.dataset.format && options.format == "height");
    if (isHeight) {
      // set data-type to text to allow quote marks
      input.setAttribute("type", "text");
      input.setAttribute("inputmode", "numeric");
      mid = "'";
      end = '"';
      // set length to 2 if input format is height
      length = 2;
    }

    // set value for input (uses default value if set)
    if (!input.value && !input.dataset.defaultValue) {
      for (var i = 0; i < length + 1; i++) {
        input.value += "0";
      }
      input.dataset.content = "";
    } else {
      const initialValue = input.value || input.dataset.defaultValue;
      input.value = initialValue;
      input.dataset.content = initialValue.replace(/[\.'"]/g, "");
    }

    // add delimiter
    function formatInput(content = true) {
      var value = input.value.toString();
      if (content) {
        var c = input.dataset.content;
        if (c.length < length + 1) {
          var pre = "";
          for (var i = 0; i < length + 1 - c.length; i++) {
            pre += "0";
          }
          c = pre + c;
        }
        value = c.toString();
      }

      var before = value
        .substring(0, value.length - length)
        .replace(/[\.'"]/g, "");
      var after = value.substring(value.length - length);

      // validation for height, autocorrect to correct feet and inches value
      if (isHeight) {
        if (before > 0) {
          // if validation is hard
          if (options.validation == "hard") {
            while (after > 11) {
              before = parseInt(before) + 1;
              after = parseInt(after) - 12;
              if (after == 0) {
                after = `${after}0`;
              } else if (after < 10) {
                after = `0${after}`;
              }
              input.dataset.content = `${before}${after}`;
              formatInput(true);
            }
          } else {
            if (after > 11) {
              // mark input as invalid
              input.setAttribute("invalid", true);
            }
          }
        }
      }
      // delimit value
      input.value = `${before}${mid}${after}${end}`;
    }

    // bind input function to format
    input.onkeydown = function (e) {
      // remove invalid marker if present
      input.removeAttribute("invalid");
      var key = e.key;
      if (e.key == "Backspace") {
        var content = input.dataset.content;
        if (content) {
          input.dataset.content = content.substring(0, content.length - 1);
        }
      } else if (isNaN(key)) {
        return false;
      } else {
        input.dataset.content += key;
      }
      formatInput();

      return false;
    };

    // initial format
    formatInput(false);
  });
}
