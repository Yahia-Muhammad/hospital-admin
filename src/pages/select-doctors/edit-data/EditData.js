import React, { useState, useEffect } from "react";
import "./EditData.css";
import Header from "../../../comp/header/Header";
import Footer from "../../../comp/footer/Footer";
import SlideConfirm from "../../../comp/slide-confirm/SlideConfirm";
import signInBg from "../../../images/signBg.png";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AttendEdit from './AttendEdit';


const AddDoctor = () => {
    const [link, setLink] = useState("http://localhost:5005");
    const [confirmText, setConfirmText] = useState("");
    const [showConfirm, setShowConfirm] = useState("hide-confirm");
    let { specializationRoute, id } = useParams();
    const [name, setName] = useState("");
    const [gendr, setGendr] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("specialization");
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const [arrAttend, setArrAttend] = useState([]);
    const [price, setPrice] = useState("");
    const [avatar, setAvatar] = useState();
    const [route, setRoute] = useState("");
    const [cookies, setCookies] = useCookies("access_admin_token");
    const navigate = useNavigate();
    const [attendData, setAttendData] = useState([]);


    useEffect(() => {
        if (!cookies.access_admin_token) {
            navigate("/SignIn");
        } else if (localStorage.getItem("role") === "DOCTOR") {
            navigate("/");
        } else {
            Axios.get(`${link}/api/${specializationRoute}/${id}`).then((res) => {
                setData(res.data.data.doctor);
            });
        }
    }, []);

    const setData = (data) => {
        setName(data.name)
        setGendr(data.gendr)
        setEmail(data.email)
        setPhone(data.phone)
        setSpecialization(data.specialization)
        setTitle(data.title)
        setMsg(data.msg)
        setArrAttend(data.attend)
        setPrice(data.price)
        setAvatar(data.avatar)
    }

    const handleChange = ((e) => {
        const value = e.target.value;
        setRoute(value.replaceAll(" ", "_"));
        setSpecialization(value);
    });

    const createUser = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("gendr", gendr);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("specialization", specialization);
        formData.append("title", title);
        formData.append("msg", msg);
        for (let i = 0; i < attendData.length; i++) { formData.append("attend", JSON.stringify(attendData[i])) }
        formData.append("price", price);
        formData.append("avatar", avatar);


        Axios.patch(`${link}/api/${specializationRoute}/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.access_admin_token}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setConfirmText("Modified successfully")
                handleShow()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateAttendData = (newAttendData) => {
        console.log(newAttendData);
        setAttendData(newAttendData);
    };

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

                <h1>Edit Doctor</h1>

                <SlideConfirm text={confirmText} showConfirm={showConfirm} />


                <div className="contents">
                    <form className="form-add-doctor">
                        <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} value={name} />
                        <select value={gendr} onChange={(e) => { setGendr(e.target.value) }}>
                            <option>Select Gendr</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                        <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input type="text" placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                        <select value={specialization} onChange={handleChange}>
                            <option value="Specialization">Specialization</option>
                            <option value="Ambulance">Ambulance</option>
                            <option value="Intensive Care">Intensive Care</option>
                            <option value="Blood Diseases">Blood Diseases</option>
                            <option value="Radiology">Radiology</option>
                            <option value="General Surgery">General Surgery</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Ob Gyn">Ob Gyn</option>
                            <option value="breast Clinic">breast Clinic</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Internal Medicine">Internal Medicine</option>
                            <option value="Ophthalmology">Ophthalmology</option>
                            <option value="Ear Nose Throat">Ear Nose Throat</option>
                        </select>
                        <select value={title} onChange={(e) => { setTitle(e.target.value) }}>
                            <option>Title</option>
                            <option value={"General Practitioner"}>General Practitioner</option>
                            <option value={"Resident"}>Resident</option>
                            <option value={"Specialist"}>Specialist</option>
                            <option value={"Consultant"}>Consultant</option>
                            <option value={"Professor"}>Professor</option>
                            <option value={"Expert"}>Expert</option>
                        </select>
                        <input type="text" placeholder="Message" onChange={(e) => { setMsg(e.target.value) }} value={msg} />
                        <AttendEdit arrAttend={arrAttend} onUpdateAttend={updateAttendData} />
                        <input type="text" placeholder="Price" onChange={(e) => { setPrice(e.target.value) }} value={price} />
                        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
                        <input type="submit" className="pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                createUser();
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
