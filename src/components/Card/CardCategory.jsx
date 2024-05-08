import { NavLink } from "react-router-dom";
import { createSlugify, handleImageOnError, handleImageOnLoad } from "~/ultils/helpers";

export function CardCategory({ image, title = "Title" }) {


    return (
        <NavLink
            className="hover:text-red-500 duration-300"
            to={`/product/${createSlugify(title)}`}
        >
            <div
                className="overflow-hidden aspect-h-1 aspect-w-1 bg-slate-50 rounded-none dark:bg-gray-800 transition border-none ease-in-out    "
            >
                <img
                    className="w-full duration-300  object-cover  hover:scale-110"
                    src={`${process.env.REACT_APP_API_URL_IMAGE}${image}`}
                    alt="Article"
                    onError={handleImageOnError}
                    onLoad={handleImageOnLoad}
                />
            </div >
            <h5 className="text-xl font-bold p-2 tracking-tight text-center capitalize text-gray-900 ">
                {title}
            </h5>
        </NavLink>
    );
}
