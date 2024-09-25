import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/Search";
// import beersJSON from "./../assets/beers.json";
import axios from "axios";

/*  BONUS * * * * * * * 
  - filter the beers name
  - use SearchBar component
  - every new letter in the SearchBar --> request to https://ih-beers-api2.herokuapp.com/beers/search?q={query}
  - pass the input value as the q param
*/



function AllBeersPage() {
  // Mock initial state, to be replaced by data from the API. Once you retrieve the list of beers from the Beers API store it in this state variable.
  
  const [beers, setBeers] = useState(null); // initialized as null
  // const [beers, setBeers] = useState([]); // stores beers data; beter than null?
  const [ searchedBeer, setSearchedBeer] = useState('')

  // // TASKS:
  // // 1. Set up an effect hook to make a request to the Beers API and get a list with all the beers.
  // useEffect(() => {
  //   // 2. Use axios to make a HTTP request.
  //   axios.get(`${import.meta.env.VITE_BEERS_API}`)
  //   .then(({data}) => {
  //     console.log(data)
  //     // 3. Use the response data from the Beers API to update the state variable.
  //     setBeers(data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  // BONUS:
  useEffect(() => {
    const fetchBeers = async () => {// fetches all / searched beers
    try {
      if (searchedBeer) { // pass input as the parameter if there's a search
        const response = await axios.get(`${import.meta.env.VITE_BEERS_API}/search?q=${searchedBeer}`)
        setBeers(response.data)
      } else { // gets all the beers if there's no search
        const response = await axios.get(`${import.meta.env.VITE_BEERS_API}`)
        setBeers(response.data)
      }
    } catch (error) {
      console.log(error)      
    }
  }
    
    fetchBeers()
  }, [searchedBeer]) // runs useEffect everytime serachedBeer == user input changes




  // The logic and the structure for the page showing the list of beers. You can leave this as it is for now.
  return (
    <>
      <Search onSearch={setSearchedBeer} />

      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {beers &&
          beers.map((beer, i) => {
            return (
              <div key={i}>
                <Link to={"/beers/" + beer._id}>
                  <div className="card m-2 p-2 text-center" style={{ width: "24rem", height: "18rem" }}>
                    <div className="card-body">
                      <img
                        src={beer.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + beer.name}
                      />
                      <h5 className="card-title text-truncate mt-2">{beer.name}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className="card-text">
                        Created by: {beer.contributed_by}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllBeersPage;
