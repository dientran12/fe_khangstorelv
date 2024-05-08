import { Fragment, useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { FaHeart, FaStar } from "react-icons/fa";
import DefaultLayout from '~/layouts/DefaultLayout';
import SelectSize from '~/components/Form/SelectSize';
import { getProductById } from '~/services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrencyVND, handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import LoadingFullScreen from '~/components/Loading/LoadingFullScreen';
import { useLoading } from '~/hooks/LoadingContext';
import InputQuantity from '~/components/Form/InputQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "~/redux/slides/cartSlice";
import * as UserService from "~/services/UserService";
import { showErrorToast, showSuccessToast } from '~/ultils/toastify';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailProduct() {
    const { productId } = useParams(); // This hooks extracts params from URL
    const [product, setProduct] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [productRender, setProductRender] = useState(null);
    const { showLoading, hideLoading } = useLoading();
    const [quantity, setQuantity] = useState(0);
    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const fetchProductById = async () => {
        showLoading()
        try {
            const data = await getProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error('Failed to fetch product by id:', error);
        } finally {
            setTimeout(() => {
                hideLoading()
            }, 1000);
        }
    }

    const formattedProduct = (resProduct) => {
        let versionImages = []
        if (resProduct?.versions) {
            versionImages = resProduct.versions?.reduce((acc, ver, index) => {
                const verImages = ver.images.map((img, imgIndex) => ({
                    id: resProduct?.images.length + acc.length + imgIndex, // Tính id dựa trên số lượng ảnh đã có
                    src: img, // Đảm bảo rằng img là URL hoàn chỉnh của ảnh
                    alt: `Version ${index + 1} Image` // Mô tả cho ảnh này dựa vào index của version
                }));
                return [...acc, ...verImages];
            }, []);
        }

        // Gộp các ảnh từ sản phẩm chính và từ các versions
        const allImages = [
            ...(resProduct?.images?.map((img, index) => ({
                id: index, // Sử dụng index làm id
                src: img, // Đảm bảo rằng img là URL hoàn chỉnh của ảnh
                alt: 'Product Image' // Mô tả chung cho ảnh sản phẩm
            })) || []),
            ...(versionImages || [])
        ];

        return {
            id: resProduct.id,
            name: resProduct.name || 'No name available', // Sử dụng giá trị mặc định nếu không có
            price: formatCurrencyVND(resProduct.price), // Giả sử giá trị giá là số và bạn cần nó hiển thị dạng tiền tệ
            rating: 4, // Tạm thời cứng giá trị này, bạn cần logic để xác định rating nếu API không trả về
            stock: resProduct.stock || 0, // Mặc định số lượng tồn kho là 0 nếu không có
            sold: resProduct.sold || 0, //
            images: allImages,
            versions: resProduct?.versions || [],
            styles: resProduct?.versions?.map(ver =>
                ver.style || 'No Style',
            ),
            description: resProduct.description || '<p>No description provided.</p>' // Mặc định mô tả nếu không có
        };
    };

    useEffect(() => {
        if (productId) {
            fetchProductById();
        }
    }, [productId]);

    useEffect(() => {
        if (product) {
            const formatted = formattedProduct(product)
            setProductRender(formatted)
            if (formatted.versions && formatted.versions.length > 0) {
                setSelectedStyle(formatted.versions[0]); // Chọn version đầu tiên làm mặc định
            }
        }
    }, [product]);

    useEffect(() => {
        // Khi selectedStyle thay đổi, cập nhật selectedSize về size đầu tiên của style mới
        if (selectedStyle && selectedStyle.sizes && selectedStyle.sizes.length > 0) {
            setSelectedSize(selectedStyle.sizes[0]);
        } else {
            // Nếu style mới không có sizes, set selectedSize về null hoặc một giá trị mặc định
            setSelectedSize(null);
        }
    }, [selectedStyle]);


    useEffect(() => {
        if (selectedSize) {
            setQuantity(0); // Reset quantity when size changes
        }
    }, [selectedSize]);



    const handleOnClickAddToCart = async () => {
        if (!selectedStyle || !selectedSize || quantity === 0) {
            alert("Please select a style and size and quantity to add to cart.");
            return;
        }

        const productToAdd = {
            productId: productRender.id,
            versionId: selectedStyle.id,
            image: selectedStyle.images.length > 0 ? selectedStyle.images[0] : null,
            size: selectedSize.size,
            style: selectedStyle.style,
            sizeId: selectedSize.id,
            quantity: quantity,
            price: productRender.price,
            name: productRender.name,
        };
        try {
            const response = await UserService.addToCart({ userId: userData.id, productVersionSizeId: productToAdd.sizeId, quantity: productToAdd.quantity });
            console.log('Added to cart successfully:', response);

            console.log('Product to add to cart:', productToAdd);

            dispatch(addToCart(productToAdd));
            showSuccessToast("Added to cart successfully!");
        } catch (error) {
            console.error('Failed to add to cart:', error);
            showErrorToast("Failed to add to cart. Please try again.");
        }
    }

    return (
        <DefaultLayout>
            <LoadingFullScreen />
            {productRender && <div className="bg-white dark:border-strokedark dark:bg-black-2">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        {/* Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {productRender?.images?.map((image) => (
                                        <Tab
                                            key={image.id}
                                            className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL_IMAGE}${image.src}`}
                                                            alt={image.alt}
                                                            className="w-full h-full object-center object-cover"
                                                            onError={handleImageOnError}
                                                            onLoad={handleImageOnLoad}
                                                        />
                                                    </span>
                                                    <span
                                                        className={classNames(
                                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>

                            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                                {productRender?.images?.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL_IMAGE}${image.src}`}
                                            alt={image.alt}
                                            className="w-full h-full object-center object-cover sm:rounded-lg"
                                            onError={handleImageOnError}
                                            onLoad={handleImageOnLoad}
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Product info */}
                        <div className="mt-10 p-4 sm:p-8 sm:mt-16 lg:mt-0 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h1 className="text-3xl mb-6 font-extrabold tracking-tight text-gray-900">{productRender.name}</h1>

                            <div className="mt-3 flex flex-row justify-between">
                                <div className="text-3xl text-gray-900 inline">{formatCurrencyVND(productRender.price)} <p className='text-red-400 text-2xl font-bold inline'>đ</p></div>
                                <div className="flex items-center text-lg  font-bold">
                                    Sold out:
                                    <h3 className="text-3xl text-red-500 ml-2">{productRender.sold}</h3>
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="mt-3">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <FaStar
                                                key={rating}
                                                className={classNames(
                                                    productRender.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{productRender.rating} out of 5 stars</p>
                                </div>
                            </div>

                            <div className="my-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    className="text-base text-gray-700 space-y-6"
                                    dangerouslySetInnerHTML={{ __html: productRender.description }}
                                />
                            </div>

                            <div className="pt-6 border-t ">
                                <div>
                                    <h3 className="text-lg mb-2">Style:</h3>
                                    <RadioGroup value={selectedStyle} onChange={setSelectedStyle}>
                                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                        <div className="flex flex-row gap-3 dark:text-black">
                                            {productRender.versions.length > 0 ? productRender.versions?.map((version) => (
                                                <RadioGroup.Option
                                                    key={version.style}
                                                    value={version}
                                                    className=
                                                    {
                                                        ({ active, checked }) =>
                                                            `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                                                            ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                                                            relative flex  cursor-pointer rounded-lg py-2 px-3   shadow-md focus:outline-none`
                                                    }
                                                >
                                                    {({ checked }) => (
                                                        <>
                                                            <div className="flex  items-center justify-between">
                                                                <div className=" items-center">
                                                                    <div className="text-xl text-center block">
                                                                        <RadioGroup.Label
                                                                            as="p"
                                                                            className={`font-medium uppercase block text-center ${checked ? 'text-white' : 'text-gray-900'
                                                                                }`}
                                                                        >
                                                                            {version.style}
                                                                        </RadioGroup.Label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))
                                                : (
                                                    <p className="text-red-500 text-lg">No version available</p>
                                                )
                                            }
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className='grid grid-cols-3 gap-5 mt-6 '>
                                    <div className='col-span-1'>
                                        <h3 className="text-lg mb-2">Size</h3>
                                        <SelectSize sizes={selectedStyle?.sizes || []} onSelect={(size) => setSelectedSize(size)} />
                                    </div>
                                    <div className='col-span-2'>
                                        <h3 className="text-lg mb-2">Quantity</h3>
                                        <InputQuantity initialQuantity={quantity} maxQuantity={selectedSize ? selectedSize.quantity : 0} onQuantityChange={setQuantity} />
                                    </div>
                                </div>
                                <div className="mt-10 flex sm:flex-col1">
                                    <button
                                        type="button"
                                        onClick={handleOnClickAddToCart}
                                        disabled={quantity === 0}
                                        className={`max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full ${quantity === 0 ? 'cursor-not-allowed' : ''}`}
                                    >
                                        Add to bag
                                    </button>

                                    <button
                                        type="button"
                                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                    >
                                        <FaHeart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>}
        </DefaultLayout>
    )
}
