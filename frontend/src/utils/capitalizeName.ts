export function capitalizeName(str: string) {
  return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
    return char.toUpperCase();
  });
}
