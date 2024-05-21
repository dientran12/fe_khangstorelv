// ProductImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import { handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';

const ProductImageSlider = ({ images = [] }) => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: images.length > 1,
        // autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className="">
                    <img
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${image}`}
                        alt={`Product`}
                        className="w-full object-cover hover:scale-110 duration-150"
                        onError={handleImageOnError}
                        onLoad={handleImageOnLoad}
                    />
                </div>
            ))}
        </Slider>

    );
};

export default ProductImageSlider;
