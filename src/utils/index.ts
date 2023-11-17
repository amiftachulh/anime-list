export function sentenceCase(str: string) {
  return str.toLowerCase().split(" ").map(s => (
    s.replace(s[0], s[0].toUpperCase())
  )).join(" ");
}
