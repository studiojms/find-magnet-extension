function magnetRegex(exact = false): RegExp {
  return exact
    ? /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?$/i
    : /magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?/gi;
}

function findMagnet(text: string): string[] | undefined {
  let foundData: string[] | undefined = [];
  if (magnetRegex().test(text)) {
    foundData = text.match(magnetRegex())?.map((p) => removeTags(p));
  }

  return foundData;
}

function removeTags(string: string): string {
  return string
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default findMagnet;
