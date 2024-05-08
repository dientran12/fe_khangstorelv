import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardCategory } from "../Card/CardCategory";

function SlideCategory() {
    const categories = useSelector(state => state.category.items)

    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: false,
    };

    return (
        <div className="slider-container ">
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="px-1">
                        <CardCategory image={category.image} title={category.name} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlideCategory;
