import axios from "axios";

const accessKey = "h6EuMvEw3fpcIipwntO1GEWNbYt7n-tzEAbvSTSZ_88";

const fetchImages = async () => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?count=5&client_id=${accessKey}`);
        const imageUrls = response.data.map((image) => image.urls.regular);
        return imageUrls;
    } catch (error) {
        console.error("Error fetching images: ", error);
        return [];
    }
};

export default fetchImages;