import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Comic } from "../../models/Comic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const ComicEdit = () => {
  const { comicId } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState<Comic>({
    name: "",
    issuesNr: 1,
    author: "",
    publisher: "",
  });
  useEffect(() => {
    fetch(`http://127.0.0.1:80/api/comics/${comicId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => setComic(data));
  }, [comicId]);

  const updateComic = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:80/api/comics/${comicId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comic),
      method: "PUT",
    }).catch((err) => console.log(err));
    navigate("/comics");
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/comics`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={updateComic}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={comic.name}
              onChange={(event) =>
                setComic({ ...comic, name: event.target.value })
              }
            />
            <TextField
              id="issuesNr"
              label="Issues number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={comic.issuesNr}
              onChange={(event) =>
                setComic({ ...comic, issuesNr: Number(event.target.value) })
              }
            />
            <TextField
              id="author"
              label="Author"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={comic.author}
              onChange={(event) =>
                setComic({ ...comic, author: event.target.value })
              }
            />
            <TextField
              id="publisher"
              label="Publisher"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={comic.publisher}
              onChange={(event) =>
                setComic({ ...comic, publisher: event.target.value })
              }
            />
            <Button type="submit">Edit comic</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
