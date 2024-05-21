import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import SlideCategory from '~/components/Slider/SlideCategory';
import DefaultLayout from '~/layouts/DefaultLayout';
import slideHome2 from '~/assets/images/slide_home_best-seller1.jpg';
import slideHome1 from '~/assets/images/slide_home_new_product.jpg';
import slideHome3 from '~/assets/images/slide_home_sp_popular.jpg';
import LoadingHome from '~/components/Loading/LoadingHome';
import imageSlide1 from '~/assets/images/SlideHome/QC_GIAMGIA.png';
import imageSlide2 from '~/assets/images/SlideHome/QC_BANCHAYNHAT.png';
import imageSlide3 from '~/assets/images/SlideHome/QC_SanPhamMoi.png';
import { useLoading } from '~/hooks/LoadingContext';
import * as ProductApi from '~/services/ProductService'
import { handleImageOnError, handleImageOnLoad } from '~/ultils/helpers';
import ProductImageSlider from '~/components/Slider/ProductImageSlider';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplaySpeed: 4000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { showLoading, hideLoading } = useLoading();
  const [newArrival, setNewArrival] = useState([])
  const [bestArrival, setBestArrival] = useState([])
  const [mostArrival, setMostArrival] = useState([])

  const navigate = useNavigate();

  const navigateToProductsWithSort = (sort) => {
    // Giả sử URL của bạn có dạng "/products" và bạn dùng query param để xác định sort
    navigate(`/product/all?sort=${sort}`);
  }

  const fetchNewArrival = async () => {
    showLoading();
    try {

      const data = await ProductApi.getAllProduct({ search: '', limit: 8, page: 1, categoryName: '' });
      setTimeout(() => {
        setNewArrival(data.products);
        hideLoading();
      }, 200);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      hideLoading();
    }
  }

  const fetchBestArrival = async () => {
    showLoading();
    try {

      const data = await ProductApi.getAllProduct({ search: '', limit: 8, page: 1, categoryName: '', sort: 'sold_desc' });
      setTimeout(() => {
        setBestArrival(data.products);
        hideLoading();
      }, 200);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      hideLoading();
    }
  }

  const fetchMostArrival = async () => {
    showLoading();
    try {

      const data = await ProductApi.getAllProduct({ search: '', limit: 8, page: 1, categoryName: '', sort: 'stock_desc' });
      setTimeout(() => {
        setMostArrival(data.products);
        hideLoading();
      }, 200);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      hideLoading();
    }
  }

  useEffect(() => {
    fetchNewArrival()
    fetchMostArrival()
    fetchBestArrival()
  }, [])

  return (
    <DefaultLayout>
      <LoadingHome />
      <div className=" w-full xl:px-40 items-center mb-6 ">
        <div className="slider-container  w-full ">
          <Slider  {...settings}>
            <div className="flex justify-center items-center ">
              <img src={imageSlide1} alt="Mô tả Ảnh 1" className="w-full object-cover" style={{ height: 'desired-height' }} />
            </div>
            <div className="flex justify-center items-center ">
              <img src={imageSlide2} alt="Mô tả Ảnh 1" className="w-full object-cover" style={{ height: 'desired-height' }} />
            </div>
            <div className="flex justify-center items-center ">
              <img src={imageSlide3} alt="Mô tả Ảnh 1" className="w-full object-cover" style={{ height: 'desired-height' }} />
            </div>
          </Slider>
        </div>
      </div>
      <div className="xl:mx-40 rounded-sm my-20   shadow-default ">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className=" text-3xl  text-center hover:text-blue-600 cursor-pointer duration-150 hover:font-bold">
            Categories
          </h3>
        </div>
        <div className="flex flex-col ">
          <SlideCategory />
        </div>
      </div>
      <div className="text-center xl:mx-40 mb-10"
        onClick={() => navigateToProductsWithSort('New Arrival')}
      >
        <h2 className="text-3xl mb-5 text-center hover:text-red-500 cursor-pointer duration-150 hover:font-bold">New Arrival</h2>
        <div className='px-4 sm:px-40 hover:text-xl duration-500 hover:text-blue-700'>Discover our latest collection where fashion meets creativity! Each design in the New Products section is carefully curated to bring confidence and unique character. Don't miss the opportunity to be the first to wear trendsetting styles.</div>
      </div>
      <div className='grid grid-cols-12  '>
        <div className='col-span-12 sm:col-span-4 order-2 sm:order-1 gap-2 sm:gap-0 m-2 sm:m-0 grid grid-cols-12 '>
          {newArrival.slice(0, 4).map((product, index) => (
            <div key={product.id} className={`overflow-hidden aspect-w-1 ${index === 3 && 'hidden'} sm:block aspect-h-1 col-span-4 sm:col-span-6`}>
              <ProductImageSlider images={product.images} />
            </div>
          ))}
        </div>
        <div className='col-span-12 order-1  sm:order-2 sm:col-span-8'>
          <img
            src={slideHome1}
            alt="Mô tả Ảnh 1"
            className="w-full object-cover shine"
          />
        </div>
      </div>
      <div className="text-center xl:mx-40 mb-10 mt-10 sm:mt-30"
        onClick={() => navigateToProductsWithSort('Best Seller')}
      >
        <h2 className="text-3xl mb-5 text-center hover:text-red-500 cursor-pointer duration-150 hover:font-bold">Best Seller</h2>
        <div className='px-4 sm:px-40 hover:text-xl duration-500 hover:text-blue-700'>Stand out with sophisticated and stylish designs from the Featured Products section. Each item exudes uniqueness and exceptional quality, helping you shine with your distinctive taste and make a lasting impression anywhere.</div>
      </div>
      <div className='grid grid-cols-12  '>
        <div className='col-span-12 sm:col-span-4 order-2 sm:order-1 gap-2 sm:gap-0 m-2 sm:m-0 grid grid-cols-12 '>
          {bestArrival.slice(0, 4).map((product, index) => (
            <div key={product.id} className={`overflow-hidden aspect-w-1 ${index === 3 && 'hidden'} sm:block aspect-h-1 col-span-4 sm:col-span-6`}>
              <ProductImageSlider images={product.images} />
            </div>
          ))}
        </div>
        <div className='col-span-12 order-1  sm:order-2 sm:col-span-8'>
          <img
            src={slideHome2}
            alt="Mô tả Ảnh 1"
            className="w-full object-cover "
          />
        </div>
      </div>
      <div className="text-center xl:mx-40 mb-10 mt-10 sm:mt-30"
        onClick={() => navigateToProductsWithSort('Most Popular')}
      >
        <h2 className="text-3xl mb-5 text-center hover:text-red-500 cursor-pointer duration-150 hover:font-bold">Most Popular</h2>
        <div className='px-4 sm:px-40 hover:text-xl duration-500 hover:text-blue-700'>Check out the customer favorites in the Popular Products section. Chosen for quality, style, and comfort, these items have won the hearts of thousands. Find the perfect piece to complement your style!</div>
      </div>
      <div className='grid grid-cols-12  '>
        <div className='col-span-12 sm:col-span-4 order-2 sm:order-1 gap-2 sm:gap-0 m-2 sm:m-0 grid grid-cols-12 '>
          {mostArrival.slice(0, 4).map((product, index) => (
            <div key={product.id} className={`overflow-hidden aspect-w-1   ${index === 3 && 'hidden'} sm:block aspect-h-1 col-span-4 sm:col-span-6 `}>
              <ProductImageSlider images={product.images} />
            </div>
          ))}
        </div>
        <div className='col-span-12 order-1  sm:order-2 sm:col-span-8'>
          <img
            src={slideHome3}
            alt="Mô tả Ảnh 1"
            className="w-full object-cover shine"
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home