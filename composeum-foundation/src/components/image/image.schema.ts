import { ComposeumComponentSchema } from "composeum-react"
const schema: ComposeumComponentSchema = {
  $id: "https://schemas.composeum.io/foundation/image",
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    url: {
      title: "Image url",
      type: "string",
      description: "The URL that will be used as the source of the image",
      format: "uri",
    },
    alt: {
      title: "Alt text",
      type: "string",
      description:
        "Alt text is the written copy that appears in place of an image on a webpage if the image fails to load on a user's screen. This text helps screen-reading tools describe images to visually impaired readers and allows search engines to better crawl and rank your website.",
    },
  },
  additionalProperties: false,
  required: ["url", "alt"],
}
export default schema
