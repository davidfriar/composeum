export const appendTrailingSlash = (s: string) => {
  return s.endsWith("/") ? s : `${s}/`
}

export const stripLeadingSlash = (s: string) => {
  return s.startsWith("/") ? s.slice(1) : s
}

export const stripTrailingSlash = (s: string) => {
  return s.endsWith("/") ? s.slice(0, s.length - 1) : s
}

export const stripFileExtension = (s: string) => {
  return s.replace(/\.[^\/]*$/, "")
}

export const appendJSONFileExtension = (s: string) => {
  return s.endsWith(".json") ? s : `${s}.json`
}

export const normalisePathString = (s: string) => {
  return stripLeadingSlash(stripTrailingSlash(stripFileExtension(s)))
}

export const stringToPathArray = (s: string) => {
  return normalisePathString(s).split("/")
}
