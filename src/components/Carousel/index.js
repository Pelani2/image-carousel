import React, { useEffect, useState } from "react";
import { fetchImagesWithDescriptions } from "../../Utils/carouselImages";
import Button from "../Button";
import { saveAs } from "file-saver";
import "./carousel-styles.scss";

export default function Carousel() {
    const [imagesWithDescriptions, setImagesWithDescriptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        const fetchImageData = async () => {
            const fetchedImagesWithDescriptions = await fetchImagesWithDescriptions();
            setImagesWithDescriptions(fetchedImagesWithDescriptions);
        };
        fetchImageData();
    }, []);

    useEffect(() => {
        let interval;

        if (autoplay) {
            interval = setInterval(goToNextSlide, 5000);
        }

        return () => clearInterval(interval);
    }, [autoplay]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesWithDescriptions.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesWithDescriptions.length) % imagesWithDescriptions.length);
    };

    const formatDescription = (description) => {
        if (!description) return "";
        return description.charAt(0).toUpperCase() + description.slice(1) + ".";
    };

    const downloadCurrentImage = () => {
        const imageUrl = imagesWithDescriptions[currentIndex].url;
        const imageName = `Slide ${currentIndex + 1}.jpg`;

        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                saveAs(blob, imageName);
            });
    };

    return(
        <div className="carousel-container">
            {imagesWithDescriptions.length > 0 && (
                <div className="carousel__image-container">
                    <div className="image-information">
                            <p className="information__description">
                                {formatDescription(imagesWithDescriptions[currentIndex].description)}
                            </p>
                            <p className="information__author">
                                By: {imagesWithDescriptions[currentIndex].author}
                            </p>
                    </div>
                        <img 
                            className="carousel-image"
                            src={imagesWithDescriptions[currentIndex].url}
                            alt={`Slide ${currentIndex}`}
                        />
                </div>
            )}
            <div className="carousel__controls">
                <Button
                    onClick={goToPreviousSlide}
                    variant="carousel-button"
                >
                    Backwards
                </Button>
                <Button
                    onClick={() => setAutoplay(!autoplay)}
                    variant="carousel-button"
                >
                    {autoplay ? "Pause Autoplay" : "Start Autoplay"}
                </Button>
                <Button
                    onClick={downloadCurrentImage}
                    variant="carousel-button"
                >
                    Download
                </Button>
                <Button
                    onClick={goToNextSlide}
                    variant="carousel-button"
                >
                    Forwards
                </Button>
            </div>
        </div>
    );
}