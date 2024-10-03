export function atcudExtractor(text: string): string | null {
  let regex = /ATCUD:\s*([A-Z0-9-]+)/
  let match = text.match(regex)

  if (!match) {
    regex = /ATEUD:\s*([A-Z0-9-]+)/
    match = text.match(regex)
  }

  if (!match) {
    regex = /CUD:\s*([A-Z0-9-]+)/
    match = text.match(regex)
  }

  if (!match) {
    regex = /CUD :\s*([A-Z0-9-]+)/
    match = text.match(regex)
  }

  return match ? match[1] : null
}
