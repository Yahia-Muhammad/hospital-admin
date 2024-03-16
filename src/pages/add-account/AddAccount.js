import React, { useState, useEffect } from "react";
import "./AddAccount.css";
import Header from "../../comp/header/Header";
import Footer from "../../comp/footer/Footer";
import SlideConfirm from "../../comp/slide-confirm/SlideConfirm";
import signInBg from "../../images/signBg.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const AddDoctor = () => {
    const [link, setLink] = useState("http://localhost:5005");
    const [confirmText, setConfirmText] = useState("");
    const [showConfirm, setShowConfirm] = useState("hide-confirm");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState();
    const [cookies, setCookies] = useCookies("access_admin_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.access_admin_token) {
            navigate("/SignIn");
        } else if (localStorage.getItem("role") === "DOCTOR") {
            navigate("/");
        }
    });

    const createAdmin = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("specialization", specialization);
        formData.append("title", title);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", "ADMIN");
        formData.append("avatar", avatar);

        handlePost(formData)

        setConfirmText("Admin added")
        handleShow()

    };

    const handlePost = (formData) => {
        Axios.post(`${link}/api/Admin/register`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.access_admin_token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleShow = () => {
        setShowConfirm("show-confirm");
        setTimeout(() => {
            setShowConfirm("hide-confirm");
        }, 1500);
    }


    return (
        <>
            <Header />
            <div className="main add-doctor">
                <img className="main-bg" src={signInBg} alt="Sign In" />

                <h1>Add Account</h1>

                <SlideConfirm text={confirmText} showConfirm={showConfirm} />


                <div className="contents">
                    <form className="form-add-doctor">
                        <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} value={name} />
                        <input type="text" placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                        <input type="text" placeholder="Specialization" onChange={(e) => { setSpecialization(e.target.value) }} value={specialization} />
                        <input type="text" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

                        <input type="submit" className="pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                createAdmin();
                            }}
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddDoctor;
