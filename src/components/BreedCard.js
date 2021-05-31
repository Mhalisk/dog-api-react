import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Utils
import { capitalize } from "../util/Utils";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  select: {
    width: 200,
  },
  paper: {
    width: 700,
    height: 200,
  },
  breedCardContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
}));

const BreedCard = ({ breed }) => {
  const classes = useStyles();
  const history = useHistory();

  // ********** STATE **********
  const [selectedBreed] = useState(breed[0]);
  const [selectedSubBreed, setSelectedSubBreed] = useState("");

  // ********** UTIL **********
  const viewDog = (selectedBreed, selectedSubBreed) => {
    if (!selectedSubBreed) return history.push(`/view/${selectedBreed}`);
    return history.push(`view/${selectedBreed}/${selectedSubBreed}`);
  };

  return (
    <Grid item>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={3}
          justify="space-evenly"
          className={classes.breedCardContainer}
        >
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              {capitalize(breed[0])}
            </Typography>
          </Grid>
          <Grid item>
            {breed[1].length ? (
              <TextField
                select
                className={classes.select}
                variant="outlined"
                label="Sub-breed"
                value={selectedSubBreed}
                onChange={(e) => setSelectedSubBreed(e.target.value)}
              >
                {breed[1].map((subBreed) => (
                  <MenuItem key={subBreed} value={subBreed}>
                    {capitalize(subBreed)}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <Typography> No sub-breeds </Typography>
            )}
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              alignContent="center"
              alignItems="center"
              spacing={3}
              justify="center"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => viewDog(selectedBreed, selectedSubBreed)}
                >
                  View
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedSubBreed("")}
                  disabled={!selectedSubBreed}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default BreedCard;
