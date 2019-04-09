var dictionary = require("./dictionary");

function randomInteger(min, max) {
  var random = Math.random;
  return Math.floor(random() * (max - min + 1) + min);
}
function getSuffix(suffix) {
  // Check type of os and platform
  var isNode = typeof module !== "undefined" && module.exports;
  var isReactNative =
    typeof product !== "undefined" && product.navigator === "ReactNative";
  var isWindows =
    typeof process !== "undefined" && "win32" === process.platform;

  if (!isReactNative && isNode && isWindows) {
    suffix = suffix || "\r\n";
  } else {
    suffix = suffix || "\n";
  }
  return suffix;
}
function generator({ count, unit, random, suffix }) {
  var options = {
    count: (isNaN(count) && 1) || Math.abs(count),
    unit: unit || "sentences",
    random: random || false,
    dict: dictionary,
    suffix: getSuffix(suffix)
  };
  var lines = options.dict.lines;
  var paragraphs = options.dict.paragraphs;
  var word = [];
  if (options.random && options.unit === "sentences") {
    var rand = randomInteger(0, lines.length);
    word.push(lines[rand]);
    return word.join(options.suffix);
  }

  if (options.random && options.unit === "paragraphs") {
    var rand = randomInteger(0, paragraphs.length);
    word.push(paragraphs[rand]);
    return word.join(options.suffix);
  }

  if (options.count && options.unit === "paragraphs") {
    for (i = 0; i < count; i++) {
      word.push(paragraphs[i % paragraphs.length]);
    }
    return word.join(options.suffix);
  }

  if (options.count && options.unit === "sentences") {
    for (i = 0; i < count; i++) {
      word.push(lines[i % lines.length]);
    }
    return word.join(options.suffix);
  }
}
module.exports = generator;
