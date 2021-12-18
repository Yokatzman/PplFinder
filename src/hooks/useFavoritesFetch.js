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
    const response = await axios.get(`http://localhost:3002/results`);
    setIsLoading(false);
    setFavorites(response.data);
  }

  return { favorites, isLoading, fetchFavorites };
};
