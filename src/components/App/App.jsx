import React, { useState, useEffect } from 'react'
import './app.css'

const search = (items, term) => {
  if (term.length === 0) return items
  return items.filter((item) => item.toLowerCase().includes(term.toLowerCase()))
}

const App = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTitles, setFilteredTitles] = useState([])

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (searchTerm.length !== 0) return
    setFilteredTitles([])
  }, [searchTerm.length])

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=man&apikey=4a3b711b')
      .then((responce) => responce.json())
      .then((json) => setData(json.Search))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="movies">
      <div className="name">Marvel movies</div>
      <div className="search">
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <button
          type="submit"
          className="btn btn-outline-secondary"
          onClick={() =>
            setFilteredTitles(
              search(
                data.map(({ Title }) => Title),
                searchTerm
              )
            )
          }
        >
          SEARCH
        </button>
      </div>
      <div className="box">
        {data.map(({ Poster, Title, Year, imdbID }) => {
          if (filteredTitles.length > 0 && !filteredTitles.includes(Title)) return null

          return (
            <div key={imdbID} className="main-poster">
              <div className="title">{Title}</div>
              <img className="image" src={Poster} alt="movies" />
              <div className="year">({Year})</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default App
