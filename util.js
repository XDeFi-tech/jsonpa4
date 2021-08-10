const removeBrackets = (key) => key.substring(1, key.length - 1);

const urlTransformator = (template, isMulti) => ({ addresses }) =>
  isMulti
    ? [
        template.replace(
          /(\{[a-z_0-9]+\})/gi,
          (key) => ({ addresses }[removeBrackets(key)])
        ),
      ]
    : addresses.map((address) =>
        template.replace(
          /(\{[a-z_0-9]+\})/gi,
          (key) => ({ addresses, address }[removeBrackets(key)])
        )
      );

module.exports = { urlTransformator };
