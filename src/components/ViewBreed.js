import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

// Services
import { fetchRandomDogBreedImagesService } from "../services/DogApiService";

// Utils
import { capitalize } from "../util/Utils";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PetsIcon from "@material-ui/icons/Pets";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: "2vw",
  },
  image: {
    width: 700,
    height: 500,
  },
  buttonImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  petIcon: {
    width: 50,
    height: 50,
    margin: 10,
  },
}));

const ViewBreed = () => {
  const classes = useStyles();
  const history = useHistory();
  const { breed: dogBreed } = useParams();

  // ********** STATE **********
  const [breed, setBreed] = useState(dogBreed);
  const [nextBreed, setNextBreed] = useState("");
  const [breedImages, setBreedImages] = useState([]);
  const [nextBreedImages, setNextBreedImages] = useState([]);

  // ********** SERVICES **********
  const fetchDogBreedImages = useCallback(async (breed, isNextBreed) => {
    const breedImages = await fetchRandomDogBreedImagesService(breed, 4);
    if (!isNextBreed) setBreedImages(breedImages);
    if (isNextBreed) setNextBreedImages(breedImages);

    return localStorage.setItem(breed, JSON.stringify(breedImages));
  }, []);

  // ********** UTIL **********
  const getCachedImagesOrFetch = useCallback(
    async (breed, isNextBreed) => {
      // check local storage for the breedImages
      const cachedImages = JSON.parse(localStorage.getItem(breed));

      if (!isNextBreed) {
        // if it's current breed, set the images to state or fetch new images
        if (cachedImages?.length) return setBreedImages(cachedImages);
        return fetchDogBreedImages(breed, false);
      }

      if (isNextBreed) {
        // if it's the next breed, set the images to state or fetch new images
        if (cachedImages?.length) return setNextBreedImages(cachedImages);
        return fetchDogBreedImages(breed, true);
      }
    },
    [fetchDogBreedImages]
  );

  const handleNextBreedButton = (nextBreed) => {
    history.push(`/view/${nextBreed}`);
    setBreed(nextBreed);
  };

  // ********** EFFECTS **********

  useEffect(() => {
    // On Load
    if (!breed) return;
    // Handle current breed
    getCachedImagesOrFetch(breed, false);

    // Handle next breed
    // Get the current breed index from allBreeds, use that to find the index of the next breed
    const allBreeds = JSON.parse(localStorage.getItem("allDogBreeds"));
    const nextBreedIndex =
      allBreeds.indexOf(allBreeds.find((dogBreed) => dogBreed[0] === breed)) +
      1;
    const nextBreed = allBreeds[nextBreedIndex][0];
    setNextBreed(nextBreed);
    getCachedImagesOrFetch(nextBreed, true);
  }, [breed, getCachedImagesOrFetch]);

  return (
    <Grid
      container
      direction="column"
      spacing={5}
      alignContent="center"
      alignItems="center"
      className={classes.pageContainer}
    >
      <Grid item>
        <Typography variant="h3">{capitalize(breed)}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant="outlined" onClick={() => history.push("/")}>
              <PetsIcon className={classes.petIcon} />
              Back to Breed List
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleNextBreedButton(nextBreed)}
            >
              Next Breed
              <img
                src={nextBreedImages[0]}
                alt={nextBreedImages[0]}
                className={classes.buttonImage}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={3}>
          {breedImages?.map((image, i) => (
            <img src={image} alt={image} className={classes.image} key={i} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewBreed;
