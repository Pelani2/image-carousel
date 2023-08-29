import axios from "axios";

const accessKey = "hxzbByS4cwix3A70p1eW16LQUMSuojQtXkr5hHmjoJk";

export const fetchImagesWithDescriptions = async () => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?count=5&client_id=${accessKey}&include=alt_description`
    );

    const imagesWithDescriptions = response.data.map((image) => ({
      url: image.urls.regular,
      description: image.alt_description,
      author: image.user.name,
    }));

    return imagesWithDescriptions;
  } catch (error) {
    console.error("Error fetching images with descriptions: ", error);
    return [];
  }
};