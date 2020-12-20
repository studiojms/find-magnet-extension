function magnetRegex(exact = false): RegExp {
  return exact
    ? /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?$/i
    : /magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?/gi;
}

function findMagnet(text: string): string[] | undefined {
  let foundData: string[] | undefined = [];
  const unescapedText = unescape(text);
  if (magnetRegex().test(unescapedText)) {
    foundData = unescapedText.match(magnetRegex())?.map((p) => removeTags(p));
  }

  return foundData;
}

const htmlUnescapes: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * This method converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 */
function unescape(string: string): string {
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'")
    : string || '';
}

function removeTags(string: string): string {
  return string
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default findMagnet;
