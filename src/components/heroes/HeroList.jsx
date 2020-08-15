import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({Publisher}) => {

    const heroes = useMemo(() => getHeroesByPublisher(Publisher), [Publisher])

    return (
        <div className="card-columns animate__animated animate__bounce">
            {
            heroes.map(hero =>(
                <HeroCard key={hero.id} {...hero}>
                </HeroCard>
            ))
            }
        </div>
    )
}
