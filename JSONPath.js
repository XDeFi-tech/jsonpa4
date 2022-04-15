/**
 *
 * @param {String} contextChar
 */
function getContext(contextChar) {
  if (contextChar.startsWith("$")) {
    return contextChar.substring(1) || "local";
  }
  if (contextChar === "&") {
    return "global";
  }
  return "result";
}

/**
 *
 * @param {string} part
 */
function isRelativePart(part) {
  return part[0] === "{" && part[part.length - 1] === "}";
}

/**
 *
 * @param {string} part
 */
function countOpen(part) {
  return (part.match(/\{/g) || []).length;
}

/**
 *
 * @param {string} part
 */
function countClose(part) {
  return (part.match(/}/g) || []).length;
}

const INDEX_KEY = "$$$";

class JSONPath {
  /**
   *
   * @param {String} path
   * @param {import("./Operation").Context} context
   */
  constructor(path, context) {
    this.path = path;
    const [contextChar, ...restParts] = path.split("/");
    this.context = getContext(contextChar);
    this.parts = restParts
      .reduce((result, part) => {
        if (result.length === 0) {
          return [part];
        }

        const prevPart = result[result.length - 1];

        if (countOpen(prevPart) === countClose(prevPart)) {
          return [...result, part];
        }
        result[result.length - 1] = prevPart + "/" + part;

        return result;
      }, [])
      .map((part) => {
        if (isRelativePart(part)) {
          const relativePath = new JSONPath(
            part.substring(1, part.length - 1),
            context
          );

          return relativePath.get(context[relativePath.context]);
        }

        return part;
      });
  }

  isMainObjectPath() {
    return this.parts.length === 1 && this.parts[0] === "";
  }

  /**
   *
   * @param {any} obj
   * @returns
   */
  get(obj) {
    if (this.isMainObjectPath()) return obj;
    return this.parts.reduce(
      (result, part) =>
        typeof part === "string" && part.startsWith(INDEX_KEY)
          ? result[Object.keys(result)[part.substring(INDEX_KEY.length)]]
          : result[part],
      obj
    );
  }

  /**
   *
   * @param {any} obj
   * @param {any} newValue
   */
  update(obj, newValue) {
    if (this.isMainObjectPath()) return newValue;
    let temp = obj;
    for (let i = 0; i < this.parts.length; i++) {
      const part =
        typeof this.parts[i] === "string" &&
        this.parts[i].startsWith(INDEX_KEY) &&
        temp
          ? Object.keys(temp)[this.parts[i].substring(INDEX_KEY.length)]
          : this.parts[i];

      if (!temp[part]) {
        if (Number.isNaN(parseInt(part, 10))) {
          temp[part] = [];
        } else {
          temp[part] = {};
        }
      }

      if (i + 1 === this.parts.length) {
        temp[part] = newValue;
        continue;
      }
      temp = temp[part];
    }
    return obj;
  }

  /**
   *
   * @param {any} obj
   */
  delete(obj) {
    if (this.isMainObjectPath()) return undefined;
    let prevTemp = undefined;
    let temp = obj;
    for (let i = 0; i < this.parts.length; i++) {
      const prevPart =
        typeof this.parts[i - 1] === "string" &&
        this.parts[i - 1].startsWith(INDEX_KEY) &&
        prevTemp
          ? Object.keys(prevTemp)[this.parts[i - 1].substring(INDEX_KEY.length)]
          : this.parts[i - 1];
      const part =
        typeof this.parts[i] === "string" &&
        this.parts[i].startsWith(INDEX_KEY) &&
        temp
          ? Object.keys(temp)[this.parts[i].substring(INDEX_KEY.length)]
          : this.parts[i];

      if (i + 1 === this.parts.length) {
        if (temp && Array.isArray(temp[prevPart])) {
          temp[prevPart] = temp[prevPart].filter((_, i) => i !== part);
          continue;
        }
        delete temp[part];
        continue;
      }

      if (!temp[part]) {
        return obj;
      }
      prevTemp = temp;
      temp = temp[part];
    }

    return obj;
  }

  /**
   *
   * @param {any} obj
   * @param {any} value
   */
  add(obj, value) {
    if (this.isMainObjectPath()) {
      if (Array.isArray(obj)) {
        return obj.concat(value);
      }
      return obj ? obj + value : value;
    }

    let temp = obj;
    for (let i = 0; i < this.parts.length; i++) {
      const part =
        typeof this.parts[i] === "string" &&
        this.parts[i].startsWith(INDEX_KEY) &&
        temp
          ? Object.keys(temp)[this.parts[i].substring(INDEX_KEY.length)]
          : this.parts[i];

      if (i + 1 === this.parts.length) {
        if (temp && Array.isArray(temp[part])) {
          temp[part].push(value);
          continue;
        }
        if (temp[part]) {
          temp[part] += value;
          continue;
        }
        temp[part] = value;

        continue;
      }
      if (!temp[part]) {
        return obj;
      }
      temp = temp[part];
    }
    return obj;
  }
}

module.exports = JSONPath;
