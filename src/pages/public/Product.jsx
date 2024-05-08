import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import CardProduct from '~/components/Card/CardProduct'
import LoadingFullScreen from '~/components/Loading/LoadingFullScreen'
import LoadingWrapper from '~/components/Loading/LoadingWrapper'
import Pagination from '~/components/Pagination'
import ProductSorter from '~/components/ProductSorter'
import Sidebar from '~/components/Sidebar'
import { useLoading } from '~/hooks/LoadingContext'
import DefaultLayout from '~/layouts/DefaultLayout'
import * as ProductApi from '~/services/ProductService'

const Product = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('New Arrival');
  const { categorySlug } = useParams();
  const categories = useSelector(state => state.category.items);
  const { showLoading, hideLoading } = useLoading();

  console.log("categorySlug", categorySlug);

  const fetchProducts = async (page, categoryName, sort) => {
    showLoading();
    try {

      const data = await ProductApi.getAllProduct({ search: searchTerm || '', limit: 8, page: page, categoryName, sort });
      setTimeout(() => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalProducts(data.totalProducts);
        hideLoading();
      }, 300);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      hideLoading();
      setError(error);
    }
  };

  useEffect(() => {
    const category = categories.find(cat => cat.slug === categorySlug);
    const nameCategory = category?.name || '';

    let sort = '';
    if (sortCriteria === 'New Arrival') {
      sort = 'createdAt';
    } else if (sortCriteria === 'Best Seller') {
      sort = 'sold_desc';
    } else if (sortCriteria === 'Most Popular') {
      sort = 'stock_desc';
    }

    // Xóa searchTerm mỗi khi categorySlug thay đổi, không phụ thuộc vào giá trị của currentPage
    if (categorySlug) {
      setSearchTerm(''); // Xóa searchTerm
      if (currentPage !== 1) {
        setCurrentPage(1); // Đặt lại currentPage về 1 nếu không phải trang đầu
      }
      fetchProducts(1, nameCategory, sort, ''); // Luôn gọi API với trang đầu và searchTerm rỗng
    } else {
      // Gọi fetchProducts với các giá trị hiện tại
      fetchProducts(currentPage, nameCategory, sort, searchTerm);
    }
  }, [categorySlug, currentPage, categories, sortCriteria, searchTerm]);



  const handlePageChange = (newPage) => {
    // Chỉ gọi API khi trang mới khác trang hiện tại
    if (currentPage !== newPage) {
      fetchProducts(newPage);
    }
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    // fetchProducts(currentPage, sortCriteria); // Gọi lại API khi tiêu chí sắp xếp thay đổi
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };


  return (
    <DefaultLayout>

      <div className="flex xl:mx-40">
        <div className='flex-none  flex flex-col   '>
          <Sidebar />
        </div>
        <div className='flex flex-col pl-5  flex-auto '>
          <ProductSorter onSortChange={handleSortChange} onSearch={handleSearch} searchTerm={searchTerm} />
          <LoadingWrapper>
            <div className='grid mb-6  sm:mx-5 grid-cols-1 sm:grid-cols-2 mt-6 gap-4 md:grid-cols-2 lg:grid-cols-3  md:gap-6 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 2xl:gap-7.5'>
              {products.map(product => (
                <div key={product.id} >
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </LoadingWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

    </DefaultLayout>
  )
}

export default Product