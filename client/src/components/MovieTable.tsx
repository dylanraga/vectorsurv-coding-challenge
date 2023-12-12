import React from "react";

export type Movie = {
  title: string;
  date: string;
  rating: number;
  genre: string;
  studioEmail: string;
};

interface MovieTableProps {
  movies: Movie[];
  isLoading: boolean;
}

export function MovieTable({ movies, isLoading }: MovieTableProps) {
  // Sort movies by date, desc
  const moviesSorted = movies.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  return (
    <div className="flex-auto bg-red-700 p-12 ">
      <h1 className="mb-10 inline-block cursor-default text-4xl font-black tracking-tight text-black">
        Latest Movies
      </h1>

      {isLoading ? (
        <p className="text-red-950">Loading...</p>
      ) : (
        <table className="overflow-hidden rounded-sm [&_:is(td,th)]:px-3 [&_:is(td,th)]:py-1.5 [&_th]:text-left">
          <thead className="bg-red-950 text-red-300">
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Rating</th>
              <th>Genre</th>
              <th>Studio Email</th>
            </tr>
          </thead>
          <tbody className="bg-red-800 font-medium text-red-100 [&>tr:nth-child(odd)]:text-red-300">
            {moviesSorted.map((movie, idx) => (
              <MovieItem key={idx} {...movie} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const MovieItem = React.memo(
  ({ title, date, rating, genre, studioEmail }: Movie) => {
    return (
      <tr>
        <td>{title}</td>
        <td>{formatDateIso8601(date)}</td>
        <td className="flex items-center justify-end">
          <span className="text-xs">⭐</span>
          {rating}
        </td>
        <td>{genre}</td>
        <td>{studioEmail}</td>
      </tr>
    );
  },
);

function formatDateIso8601(iso8601: string) {
  const date = new Date(iso8601);
  const m = date.toLocaleString("default", { month: "long" });
  const d = date.getDate();
  const y = date.getFullYear();

  return `${m} ${d}, ${y}`;
}
