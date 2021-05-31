import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Utils
import { capitalize } from "../util/Utils";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PetsIcon from "@material-ui/icons/Pets";

const useStyles = makeStyles((theme) => ({}));

const ViewSubBreed = () => {
  const classes = useStyles();
  const history = useHistory();
  const { breed: dogBreed, subBreed: dogSubBreed } = useParams();

  // ********** STATE **********
  const [breed] = useState(dogBreed);
  const [subBreed] = useState(dogSubBreed);

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
        <Typography variant="h3">{`${capitalize(breed)} ${capitalize(
          subBreed
        )}`}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant="outlined" onClick={() => history.push("/")}>
              <PetsIcon className={classes.petIcon} />
              Back to Breed List
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h2">Coming soon!</Typography>
      </Grid>
    </Grid>
  );
};

export default ViewSubBreed;
