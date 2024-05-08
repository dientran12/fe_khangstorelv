import DefaultLayout from '~/layouts/DefaultLayout';
import { useEffect, useRef, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '~/redux/slides/userSlide';
import { handleImageOnError, handleImageOnLoad, imageToBase64 } from '~/ultils/helpers';
import { FaCamera } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";

const Profile = () => {
    const userData = useSelector((state) => state.user);

    console.log('userData:', userData);

    const dispatch = useDispatch();
    const [editingPhone, setEditingPhone] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(userData?.phone || '');
    const [editingAddress, setEditingAddress] = useState(false);
    const [editingImage, setEditingImage] = useState(false);
    const [imageFileChose, setImageFileChose] = useState(userData?.image || '');
    const [address, setAddress] = useState(userData?.address);
    const [originalFile, setOriginalFile] = useState(null);

    const handlePhoneEditSubmit = () => {
        if (phoneNumber !== userData.phone) {  // Only dispatch if there's a change
            const userDetails = { phone: phoneNumber };
            dispatch(updateProfile({ id: userData.id, userDetails }));
            setEditingPhone(false);
        }
    };

    const handleAddressEditSubmit = () => {
        if (address !== userData.address) {
            const userDetails = { address: address };
            dispatch(updateProfile({ id: userData.id, userDetails }));
            setEditingAddress(false);
        }
    };

    useEffect(() => {
        setPhoneNumber(userData.phone);
        setAddress(userData.address);
    }, [userData.phone, userData.address])

    const phoneInputRef = useRef(null);
    const addressInputRef = useRef(null);

    const handlePhoneClick = () => {
        setEditingPhone(true);
        phoneInputRef.current?.focus();
    };


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                URL.revokeObjectURL(imageFileChose);  // Revoke the old image URL
                setImageFileChose(imageUrl);
                setOriginalFile(file);  // Save the original file
                setEditingImage(true);
            }
        }
    };


    const handleImageSave = async () => {
        if (editingImage && imageFileChose !== userData.image) {
            try {
                const base64Image = await imageToBase64(originalFile);
                const userDetails = { image: base64Image };
                dispatch(updateProfile({ id: userData.id, userDetails }));
                setEditingImage(false);  // Reset the editing flag
            } catch (error) {
                console.error('Error converting image to Base64:', error);
            }
        }
    };


    const handleAddressClick = () => {
        setEditingAddress(true);
        addressInputRef.current?.focus();
    };

    useEffect(() => {
        if (editingPhone && phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
    }, [editingPhone]);

    useEffect(() => {
        if (editingAddress && addressInputRef.current) {
            addressInputRef.current.focus();
        }
    }, [editingAddress]);

    return (
        <DefaultLayout>
            {/* <Breadcrumb pageName="Profile" /> */}
            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="relative z-20 h-35  md:h-65">
                    <img
                        src={`${process.env.REACT_APP_API_URL_IMAGE}${userData?.image}`}
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm  rounded-tr-sm object-cover object-center"
                        onError={handleImageOnError}
                        onLoad={handleImageOnLoad}
                    />
                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <img
                            src={editingImage ? imageFileChose : `${process.env.REACT_APP_API_URL_IMAGE}${userData?.image}`}
                            alt="profile"
                            className='h-full w-full rounded-full  object-contain'
                            onError={handleImageOnError}
                            onLoad={handleImageOnLoad}
                        />
                        <label
                            htmlFor="profile"
                            className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                        >
                            <FaCamera />
                            <input
                                type="file"
                                name="profile"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={handleImageChange}
                                id="profile"
                                className="sr-only"
                            />
                        </label>
                        {editingImage && (
                            <button
                                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer bg-primary text-white items-center justify-center rounded-full   hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                                onClick={handleImageSave}
                            >
                                <IoMdSave />
                            </button>
                        )
                        }
                    </div>
                    <div className="mt-4 ">
                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                            {userData?.name || 'Name'}
                        </h3>
                        <p className="font-medium">{userData?.email || 'email.@gmail.com'}</p>
                        <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                                <span className="font-semibold text-black dark:text-white">
                                    259
                                </span>
                                <span className="text-sm">Posts</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                                <span className="font-semibold text-black dark:text-white">
                                    129K
                                </span>
                                <span className="text-sm">Followers</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                                <span className="font-semibold text-black dark:text-white">
                                    2K
                                </span>
                                <span className="text-sm">Following</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-150 mx-auto p-4">
                    <div className="flex items-center justify-between border-b border-slate-400 pb-3 ">
                        <div className="flex-1">
                            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                                Phone:
                            </label>
                            {editingPhone ? (
                                <input
                                    ref={phoneInputRef}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                                />
                            ) : (
                                <span className="flex justify-between items-center mt-1 mx-4">
                                    <div className={!phoneNumber ? `opacity-45 italic` : ''}>{phoneNumber || 'No phone number'}  </div>
                                    <FaPencilAlt
                                        onClick={handlePhoneClick}
                                        className="ml-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700"
                                    />
                                </span>
                            )}
                        </div>
                        {editingPhone && (
                            <button
                                className="ml-4 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handlePhoneEditSubmit}
                            >
                                Save
                            </button>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex-1">
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Address
                            </label>
                            {editingAddress ? (
                                <input
                                    type="text"
                                    ref={addressInputRef}
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                                />
                            ) : (
                                <span className="flex justify-between items-center mt-1 mx-4">
                                    <div className={!address ? `opacity-45 italic` : ''}>{address || 'No address'}  </div>
                                    <FaPencilAlt
                                        onClick={handleAddressClick}
                                        className="ml-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700"
                                    />
                                </span>
                            )}
                        </div>
                        {editingAddress && (
                            <button
                                className="ml-4 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleAddressEditSubmit}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
