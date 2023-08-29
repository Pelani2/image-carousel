import React, { useEffect, useState } from "react";
import { fetchImagesWithDescriptions } from "../../Utils/carouselImages";
import Button from "../Button";
import "./carousel-styles.scss";

export default function Carousel() {
    const [imagesWithDescriptions, setImagesWithDescriptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImageData = async () => {
            const fetchedImagesWithDescriptions = await fetchImagesWithDescriptions();
            setImagesWithDescriptions(fetchedImagesWithDescriptions);
        };
        fetchImageData();
    }, []);
    
    const formatDescription = (description) => {
        if (!description) return "";
        return description.charAt(0).toUpperCase() + description.slice(1) + ".";
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesWithDescriptions.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesWithDescriptions.length) % imagesWithDescriptions.length);
    };

    return(
        <div className="carousel-container">
            {imagesWithDescriptions.length > 0 && (
                <div className="carousel__image-container">
                    <div className="carousel__image-wrapper">
                        <img 
                            className="carousel-image"
                            src={imagesWithDescriptions[currentIndex].url}
                            alt={`Slide ${currentIndex}`}
                        />
                        <p className="image-description">
                            {formatDescription(imagesWithDescriptions[currentIndex].description)}
                        </p>
                    </div>
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
                    onClick={goToNextSlide}
                    variant="carousel-button"
                >
                    Forwards
                </Button>
            </div>
        </div>
    );
}