import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Comic } from "../../models/Comic";
import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";

export const ComicAdd = () => {
  const navigate = useNavigate();
  const [comic, setComic] = useState<Comic>({
    name: "",
    issuesNr: 1,
    author: "",
    publisher: "",
  });
  const addComic = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch(`${BACKEND_API_URL}/comics`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comic),
      method: "POST",
    });
    navigate("/comics");
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/comics`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={addComic}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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
              onChange={(event) =>
                setComic({ ...comic, publisher: event.target.value })
              }
            />
            <Button type="submit">Add comic</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
