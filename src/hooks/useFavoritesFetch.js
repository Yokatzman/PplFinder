import { useState, useEffect } from "react";
import axios from "axios";



export const useFavoritesFetch = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    setIsLoading(true);
    //get the same users each time-
    //const response = await axios.get(`http://localhost:3002/results`);
    //https://api.jsonbin.io/b/61bde924c260e03be029a9ef
    //const response = await axios.get(`https://my-json-server.typicode.com/Yokatzman/PplDB/results`);
    //const response = await axios.get(`https://api.jsonbin.io/b/61bde924c260e03be029a9ef`);

    //const response = await axios.get(`https://api.jsonbin.io/v3/c/61be09c2b8fdb92a527b3ff1/bins`);
    const response = await axios.get(`https://ppldb.herokuapp.com/results`);

    //console.log(response);
    /*
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    req.open("GET", "https://api.jsonbin.io/v3/c/61be09c2b8fdb92a527b3ff1/bins", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$KXD03S39n1mD.Hyx45nXWeksxgtJeXNmujGO4pLjbDeWLRthVoiom");
    const response = await req.send();*/


    console.log(response);

    setIsLoading(false);
    setFavorites(response.data);
  }

  return { favorites, isLoading, fetchFavorites };
};
