import axios from "axios";

const fetchImages = async () => {
    try {
        const response = await axios.get("API_ENDPOINT");
        return response.data;
    } catch (error) {
        console.error("Error fetching images: ", error);
        return [];
    }
};

export default fetchImages;