import { ComponentType } from "react"
import { JsonSchema7, UISchemaElement } from "@jsonforms/core"

export type ComposeumComponentSchema = JsonSchema7 & {
  $id: string
  $schema: "http://json-schema.org/draft-07/schema#"
  properties: JsonSchema7["properties"]
  type: "object"
  additionalProperties: false
  required: string[]
}
export type ComposeumComponentUISchema = UISchemaElement

export type ComposeumComponent<P = any> = {
  component: ComponentType<P>
  schema: ComposeumComponentSchema
  uiSchema?: ComposeumComponentUISchema
}

import { Text } from "./components/text"
export { Text } from "./components/text"
import { Image } from "./components/image"
export { Image } from "./components/image"

export const allComponents: ComposeumComponent[] = [Text, Image]
