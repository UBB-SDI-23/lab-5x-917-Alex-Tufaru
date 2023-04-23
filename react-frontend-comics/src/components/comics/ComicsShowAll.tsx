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

export const ComicsShowAll = (props: any) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;

  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:80/api/comics", {
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

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
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
                    direction={
                      valueToOrderBy == "issuesNr" ? orderDirection : "asc"
                    }
                    onClick={createSortHandler("issuesNr")}
                  ></TableSortLabel>
                  Issues Number
                </TableCell>
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
  );
};
