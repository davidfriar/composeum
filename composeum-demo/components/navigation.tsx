type NavigationProps = {
  links: {title: string, slug: string}[]
}

export const Navigation = ({links}:NavigationProps) => {
  return (
    <ul>
      { links.map((link, index) => {
      return <li key={index}><a href={link.slug}>{link.title}</a></li>
      }
      )
      }
    </ul>
  )
}



