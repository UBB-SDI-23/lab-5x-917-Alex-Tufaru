import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useParams } from "react-router-dom";

export const ComicFilter = () => {
  const { nr } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:80/api/comics/filter/${nr}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComics(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h1>All filtered comics</h1>
      {loading && <CircularProgress />}
      {!loading && comics.length === 0 && (
        <p>No comics found after filtering</p>
      )}
      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`/comics/add`}>
          <Tooltip title="Add a new comics" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}
      {!loading && comics.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Issues Number</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Publisher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comics.map(
                (
                  comic: {
                    id: any;
                    name: any;
                    issuesNr: any;
                    author: any;
                    publisher: any;
                  },
                  index: number
                ) => (
                  <TableRow key={comic.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/comics/${comic.id}/details`}
                        title="View comics details"
                      >
                        {comic.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right" scope="row">
                      {comic.issuesNr}
                    </TableCell>
                    <TableCell align="right" scope="row">
                      {comic.author}
                    </TableCell>
                    <TableCell align="right" scope="row">
                      {comic.publisher}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/comics/${comic.id}/details`}
                      >
                        <Tooltip title="View comic details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/comics/${comic.id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/comics/${comic.id}/delete`}
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    // <div className="App">
    //   <h1>Comics list</h1>
    //   <table>
    //     <tr>
    //       <th>#</th>
    //       <th>Name</th>
    //       <th>Issues Number</th>
    //       <th>Author</th>
    //       <th>Publisher</th>
    //     </tr>
    //     {comics.map((comic: Comic, index: number) => (
    //       <tr key={index}>
    //         <td>{index}</td>
    //         <td>{comic.name}</td>
    //         <td>{comic.issuesNr}</td>
    //         <td>{comic.author}</td>
    //         <td>{comic.publisher}</td>
    //       </tr>
    //     ))}
    //   </table>
    // </div>
  );
};
