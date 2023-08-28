import React, { useEffect, useState } from "react";
import fetchImages from "../../Utils/carouselImages";
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
            <button className="carousel-button" onClick={goToPreviousSlide}>
                Backwards
            </button>
            {images.length > 0 && (
                <img 
                    className="carousel-image"
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                />
            )}
            <button className="carousel-button" onClick={goToNextSlide}>
                Forward
            </button>
        </div>
    );
}