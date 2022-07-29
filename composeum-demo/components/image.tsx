type ImageProps = {
  src: string
  alt: string
}

export const Image = ({alt, src}:ImageProps) => {
  return <img src={src} alt={alt} />
}



