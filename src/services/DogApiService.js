import axios from "axios";
import { isValidResponse } from "../util/Utils";

// ********** SERVICES **********
export const fetchAllDogBreedsService = async () => {
  try {
    const allDogBreedsResponse = await axios.get(
      "https://dog.ceo/api/breeds/list/all"
    );

    if (isValidResponse(allDogBreedsResponse)) {
      return Object.entries(allDogBreedsResponse.data.message);
    }

    return {};
  } catch (error) {
    console.log("error: ", error);
  }
};

export const fetchRandomDogBreedImagesService = async (
  breed,
  amountOfImages
) => {
  try {
    const breedImagesResponse = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/${amountOfImages}`
    );

    if (isValidResponse(breedImagesResponse)) {
      return breedImagesResponse.data.message;
    }

    return [];
  } catch (error) {
    console.log("error: ", error);
  }
};
