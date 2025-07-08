/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import peopleDefaultImage from '../../../assets/images/common/profile_default.png';

const Img = ({ src, alt, defaultSrc, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src || defaultSrc);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        if (defaultSrc === 'people') {
            setImgSrc(peopleDefaultImage);
        } else if (defaultSrc) {
            setImgSrc(defaultSrc);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

export default Img;
