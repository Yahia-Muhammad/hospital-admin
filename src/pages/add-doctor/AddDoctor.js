import React, { useState, useEffect } from "react";
import "./AddDoctor.css";
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
  const [gendr, setGendr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("specialization");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [arrAttend, setArrAttend] = useState([]);
  const [price, setPrice] = useState("");
  const [avatar, setAvatar] = useState();
  const [route, setRoute] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("00:00PM");
  const [end, setEnd] = useState("00:00PM");
  const [cookies, setCookies] = useCookies("access_admin_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_admin_token) {
      navigate("/SignIn");
    } else if (localStorage.getItem("role") === "DOCTOR") {
      navigate("/");
    }
  });

  const handleChange = ((e) => {
    const value = e.target.value;
    setRoute(value.replaceAll(" ", "_"));
    setSpecialization(value);
    console.log(`${value}`);
  });

  const createDoctor = () => {

    // data for add doctor to specialization
    const formDataDoc = new FormData();
    formDataDoc.append("name", name);
    formDataDoc.append("gendr", gendr);
    formDataDoc.append("email", email);
    formDataDoc.append("phone", phone);
    formDataDoc.append("specialization", specialization);
    formDataDoc.append("title", title);
    formDataDoc.append("msg", msg);
    for (let i = 0; i < arrAttend.length; i++) { formDataDoc.append("attend", JSON.stringify(arrAttend[i])) }
    formDataDoc.append("price", price);
    formDataDoc.append("avatar", avatar);

    // data for create doctor accout to server
    const formDataAcc = new FormData();
    formDataAcc.append("name", name);
    formDataAcc.append("email", email);
    formDataAcc.append("password", password);
    formDataAcc.append("phone", phone);
    formDataAcc.append("specialization", specialization);
    formDataAcc.append("title", title);
    formDataAcc.append("role", 'DOCTOR');
    formDataAcc.append("avatar", avatar);

    if (arrAttend.length === 0) {
      alert("Please Add Attend")
    } else {
      handlePostDoctor(formDataDoc)
      handlePostAccount(formDataAcc)
      setConfirmText("Doctor added")
      handleShow()
    }

  };

  const handlePostDoctor = (formData) => {
    Axios.post(`${link}/api/${route}`, formData, {
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

  const handlePostAccount = (formData) => {
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

  const handleAddAnotherAttend = (e) => {
    e.preventDefault();
    if (!day || !start || !end) {
      alert("Check Attend")
    } else {
      const addAttend = { "day": day, "hour": { "start": start, "end": end } }
      arrAttend.push(addAttend)
      console.log(arrAttend)
      setConfirmText("Attend added")
      handleShow()
    }
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
            <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} value={name} />

            <select value={gendr} onChange={(e) => { setGendr(e.target.value) }}>
              <option>Select Gendr</option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>

            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />

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
              <span>
                <label>Start : </label>
                <input type="text" placeholder="hh:mm AM/PM" onChange={(e) => { setStart(e.target.value) }} value={start} />
              </span>
              <span>
                <label>End : </label>
                <input type="text" placeholder="hh:mm AM/PM" onChange={(e) => { setEnd(e.target.value) }} value={end} />
              </span>
              <button onClick={handleAddAnotherAttend}>Add</button>
            </span>

            <input type="text" placeholder="Price" onChange={(e) => { setPrice(e.target.value) }} value={price} />

            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

            <input type="submit" className="pointer"
              onClick={(e) => {
                e.preventDefault();
                createDoctor();
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
