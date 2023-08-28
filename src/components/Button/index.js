import React from "react";
import PropTypes from "prop-types";
import "./button-styles.scss";

export default function Button({ children, variant, onClick }) {
    const buttonClassName = `carousel-button ${variant}`;

    return (
        <button
            className={buttonClassName}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    variant: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};