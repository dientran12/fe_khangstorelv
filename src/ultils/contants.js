import path from './path'
import { FaHome } from "react-icons/fa";

export const navigation = [
    {
        id: 1,
        value: <div className="flex gap-1 items-center"><FaHome /> <span >HOME</span></div>,
        path: `/${path.HOME}`,
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCT}`,
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`,
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`,
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`,
    },
]