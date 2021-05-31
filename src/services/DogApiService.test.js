import {
  fetchAllDogBreedsService,
  fetchRandomDogBreedImagesService,
} from "./DogApiService";

test("fetches all dog breeds", async () => {
  const allDogBreeds = await fetchAllDogBreedsService();
  expect(Boolean(allDogBreeds.length)).toEqual(true);
});

test("fetches four random images of a dog breed", async () => {
  const amountOfImages = 4;

  const breedImages = await fetchRandomDogBreedImagesService(
    "hound",
    amountOfImages
  );

  expect(breedImages.length).toEqual(amountOfImages);
});
