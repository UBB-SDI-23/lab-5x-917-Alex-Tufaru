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
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { Comic } from "../../models/Comic";

export const ComicsShowAll = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [valueToOrderBy] = useState("issuesNr");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setLoading(true);
    fetch(`34.88.117.38/api/comics`, {
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

  const createSortHandler = () => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    if (orderDirection == "asc") {
      comics.sort((a, b) => a.issuesNr - b.issuesNr);
    } else {
      comics.sort((b, a) => a.issuesNr - b.issuesNr);
    }
  };

  return (
    <Container>
      <h1>All comics</h1>
      {loading && <CircularProgress />}
      {!loading && comics.length === 0 && <p>No comics found</p>}
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
                <TableCell align="right" key="issuesNr">
                  <TableSortLabel
                    active={valueToOrderBy === "issuesNr"}
                    direction={orderDirection}
                    onClick={() => createSortHandler()}
                  ></TableSortLabel>
                  Issues Number
                </TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Publisher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comics.map((comic: Comic, index: number) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
