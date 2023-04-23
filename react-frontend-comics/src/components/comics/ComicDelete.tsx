import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ComicDelete = () => {
  const { comicId } = useParams();
  const navigate = useNavigate();

  const handleDelete = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:80/api/comics/${comicId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      method: "DELETE",
    });
    navigate("/comics");
  };

  const handleCancel = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/comics");
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/comics`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          Are you sure you want to delete this comic? This action cannot be
          undone!
        </CardContent>
        <CardActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardActions>
      </Card>
    </Container>
  );
};
