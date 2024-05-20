import { Link } from "../components/Link";

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Buenas, me llamo Marc y estoy creando un react router desde cero'
  },
  en: {
    title: 'About us',
    description: 'Hello, my name is Marc and I am creating a react router from scratch'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }: { routeParams: MatchResult<object> }) {
  const i18n = useI18n(routeParams.lang ?? 'en')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src="https://via.placeholder.com/150" alt="Picture of Me" />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>Home</Link>
    </>
  )
}