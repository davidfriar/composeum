import * as ItemS from './schemas/item.json'
import * as PageS from './schemas/page.json'

export const ItemSchema = ItemS
export const PageSchema = PageS

export { Item } from './types/item'
export { Page } from './types/page'
export type {
  ComponentTypeName,
  ItemId,
  Property,
  Slot,
  Slots,
} from './types/item'
