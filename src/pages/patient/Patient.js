import React, { useState, useEffect } from "react";
import "./Patient.css";
import Header from "../../comp/header/Header";
import Footer from "../../comp/footer/Footer";
import SlideConfirm from "../../comp/slide-confirm/SlideConfirm";
import signInBg from "../../images/signBg.png";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';



const Patient = () => {
    const [link, setLink] = useState("http://localhost:5005");
    const [confirmText, setConfirmText] = useState("");
    const [showConfirm, setShowConfirm] = useState("hide-confirm");
    let { id } = useParams();
    const [name, setName] = useState("");
    const [gendr, setGendr] = useState("");
    const [state, setState] = useState("");
    const [date, setDate] = useState();
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [attend, setAttend] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [doctor, setDoctor] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [check, setCheck] = useState("");
    const [price, setPrice] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");

    const [currentId, setCurrentId] = useState("")
    const [idVisit, setIdVisit] = useState("")
    const [day, setDay] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")

    const [cookies, setCookies] = useCookies("access_admin_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.access_admin_token) {
            navigate("/SignIn");
        } else {

            Axios.get(`${link}/api/Book/${id}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.access_admin_token}`
                }
            })
                .then((res) => {
                    setPatient(res.data.data.book)
                    setCurrentId(res.data.data.book.idRole)
                    setIdVisit(res.data.data.book.idVisit)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, []);

    const addEdit = () => {
        const formDataBook = new FormData();
        formDataBook.append("check", check);
        formDataBook.append("diagnosis", diagnosis);
        formDataBook.append("prescription", prescription);

        const formDataVisits = new FormData();
        formDataVisits.append("check", check);
        formDataVisits.append("diagnosis", diagnosis);
        formDataVisits.append("prescription", prescription);

        handleEditBook(formDataBook)
        handleEditVisit(formDataVisits)

        setConfirmText("Modified successfully")
        handleShow()
    };

    const handleEditBook = (formData) => {
        Axios.patch(`${link}/api/Book/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.access_admin_token}`
            }
        })
            .then((res) => {
                console.log(res.data.data); // true or false
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEditVisit = (formData) => {
        Axios.patch(`${link}/api/Visit/${idVisit}`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.access_admin_token}`
            }
        })
            .then((res) => {
                console.log(res.data.data); // true or false
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const setPatient = (data) => {
        setName(data.name)
        setGendr(data.gendr)
        setState(data.state)
        setDate(data.date)
        setPhone(data.phone)
        setEmail(data.email)
        setDay(JSON.parse(data.attend).day)
        setStart(JSON.parse(data.attend).hour.start)
        setEnd(JSON.parse(data.attend).hour.end)
        setSpecialization(data.specialization)
        setDoctor(data.doctor)
        setPrice(data.price)
        setBookingDate(data.bookingDate)
        setCheck(data.check)
        setDiagnosis(data.diagnosis)
        setPrescription(data.prescription)
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

                <h1>Add Doctor</h1>

                <SlideConfirm text={confirmText} showConfirm={showConfirm} />


                <div className="contents">
                    <form className="form-add-doctor">
                        <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} defaultValue={name} readOnly />
                        <input type="text" placeholder="Gendr" onChange={(e) => { setGendr(e.target.value) }} defaultValue={gendr} readOnly />
                        <input type="text" placeholder="State" onChange={(e) => { setState(e.target.value) }} defaultValue={state} readOnly />
                        <input type="text" placeholder="Date" onChange={(e) => { setDate(e.target.value) }} defaultValue={date} readOnly />
                        <input type="text" placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} defaultValue={phone} readOnly />
                        <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} defaultValue={email} readOnly />
                        <span className="attend">
                            <select value={day} onChange={(e) => { setDay(e.target.value) }}>
                                <option value="Day">Day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                            <input type="text" placeholder="Start" onChange={(e) => { setStart(e.target.value) }} value={start} />
                            <input type="text" placeholder="End" onChange={(e) => { setEnd(e.target.value) }} value={end} />
                        </span>
                        <input type="text" placeholder="Specialization" onChange={(e) => { setSpecialization(e.target.value) }} defaultValue={specialization} readOnly />
                        <input type="text" placeholder="Doctor" onChange={(e) => { setDoctor(e.target.value) }} defaultValue={doctor} readOnly />
                        <input type="text" placeholder="Price" onChange={(e) => { setPrice(e.target.value) }} defaultValue={price} readOnly />
                        <input type="text" placeholder="Booking Date" onChange={(e) => { setBookingDate(e.target.value) }} defaultValue={bookingDate} readOnly />
                        <select value={check} onChange={(e) => { setCheck(e.target.value) }}>
                            <option>Check</option>
                            <option value={"Waiting"}>Waiting</option>
                            <option value={"Not Done"}>Not Done</option>
                            <option value={"Done"}>Done</option>
                        </select>
                        <textarea placeholder="Diagnosis" onChange={(e) => { setDiagnosis(e.target.value) }} defaultValue={diagnosis}></textarea>
                        <input type="file" onChange={(e) => setPrescription(e.target.files[0])} />
                        <input type="submit" className="pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                addEdit();
                            }} />

                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Patient;
