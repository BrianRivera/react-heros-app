import React, { useMemo } from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHerosByName';

export const SearchScreen = ({history}) => {


    const location = useLocation();
    const {q} = queryString.parse(location.search);

    const [formValue, handleInputChange] = useForm({
        busqueda:q
    });
    const {busqueda} = formValue;

    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${busqueda}`);
    }
    const heroesFilter = useMemo(() =>  getHeroByName(busqueda), [q]);
 

    return (
        <div>
            <h1>Search SearchScreen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr/>
                    
                    <form onSubmit={handleSearch}>
                        <input 
                        type="text" 
                        name="busqueda"
                        placeholder="Find your hero"
                        className="form-control"
                        value={busqueda}
                        onChange={handleInputChange}
                        />

                        <button
                        type="submit"
                        className="btn m-1 btn-block btn-outline-primary"
                        >Search...</button>

                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                   {
                        (!q || q === '') && 
                        <div className="alert alert-info">
                             Search a hero
                         </div>
                    }

                    {
                       (q !== '' && q && heroesFilter.length === 0) && 
                       <div className="alert alert-danger">
                            no se a encontrado el heroe {q}
                        </div> 
                    }

                    {
                        heroesFilter.map(hero =>(
                            <HeroCard
                            key={hero.id}
                            {...hero}
                            >
                            </HeroCard>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
