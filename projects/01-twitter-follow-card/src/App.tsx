import { TwitterFollowCard } from './TwitterFollowCard'
import './App.css'

const user_list = [
    {
        userName: 'levelsio',
        name: 'levelsio',
        isFollowing: true
    },
    {
        userName: 'DotCSV',
        name: 'Carlos Santana',
        isFollowing: true
    },
    {
        userName: 'david_bonilla',
        name: 'David Bonilla',
        isFollowing: false
    },
]

export function App() {

    return(
        <section className='App'>
            {
                user_list.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}