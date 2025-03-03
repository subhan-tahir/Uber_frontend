import React, { useContext, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const EditProfileSidebar = ({ closedSidebar, userCharacter, isOpen }) => {
    const { user, setUser } = useContext(UserDataContext);
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState("");
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // Handle Image Change
    const userId = localStorage.getItem('userId');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setImageError(true); 
            };
        } else {
            setImage(null);
            setImageError(false);
        }
    };


    // create user profile
    const profileSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            setImageError(false); 
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/Uber-users/user-profile`,
                { image, userId }
            );

            if (response.status === 200) {
             
                setUser(response.data);
                setUploadedImage(response.data.profileData.image);
                setImage(null);
                setImageError(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setImageError(true);
        } finally {
            setLoading(false);
        }
    };


    //fetch user profile
    useEffect(() => {
        if (!userId) return; // Prevent unnecessary API calls

        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/Uber-users/get-profile/${userId}`,

                );
                if(response.status == 200){
                    setUploadedImage(response.data.profile.image);
                    setImageError(false);

                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
                setImageError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

        // Cleanup function to revoke previous blob URLs
        return () => {
            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage);
            }
        };
    }, [userId]);




//fetch username and email form localstorage
    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
        setEmail(localStorage.getItem('userEmail') || '');
    }, []);

    return (
        <div
            className={`z-[1000] fixed top-0 right-0 w-full h-screen bg-white transition-transform ease-in-out duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* Profile Edit Header */}
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between p-4 border-b">
                        <h1 className="font-bold">My Account</h1>
                        <button onClick={closedSidebar} className="text-[25px] font-extrabold">
                            <RxCross2 />
                        </button>
                    </div>

                    {/* Profile Details */}
                    <div className="p-4 flex items-center gap-2 flex-col">
                        {/* Profile Picture */}
                        <form onSubmit={profileSubmitHandler}>
                            <div className="flex flex-col items-center gap-3 justify-center">
                                <label htmlFor="fileInput">
                                    {
                                        loading ? <CircularProgress size={18} color="white" /> :
                                            <div
                                                className={`d-block mx-auto mb-3 w-16 h-16 flex items-center 
                                        justify-center rounded-full text-[40px] font-serif relative 
                                        cursor-pointer bg-gray-300 hover:bg-gray-400 bg-cover  border-2 bg-center
                                        ${imageError || uploadedImage ? "border-green-500" : "border-red-500"}`}
                                                style={{ backgroundImage: `url(${uploadedImage})` }}
                                            >
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                                {/* {!image && !uploadedImage && userCharacter} */}
                                            </div>
                                    }

                                    <span className="font-serif">Upload an image</span>
                                </label>


                                <button
                                    type="submit"
                                    className={`text-center font-mono text-white px-4 w-full min-h-12 
                                                rounded-lg py-3 text-[15px] font-bold border-0 outline-none 
                                                ${image || uploadedImage ? 'bg-black' : 'bg-gray-500 opacity-50 cursor-not-allowed'}`}
                                    disabled={!image && !uploadedImage} // ✅ Button is disabled only if no image is present
                                >
                                    {loading ? <CircularProgress size={18} color="white" /> : "Upload an image"}
                                </button>
                            </div>
                        </form>

                        {/* User Info */}
                        <div className="flex flex-col mt-16 gap-8 w-full">
                            <div className="flex items-center gap-2 "><span className="text-[30px]"><FaUser /></span><p className="text-[20px]">{username}</p></div>
                            <div className="flex items-center gap-2 "><span className="text-[30px]"><MdEmail /></span> <p className="text-[20px]">{email}</p></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileSidebar;