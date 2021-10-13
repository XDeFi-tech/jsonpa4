/**
 *
 * @param {string} key
 * @returns
 */
const removeBrackets = (key) => key.substring(1, key.length - 1)

/**
 *
 * @param {string} template
 * @param {boolean} isMulti
 * @returns
 */
const urlTransformator =
  (template, isMulti) =>
  ({ addresses }) =>
    isMulti
      ? [
          template.replace(
            /(\{[a-z_0-9]+\})/gi,
            (key) => ({ addresses }[removeBrackets(key)]),
          ),
        ]
      : addresses.map((address) =>
          template.replace(
            /(\{[a-z_0-9\-]+\})/gi,
            (key) => ({ addresses, address }[removeBrackets(key)]),
          ),
        )

/**
 *
 * @param {string} template
 * @param {object} data
 * @returns
 */
const jsonTransformator = (template, data) =>
  JSON.parse(
    template.replace(/(\{[a-z_0-9\-]+\})/gi, (key) =>
      JSON.stringify(data[removeBrackets(key)]),
    ),
  )

module.exports = { urlTransformator, jsonTransformator }
