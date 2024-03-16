import React, { useState, useEffect } from "react";
import "./ChooseNow.css";
import Header from "../../../comp/header/Header";
import Footer from "../../../comp/footer/Footer";
import Select from "../../../comp/select/Select";
import signInBg from "../../../images/signBg.png";
import ChooseComp from "./ChooseComp";
import FiltersComp from "./FiltersComp";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const ChooseNow = () => {
    const [dataDoctors, setDataDoctors] = useState([]);
    const [route, setRoute] = useState("");
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [cookies, setCookies] = useCookies("access_admin_token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.access_admin_token) {
            navigate("/SignIn");
        } else if (localStorage.getItem("role") === "DOCTOR") {
            navigate("/");
        }
    });

    /* These codes were used to control Filter */

    const [doctorTitles, setDoctorTitles] = useState({
        "General Practitioner": false,
        "Resident": false,
        "Specialist": false,
        "Consultant": false,
        "Professor": false,
        "Expert": false,
    });

    const [genders, setGenders] = useState({
        "Male": false,
        "Female": false,
    });

    const handleDoctorTitlesChange = (newDoctorTitles) => {
        setDoctorTitles(newDoctorTitles);
        const selectedDoctorTitles = Object.keys(newDoctorTitles).filter(title => newDoctorTitles[title]);
        setSelectedTitles(selectedDoctorTitles);
    };

    const handleGendersChange = (newGenders) => {
        setGenders(newGenders);
        const selectedGenders = Object.keys(newGenders).filter(gendr => newGenders[gendr]);
        setSelectedGenders(selectedGenders);
    };

    /* These codes were used to control Filter */

    const updateArray = (newArray) => {
        setDataDoctors(newArray);
    };

    const updateRoute = (route) => {
        setRoute(route);
    };

    return (
        <>
            <Header />
            <div className="main">
                <img className="main-bg" src={signInBg} alt="Sign In" />

                <Select
                    onArrayUpdate={updateArray}
                    onRouteUpdata={updateRoute}
                    selectedTitles={selectedTitles}
                    selectedGenders={selectedGenders}
                />

                <div className="contents choose-doctor">
                    <FiltersComp
                        doctorTitles={doctorTitles}
                        setDoctorTitles={handleDoctorTitlesChange}
                        genders={genders}
                        setGenders={handleGendersChange}
                    />
                    <ChooseComp dataDoctors={dataDoctors} route={route} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ChooseNow;
