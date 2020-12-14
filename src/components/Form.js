import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({search, saveSearch, setConsult}) => {

    const [error, setError] = useState(false)

    const {city, country} = search;

    const handleChange = e => {
        //act state
        saveSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validate
        if(city.trim() === '' || country.trim() === ''){
            setError(true)
            return;
        }

        setError(false)

        setConsult(true);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error msg='All fields are required'/> : null}
            <div className="input-field col s12">
                <input
                    type='text'
                    name='city'
                    id='city'
                    value={city}
                    onChange={handleChange}
                />
                <label htmlFor='city'>City: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name='country'
                    id='country'
                    value={country}
                    onChange={handleChange}
                >
                    <option>--- Select a country ---</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor='country'>Country: </label>
            </div>

            <div className="input-field col s12">
                <button
                        type="submit"
                        className="waves-effect waves-light btn-large btn-block blue accent-4 col s12"
                    >Search weather</button>
            </div>
        </form>
     );
}


Form.propTypes = {
    search: PropTypes.object.isRequired,
    saveSearch: PropTypes.func.isRequired,
    setConsult: PropTypes.func.isRequired
}
 
export default Form;