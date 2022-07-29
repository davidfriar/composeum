export type Folder = {
  path: string
  folders: Folder[] | undefined
  items: string
}
