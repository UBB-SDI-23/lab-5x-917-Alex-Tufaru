import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

export const ComicFilterChooseNumber = () => {
  const navigate = useNavigate();
  const [nr, setNr] = useState<Number>();

  const goToFilter = () => {
    navigate(`/comics/filter/${nr}`);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/comics`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          Show the comics with more issues than:
          <TextField
            id="nr"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(event) => setNr(Number(event.target.value))}
          />
          <Button onClick={goToFilter}>Filter</Button>
        </CardContent>
      </Card>
    </Container>
  );
};
