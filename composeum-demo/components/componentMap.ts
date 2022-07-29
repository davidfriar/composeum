import {ReactComponentMap} from 'composeum-react'
import {HomePage} from '../components/homepage'
import {Navigation} from '../components/navigation'
import {Image} from '../components/image'
import {Text} from '../components/text'
import {Footer} from '../components/footer'

const map : ReactComponentMap = {
  Page : HomePage,
  Navigation : Navigation,
  HeroImage : Image,
  RichText: Text,
  Footer: Footer
}

export default map
