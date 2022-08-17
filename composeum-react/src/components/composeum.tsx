import { Item, Slots, Slot as TSlot, ItemId } from "composeum-schema"
import { EditableComponentWrapper } from "./editor/editableComponentWrapper"
import { EditableSlotWrapper } from "./editor/editableSlotWrapper"

import { ReactComponentMap } from "../types/componentMap"

type Mode = "edit" | "publish"

type ComposeumProps = {
  componentMap: ReactComponentMap
  content: Item
  mode?: Mode
}
export const Composeum = ({ content, componentMap, mode }: ComposeumProps) => {
  return (
    <Container
      item={content}
      componentMap={componentMap}
      mode={mode}
      isRoot={true}
    />
  )
}

type ContainerProps = {
  item: Item
  index?: number
  componentMap: ReactComponentMap
  mode?: Mode
  isRoot?: boolean
}

export const Container = ({
  item,
  index = 0,
  componentMap,
  mode = "publish",
  isRoot = false,
}: ContainerProps) => {
  const Component = componentMap[item.componentType]

  const renderSlots = (slots: Slots, itemId: ItemId) => {
    return Object.fromEntries(
      Object.entries(slots).map(([name, value]) => {
        return [
          name,
          <SlotWrapper mode={mode} name={name} itemId={itemId}>
            <Slot
              name={name}
              slot={value}
              componentMap={componentMap}
              mode={mode}
            />
          </SlotWrapper>,
        ]
      })
    )
  }

  const slots = item.slots ? renderSlots(item.slots, item.itemId) : {}
  const component = <Component {...item.properties} slots={slots} />
  return isRoot ? (
    component
  ) : (
    <Wrapper itemId={item.itemId} index={index} mode={mode}>
      {component}
    </Wrapper>
  )
}

type WrapperProps = {
  itemId: ItemId
  index: number
  mode: Mode
  children: JSX.Element
}
const Wrapper = ({ itemId, index, mode, children }: WrapperProps) => {
  switch (mode) {
    case "publish":
      return children
    case "edit":
      return (
        <EditableComponentWrapper itemId={itemId} index={index}>
          {children}
        </EditableComponentWrapper>
      )
  }
}

type SlotWrapperProps = {
  mode: Mode
  children: JSX.Element
  itemId: ItemId
  name: string
}
const SlotWrapper = ({ mode, itemId, name, children }: SlotWrapperProps) => {
  switch (mode) {
    case "publish":
      return children
    case "edit":
      return (
        <EditableSlotWrapper itemId={itemId} name={name}>
          {children}
        </EditableSlotWrapper>
      )
  }
}

type SlotProps = {
  name: string
  slot: TSlot
  componentMap: ReactComponentMap
  mode: Mode
}
const Slot = ({ name, slot, componentMap, mode }: SlotProps) => {
  return (
    <div className={`slot-${name}`}>
      {slot.map((item, index) => (
        <Container
          mode={mode}
          key={index}
          item={item}
          index={index}
          componentMap={componentMap}
        />
      ))}
    </div>
  )
}
