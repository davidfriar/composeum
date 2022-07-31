import Link from "next/link"

type NavigationProps = {
  links: { title: string; slug: string }[]
}

export const Navigation = ({ links }: NavigationProps) => {
  return (
    <nav>
      <ul>
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link href={link.slug}>{link.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
