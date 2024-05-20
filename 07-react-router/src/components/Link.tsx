import { CLICK, EVENTS } from "../utils/consts"

function navigate (href: string) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }: { target?: string, to: string }) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {

    const isMainEvent = event.button === CLICK.PRIMARY
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}