export type ImageProps = {
  alt: string
  url: string
}
const Image = ({ alt, url }: ImageProps) => {
  return <img src={url} alt={alt} />
}
export default Image
