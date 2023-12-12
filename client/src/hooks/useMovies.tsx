import { useEffect, useState } from "react";
import { Movie } from "../components/MovieTable.tsx";

export function useMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(null);

  const fetchMovies = () => {
    setIsLoading(true);
    const t0 = performance.now();
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const elapsed = performance.now() - t0;
        // set artificial minimum delay of 500ms
        setTimeout(
          () => {
            setMovies(data);
            setIsLoading(false);
            console.log(
              `[info]: fetched movies after ${elapsed.toFixed(1)} ms`,
            );
          },
          Math.max(0, 500 - elapsed),
        );
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, isLoading, error, refetch: fetchMovies };
}
