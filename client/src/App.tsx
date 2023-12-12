import { MovieTable } from "./components/MovieTable.tsx";
import { MovieForm } from "./components/MovieForm.tsx";
import { useMovies } from "./hooks/useMovies.tsx";

function App() {
  const { movies, isLoading, refetch } = useMovies();

  return (
    <div className="relative flex min-h-screen flex-col gap-4 bg-black p-4">
      <MovieForm refetch={refetch} />

      <MovieTable isLoading={isLoading} movies={movies} />

      <div className="fixed bottom-5 right-6 cursor-default font-bold text-black opacity-50">
        🖤Dylan Raga
      </div>
    </div>
  );
}

export default App;
