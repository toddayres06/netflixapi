import React, {useState} from 'react'
import SearchBar from './Searchbar'

function App() {
  const [locations, setLocations] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [error, setError] = useState('')

// handleSearch is passed through props as onSearch for the searchBar component and 
// takes in a (query) parameter which in searchBar component is the STATE of searchQuery
  
  // Need to expand on this function later. For now it just shows its tied with the Searchbar 
  const handleSearch = async (query) => {
    const url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${query}&country=us`
  
    try {
      if (query === '') {
        throw new Error('Invalid search query'); // Throwing an error with a custom message
      }
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'c18820361cmsh45b10457aa0c7e1p1363c4jsnb0b3e6b6f3a8',
            'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
          }
        });
  
        if (response.ok) {
          const data = await response.json()
          console.log('API Response:', data)
          const results = data.results

          if (results.length > 0) {
            const topLocations = results.slice(0, 3).map((result) => result.locations);
            const topImageURLs = results.slice(0, 3).map((result) => result.picture);
            console.log('Top Locations:', topLocations);
          
            setLocations(topLocations);
            setImageURLs(topImageURLs);
          } else {
            setLocations([]);
            setImageURLs([]);
          }
          
        } else {
          console.error('Search request failed')
        }
      } catch (error) {
        console.error('Error:', error)
        setError("Something went wrong")
      }
  
      console.log(`performing search query with ${query}`)
    } catch (error) {
      console.error('Error:', error)
      setError("Invalid search query")
    }
  }

          // Process the data and extract the locations where the show can be watched
          // const locations = data.results[0]?.locations
          // const imageURL = data.results[0]?.picture
          // setLocations(locations)
          // setImageURL(imageURL)
          // Update the state or perform further actions with the locations data

return (
  <div>
    {error && <div>{error}</div>}
    <SearchBar onSearch={handleSearch} />
    {imageURLs.length > 0 && imageURLs.map((url) => <img key={url} src={url} alt="Show" />)}
    {locations.length > 0 ? (
      <div>
        {locations.map((locationGroup, index) => (
          <div key={index}>
            {locationGroup.map((location) => (
              <div key={location.id}>
                  <div>{location.url}</div>
              </div>
            ))}
          </div>
        ))}
    </div>
  ) : (
    <div>No results found.</div>
  )}
  </div>
  )
}
    
export default App

