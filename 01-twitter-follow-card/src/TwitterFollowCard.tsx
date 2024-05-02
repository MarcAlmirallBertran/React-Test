import { useState } from "react"

export function TwitterFollowCard({children, userName, initialIsFollowing}: {children: string, userName: string, initialIsFollowing: boolean}) {

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const imageSrc = `https://unavatar.io/${userName}`
    const imageAlt = `Avatar ${userName}`
    const text = isFollowing ? 'Siguiendo' : 'Seguir'

    return(
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                className='tw-followCard-avatar'
                alt={imageAlt}
                src={imageSrc} />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-text'>{text}</span>
                    <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}