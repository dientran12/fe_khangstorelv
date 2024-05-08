import React from 'react'
import { formatCurrencyVND, formatDateTime } from '~/ultils/helpers'
import OrderItem from './Card/OrderItem'
import { useNavigate } from 'react-router-dom'
import CancelDiglog from './Modal/CancelDialog'
import * as OrderService from '~/services/OrderService'
import { useSelector } from 'react-redux'

const OrderedInfo = ({ order, refreshData }) => {
    const [showDialog, setShowDialog] = React.useState(false)
    const user = useSelector(state => state.user)

    const isActionable = order?.status.toLowerCase() === 'pending';
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'text-lime-400'; // Màu cam
            case 'paid':
                return 'text-blue-500'; // Màu xanh dương
            case 'fulfilled':
                return 'text-green-500'; // Màu xanh lá
            case 'cancelled':
                return 'text-red-500'; // Màu đỏ
            default:
                return 'text-gray-500'; // Một màu mặc định nếu không có trạng thái phù hợp
        }
    }

    console.log("order at ordered info", order)

    const navigate = useNavigate();

    const handleComfirmCancelOrder = async (orderId) => {
        try {
            await OrderService.cancelOrder(user.id, orderId)
            refreshData()
            setShowDialog(false)
        }
        catch (error) {
            console.error('Failed to cancel order', error)
            setShowDialog(false)
        }
    }

    return (
        <>
            {showDialog &&

                <CancelDiglog
                    orderId={order.id}
                    onConfirm={handleComfirmCancelOrder}
                    onCancel={() => setShowDialog(false)}
                />
            }
            {order && <div className="rounded-md  h-fit duration-300 ease-in-out shadow-default  bg-white  dark:bg-boxdark">
                <h1 className="text-3xl px-4 md:px-6 text-center xl:px-9 font-semibold text-black border-b-2  dark:text-white py-5">
                    Detail order "<p className="inline text-main">{order.id}</p>" on {formatDateTime(order.createdAt).date}
                </h1>
                <div className="grid grid-cols-1 gap-2 p-6.5 ">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Total prices:<p className="inline ml-10 mr-2 text-3xl font-semibold text-main">{formatCurrencyVND(order.totalAmount)}</p> vnđ</label>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                            >
                                Status: <p className={`inline ml-10 mr-2 text-3xl font-semibold  ${getStatusColor(order.status)} capitalize`}>{order.status}</p>
                            </label>
                        </div>
                    </div>
                    <div className="h-80 overflow-y-auto">
                        {order && order?.items?.length > 0 && order.items.map((item, index) => (
                            <OrderItem key={index} dataCartItem={item} />
                        ))}
                    </div>
                    <div className=" pt-2 border-t flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Pay method:<p className="inline ml-4 mr-2 text-xl font-semibold ">{formatCurrencyVND(order.paymentMethod)}</p> </label>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Phone Number:<p className="inline ml-4 mr-2 text-xl font-semibold ">{order.phoneNumber}</p> </label>
                        </div>
                    </div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Shipping address:<p className="inline ml-4 mr-2 text-xl font-semibold ">{order.shippingAddress}</p> </label>
                    <div className="flex flex-row ml-auto gap-5">
                        <button
                            type="button"
                            disabled={!isActionable}
                            onClick={() => navigate(`/checkout?orderId=${order.id}&totalAmount=${order.totalAmount}`)}
                            className={`bg-violet-700 border border-transparent rounded-md py-2 px-8 duration-200 text-base font-medium text-white hover:bg-black-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 ${!isActionable ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Pay now
                        </button>
                        <button
                            type="button"
                            disabled={!isActionable}
                            onClick={() => setShowDialog(true)}
                            className={`bg-main border border-transparent rounded-md py-2 px-8 duration-200 justify-center text-base font-medium text-white hover:bg-black-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 ${!isActionable ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default OrderedInfo