import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Text, TextProps } from "../components/text/text"
import schema from "../components/text/text.schema.json"
import uiSchema from "../components/text/text.ui-schema.json"

import { Editor } from "../editor/editor"
import { useState } from "react"
export default {
  title: "Text",
  component: Text,
} as ComponentMeta<typeof Text>

export const Component: ComponentStory<typeof Text> = (args) => (
  <Text {...args} />
)
Component.args = {
  text: "I am he as you are he as you are me And we are all together",
}

export const WithEditor: ComponentStory<typeof Text> = (args) => {
  const [data, setData] = useState(args)

  return <Editor<TextProps> data={data} setData={setData} schema={schema} />
}
WithEditor.args = {
  text: "I am he as you are he as you are me And we are all together",
}
