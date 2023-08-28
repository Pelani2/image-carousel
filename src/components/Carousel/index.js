import React, { useEffect, useState } from "react";
import fetchImages from "../../Utils/carouselImages";
import Button from "../Button";
import "./carousel-styles.scss";

export default function Carousel() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const fetchImagesAndSetState = async () => {
            const fetchedImages = await fetchImages();
            setImages(fetchedImages);
        };
        fetchImagesAndSetState();
    }, []);

    return(
        <div className="carousel-container">
            <Button
                onClick={goToPreviousSlide}
                variant="carousel-button backwards"
            >
                Backwards
            </Button>
            {images.length > 0 && (
                <div className="carousel__image-container">
                    <img 
                        className="carousel-image"
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                    />
                </div>
            )}
            <Button
                onClick={goToNextSlide}
                variant="carousel-button forwards"
            >
                Forwards
            </Button>
        </div>
    );
}