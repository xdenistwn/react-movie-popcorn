import { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      // optional chaning function
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // handleClose();
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong.");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");

        return;
      }

      const delay = setTimeout(() => fetchMovies(), 500);

      return function () {
        clearTimeout(delay);
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
