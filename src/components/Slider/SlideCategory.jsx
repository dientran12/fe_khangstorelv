import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardCategory } from "../Card/CardCategory";

function SlideCategory() {
    const categories = useSelector(state => state.category.items);
    const [sliderSettings, setSliderSettings] = useState({
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) { // sm breakpoint của Tailwind là 640px
                setSliderSettings(prevSettings => ({ ...prevSettings, slidesToShow: 3 }));
            } else if (width >= 640) {
                setSliderSettings(prevSettings => ({ ...prevSettings, slidesToShow: 5 }));
            }
        };

        window.addEventListener('resize', handleResize);

        // Gọi một lần khi component mount để set giá trị ban đầu
        handleResize();

        // Cleanup listener khi component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="slider-container">
            <Slider {...sliderSettings}>
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
