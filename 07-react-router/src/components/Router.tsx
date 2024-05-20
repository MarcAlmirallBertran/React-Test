import { Children, useEffect, useState } from "react"
import { EVENTS } from "../utils/consts"
import { match } from "path-to-regexp"

export function Router ({ children, routes = [], defualtComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationchange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationchange)
    window.addEventListener(EVENTS.POPSTATE, onLocationchange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationchange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationchange)
    }
  }, [])

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  let routeParams = {}

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath)
        return true

    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched)
      return false

    routeParams = matched.params
    return true
  })?.Component
  
  return Page 
    ? <Page routeParams={routeParams} /> 
    : <DefaultComponent />
}