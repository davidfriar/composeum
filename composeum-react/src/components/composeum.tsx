import { Item, Slots, Slot as TSlot, ItemId } from "composeum-schema"

import { ReactComponentMap } from "../types/componentMap"

type Mode = "edit" | "publish"

type ComposeumProps = {
  componentMap: ReactComponentMap
  content: Item
  mode?: Mode
}
export const Composeum = ({ content, componentMap, mode }: ComposeumProps) => {
  return <Container item={content} componentMap={componentMap} mode={mode} />
}

type ContainerProps = {
  item: Item
  componentMap: ReactComponentMap
  mode?: Mode
}

export const Container = ({
  item,
  componentMap,
  mode = "publish",
}: ContainerProps) => {
  const Component = componentMap[item.componentType]

  const renderSlots = (slots: Slots) => {
    return Object.fromEntries(
      Object.entries(slots).map(([name, value]) => [
        name,
        <SlotWrapper mode={mode}>
          <Slot
            name={name}
            slot={value}
            componentMap={componentMap}
            mode={mode}
          />
        </SlotWrapper>,
      ])
    )
  }

  const slots = item.slots ? renderSlots(item.slots) : {}

  return (
    <Wrapper itemId={item.itemId} mode={mode}>
      <Component {...item.properties} slots={slots} />
    </Wrapper>
  )
}

type WrapperProps = {
  itemId: ItemId
  mode: Mode
  children: JSX.Element
}
const Wrapper = ({ itemId, mode, children }: WrapperProps) => {
  switch (mode) {
    case "publish":
      return children
    case "edit":
      return (
        <EditableComponentWrapper itemId={itemId}>
          {children}
        </EditableComponentWrapper>
      )
  }
}

type SlotWrapperProps = {
  mode: Mode
  children: JSX.Element
}
const SlotWrapper = ({ mode, children }: SlotWrapperProps) => {
  switch (mode) {
    case "publish":
      return children
    case "edit":
      return <EditableSlotWrapper>{children}</EditableSlotWrapper>
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
          componentMap={componentMap}
        />
      ))}
    </div>
  )
}

type EditableSlotWrapperProps = {
  children: JSX.Element
}
const EditableSlotWrapper = ({ children }: EditableSlotWrapperProps) => {
  return <div className="Iamaneditslotwrapper">{children}</div>
}

type EditableComponentWrapperProps = {
  itemId: ItemId
  children: JSX.Element
}
const EditableComponentWrapper = ({
  itemId,
  children,
}: EditableComponentWrapperProps) => {
  return (
    <div className="composeum-container" data-item-id={itemId}>
      {children}
    </div>
  )
}
