import { useState } from "react";
import { Comic } from "../../models/Comic";

export const ShowAllComics = () => {
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);
  setLoading(true);
  fetch("http://localhost/api/comics")
    .then((result) => result.json)
    .then((data) => {
      setComics(data);
      setLoading(false);
    });

  return (
    <div className="App">
      <h1>Comics list</h1>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Issues Number</th>
          <th>Author</th>
          <th>Publisher</th>
        </tr>
        {comics.map((comic: Comic, index: number) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{comic.name}</td>
            <td>{comic.issuesNr}</td>
            <td>{comic.author}</td>
            <td>{comic.publisher}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
