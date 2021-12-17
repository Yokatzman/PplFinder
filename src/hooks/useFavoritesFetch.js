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
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    //get the same users each time-
    //const response = await axios.get(`http://localhost:3002/results`);
    setIsLoading(false);
    setFavorites(response.data);
  }

  return { favorites, isLoading, fetchFavorites };
};
