import { Page, Slot, Item, ItemId, Properties } from "composeum-schema"
import { pipe, lensPath, view, over, insert, remove, set } from "ramda"

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

type SlotPath = Array<string | number>
const findSlotPath = (page: Page, location: SlotLocation): SlotPath | null => {
  const { slotName, itemId } = location
  const itemPath = findItemPathInPage(page, itemId)
  return itemPath ? itemPath.concat(["slots"], [slotName]) : null
}

export type ItemLocation = { itemId: ItemId; slotName: string; index: number }

export const moveItem = (
  page: Page,
  source: ItemLocation,
  destination: ItemLocation,
  itemId: ItemId
): Page => {
  const sourceSlotPath = findSlotPath(page, source)
  const destinationSlotPath = findSlotPath(page, destination)
  if (sourceSlotPath && destinationSlotPath) {
    const sourceLens = lensPath(sourceSlotPath)
    const destinationLens = lensPath(destinationSlotPath)
    const itemPath = sourceSlotPath.concat([source.index])
    const itemLens = lensPath(itemPath)
    const item = view(itemLens, page)
    if (item?.itemId === itemId) {
      return pipe(
        over(sourceLens, remove(source.index, 1)),
        over(destinationLens, insert(destination.index, item))
      )(page)
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
  const lens = lensPath(itemPath.concat(["properties"]))
  const newPage = set(lens, properties, page)
  return newPage
}
