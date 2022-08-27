import { Page, Slot, Item, ItemId } from "composeum-schema"

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
  // console.log(`Enter moveItem: ${JSON.stringify(page)}`)
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

  // console.log(`Leave moveItem: ${JSON.stringify(page)}`)
  return page
}
