import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchImagesWithDescriptions } from "../../Utils/carouselImages";
import Button from "../Button";
import { saveAs } from "file-saver";
import "./carousel-styles.scss";
import "./carousel-animations.scss";

export default function Carousel() {
    const [imagesWithDescriptions, setImagesWithDescriptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [slideDirection, setSlideDirection] = useState("next");
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const fetchImageData = async () => {
            const fetchedImagesWithDescriptions = await fetchImagesWithDescriptions();
            setImagesWithDescriptions(fetchedImagesWithDescriptions);
        };
        fetchImageData();
    }, []);

    const handleSlideTransition = useCallback(() => {
        imageContainerRef.current.classList.remove("next", "prev");

        setTimeout(() => {
            imageContainerRef.current.classList.add(slideDirection);
        }, 0);
    }, [imageContainerRef, slideDirection]);

    const goToNextSlide = useCallback(() => {
        setSlideDirection("next");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesWithDescriptions.length);
        handleSlideTransition();
    }, [imagesWithDescriptions.length, handleSlideTransition]);

    useEffect(() => {
        let interval;

        const autoChangeSlide = () => {
            if (autoplay) {
                interval = setInterval(goToNextSlide, 5000);
            }
        };

        autoChangeSlide();

        return () => clearInterval(interval);
    }, [autoplay, currentIndex, goToNextSlide]);

    const goToPreviousSlide = () => {
        setSlideDirection("prev");
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesWithDescriptions.length) % imagesWithDescriptions.length);
        handleSlideTransition();
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

    const toggleFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

        setFullscreen(!fullscreen);
    };

    return(
        <div className={`carousel-container ${fullscreen ? "fullscreen": ""}`}>
            {imagesWithDescriptions.length > 0 && (
                <div className={`carousel__image-container ${slideDirection}`} ref={imageContainerRef}>
                    <div className="image-information">
                        <p className="information__description">
                            {formatDescription(imagesWithDescriptions[currentIndex].description)}
                        </p>
                        <p className="information__author">
                            By: {imagesWithDescriptions[currentIndex].author}
                        </p>
                    </div>
                    <img 
                        src={imagesWithDescriptions[currentIndex].url}
                        alt={`Slide ${currentIndex}`}
                        className="carousel-image"
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
                    onClick={toggleFullscreen}
                    variant="carousel-button"
                >   
                    {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
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