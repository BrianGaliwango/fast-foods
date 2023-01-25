import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState';

const Search = () => {
  const { searchFood } = useContext(GlobalContext)

  const onChange = (e) => {
    const searchText = e.target.value.trim().replace(/" "/g, "");

    searchFood(searchText);
  }

  return (  
      <div className="searchContainer shadow-sm rounded">
        <form role='search' className="mb-2 searchForm">         
          <input className='searchInput form-control' id="filter" type="text" placeholder="search" onChange={onChange}/>               
        </form>
      </div>
  )
}

export default Search