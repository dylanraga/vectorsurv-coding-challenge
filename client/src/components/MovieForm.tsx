import { useState } from "react";
import { FormRatingField } from "./FormRatingField.tsx";
import { ZodIssue } from "zod";

interface MovieFormError {
  title?: string;
  date?: string;
  rating?: string;
  genre?: string;
  studioEmail?: string;
}

interface MovieFormProps {
  refetch: () => void;
}

const formErrorClassName = (field?: string) =>
  field ? "outline outline-1 outline-red-600" : "";

export function MovieForm({ refetch }: MovieFormProps) {
  const [formErrors, setFormErrors] = useState<MovieFormError>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const clientFormErrors = validateFields(formData);
    if (clientFormErrors) {
      setFormErrors(clientFormErrors);
      return;
    }

    const body = JSON.stringify(Object.fromEntries(formData));

    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      body,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          res.json().then((data) => {
            const issueMap = parseZodIssues(data.issues);

            setFormErrors(issueMap);
          });
        } else {
          setFormErrors({});
          res.json().then(refetch);
        }
      })
      .catch(console.error);
  };

  return (
    <div className=" bg-neutral-900 p-12">
      <h1 className="mb-6 inline-block cursor-default bg-gradient-to-br from-red-100 to-red-300 bg-clip-text font-medium text-transparent">
        New Movie
      </h1>
      <form
        className="flex flex-col [&>div]:flex [&>div]:items-center [&>div]:py-1 [&_label]:w-36 [&_label]:font-medium [&_label]:text-neutral-300"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div>
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={formErrorClassName(formErrors.title)}
          />
          {formErrors.title && <MovieFormError message={formErrors.title} />}
        </div>
        <div>
          <label htmlFor="date">Release Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={formErrorClassName(formErrors.date)}
          />
          {formErrors.date && <MovieFormError message={formErrors.date} />}
        </div>
        <div>
          <label>Rating</label>
          <FormRatingField />
          {formErrors.rating && <MovieFormError message={formErrors.rating} />}
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            className={"cursor-pointer " + formErrorClassName(formErrors.genre)}
            name="genre"
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
          {formErrors.genre && <MovieFormError message={formErrors.genre} />}
        </div>
        <div>
          <label htmlFor="email">Studio Email</label>
          <input
            type="email"
            id="email"
            name="studioEmail"
            className={formErrorClassName(formErrors.studioEmail)}
          />
          {formErrors.studioEmail && (
            <MovieFormError message={formErrors.studioEmail} />
          )}
        </div>
        <div className="mt-4">
          <MovieFormSubmit />
        </div>
      </form>
    </div>
  );
}

function MovieFormSubmit() {
  return (
    <button className="flex items-center gap-2 rounded-md border-2 border-red-400 bg-[oklch(20%_0.03_20)] py-1 pl-4 pr-5 font-medium text-red-400 transition-all duration-100 ease-out hover:font-bold hover:outline hover:outline-[3px] hover:outline-red-400 focus:font-bold focus:outline focus:outline-[3px] focus:outline-red-400">
      <span className="mb-1 text-2xl">+</span> Add Movie
    </button>
  );
}

function MovieFormError({ message }: { message?: string }) {
  return (
    <p className="ml-2 flex items-center gap-0.5 text-red-300">
      <span className="text-xs">❌</span>
      {message}
    </p>
  );
}

function parseZodIssues(issues: ZodIssue[]) {
  const issueMap = {};
  for (const i of issues) {
    Object.defineProperty(issueMap, i.path[0], { value: i.message });
  }
  return issueMap;
}

function validateFields(formData: FormData) {
  const formErrors: Record<string, string> = {};
  for (const [k, v] of formData) {
    if (!v || Number(v) === 0) {
      formErrors[k] = "Cannot leave blank";
    }
  }
  return formErrors;
}
