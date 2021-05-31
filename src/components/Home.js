import React, { useEffect, useState, useCallback } from "react";

// Services
import { fetchAllDogBreedsService } from "../services/DogApiService";

// Components
import BreedCard from "./BreedCard";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#D6D2D2",
    },
  },
  root: { margin: "2vw 5vw 0 5vw" },
}));

const Home = () => {
  const classes = useStyles();
  // ********** STATE **********
  const [allDogBreeds, setAllDogBreeds] = useState([]);

  // ********** SERVICES **********
  const fetchAllDogBreeds = useCallback(async () => {
    const allDogBreeds = await fetchAllDogBreedsService();
    setAllDogBreeds(allDogBreeds);
    localStorage.setItem("allDogBreeds", JSON.stringify(allDogBreeds));
  }, []);

  // ********** EFFECTS **********
  useEffect(() => {
    fetchAllDogBreeds();
  }, [fetchAllDogBreeds]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        spacing={5}
        alignContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3">Dog API</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Implementation by Michael Halisky
          </Typography>
        </Grid>
        {allDogBreeds.map((breed) => (
          <BreedCard breed={breed} key={breed[0]} />
        ))}
      </Grid>
    </div>
  );
};

export default Home;
