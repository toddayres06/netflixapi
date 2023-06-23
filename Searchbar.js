import React, {useState} from 'react'

const SearchBar = ( {onSearch} ) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onSearch(searchQuery)
    }

    return (
        <div className="form">
            <form onSubmit={handleFormSubmit}>
                <input  type="text" 
                        value={searchQuery} 
                        onChange={handleInputChange} 
                        placeholder="search for movies or shows" 
                        className="search-input" />
                <button type="submit" className="search-btn">Search</button>
            </form>
        </div>
    )
}


export default SearchBar
