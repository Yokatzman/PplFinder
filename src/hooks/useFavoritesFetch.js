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

    const response = await axios.get(`https://ppldb.herokuapp.com/results`);


    console.log(response);

    setIsLoading(false);
    setFavorites(response.data);
  }

  return { favorites, isLoading, fetchFavorites };
};
