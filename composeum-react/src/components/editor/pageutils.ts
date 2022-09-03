import { Page, Slot, Item, ItemId, Properties } from "composeum-schema"
import * as R from "ramda"

export const findPage = (parentPage: Page, path: string): Page | null => {
  if (parentPage.path === path) {
    return parentPage
  } else {
    for (let child of parentPage.children || []) {
      const result = findPage(child, path)
      if (result) {
        return result
      }
    }
    return null
  }
}

export const findItemInPage = (page: Page, itemId: ItemId): Item | null => {
  return findItem(page.content, itemId)
}

const findItem = (item: Item, itemId: ItemId): Item | null => {
  if (item.itemId === itemId) {
    return item
  }
  for (let slot of Object.values(item.slots || {})) {
    const result = findItemInSlot(slot, itemId)
    if (result) {
      return result
    }
  }
  return null
}

const findItemInSlot = (slot: Slot, itemId: ItemId): Item | null => {
  for (let item of slot) {
    const result = findItem(item, itemId)
    if (result) {
      return result
    }
  }
  return null
}

export type ItemPath = Array<string | number>
export const findItemPathInPage = (
  page: Page,
  itemId: ItemId
): ItemPath | null => {
  return findItemPath(page.content, itemId, ["content"])
}

const findItemPath = (
  item: Item,
  itemId: ItemId,
  path: ItemPath = []
): ItemPath | null => {
  if (item.itemId === itemId) {
    return path
  }
  for (const [key, value] of Object.entries(item.slots || {})) {
    const result = findItemPathInSlot(
      value,
      itemId,
      path.concat(["slots"], key)
    )
    if (result) {
      return result
    }
  }
  return null
}

const findItemPathInSlot = (
  slot: Slot,
  itemId: ItemId,
  path: ItemPath
): ItemPath | null => {
  for (let i = 0; i < slot.length; i++) {
    const result = findItemPath(slot[i], itemId, path.concat(i))
    if (result) {
      return result
    }
  }
  return null
}

export type SlotLocation = { itemId: ItemId; slotName: string }
const findSlot = (page: Page, location: SlotLocation): Slot | null => {
  const slots = findItemInPage(page, location.itemId)?.slots
  return slots ? slots[location.slotName] : null
}

export type ItemLocation = { itemId: ItemId; slotName: string; index: number }

export const moveItem = (
  page: Page,
  source: ItemLocation,
  destination: ItemLocation,
  itemId: ItemId
): Page => {
  const sourceSlot = findSlot(page, source)
  const destinationSlot = findSlot(page, destination)
  if (sourceSlot && destinationSlot) {
    const item = sourceSlot[source.index]
    if (item?.itemId === itemId) {
      sourceSlot.splice(source.index, 1)
      destinationSlot.splice(destination.index, 0, item)
    } else {
      console.log("Item not found. Ignoring action")
    }
  }

  return page
}

export const getDescendantPaths = (page: Page): string[] => {
  if (page.children) {
    return [page.path].concat(
      ...page.children.map((child) => getDescendantPaths(child))
    )
  } else {
    return [page.path]
  }
}

export const updateItem = (
  page: Page,
  itemId: ItemId,
  properties: Properties
): Page => {
  const itemPath = findItemPathInPage(page, itemId)
  if (!itemPath) {
    return page
  }
  const lens = R.lensPath(itemPath.concat(["properties"]))
  const newPage = R.set(lens, properties, page)
  return newPage
}
