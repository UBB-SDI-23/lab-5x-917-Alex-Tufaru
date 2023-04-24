import { Link, useParams } from "react-router-dom";
import { Comic } from "../../models/Comic";
import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";

export const ComicDetails = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState<Comic>();

  useEffect(() => {
    fetch(`${BACKEND_API_URL}/comics/${comicId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => setComic(data));
  }, [comicId]);

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/comics`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <h1>Comic details</h1>
          <p>Comic name: {comic?.name}</p>
          <p>Issues number: {comic?.issuesNr}</p>
          <p>Comic issues:</p>
          <ul>
            {comic?.issues?.map(
              (issue: {
                id: any;
                title: any;
                issueNr: any;
                publicationDate: any;
                pageCount: any;
              }) => (
                <li key={issue.id}>{issue.title}</li>
              )
            )}
          </ul>
          <p>Author: {comic?.author}</p>
          <p>Publisher: {comic?.publisher}</p>
        </CardContent>
        <CardActions>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/comics/${comicId}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/comics/${comicId}/delete`}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};
