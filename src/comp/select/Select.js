import React, { useState, useEffect } from "react";
import "./Select.css";
import DoctorSvg from "../../comp/svg/DoctorSvg.svg";
import SpecialtiesSvg from "../../comp/svg/SpecialtiesSvg.svg";
import Axios from "axios";

const Select = ({
  onArrayUpdate,
  onRouteUpdata,
  selectedTitles,
  selectedGenders
}) => {

  const [link, setLink] = useState("http://localhost:5005");
  const [doctors, setDoctors] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  // data you need
  const [route, setRoute] = useState("Specialization");
  const [doctor, setDoctor] = useState("");
  const [specialization, setSpecialization] = useState("specialization");
  // data you need

  const handleChangeRoute = (e) => {
    const value = e.target.value;
    setRoute(value.replaceAll(" ", "_"));
    setSpecialization(value);
  };

  const handleChangeDoctor = (e) => {
    const value = e.target.value;
    setDoctor(value);
  };

  useEffect(() => {
    if (firstRender === true) {
      setFirstRender(false);
      setDoctors([]);
      return;
    } else {
      if (route !== "Specialization") {
        Axios.get(`${link}/api/${route}`).then((res) => {
          setDoctors(res.data.data.doctors);
        });
      }
    }
  }, [route, doctor, onRouteUpdata, onArrayUpdate]);

  const handleClick = () => {
    if (route !== "Specialization") {

      if (doctor === "Doctors" || doctor === "") {

        Axios.get(`${link}/api/${route}`).then((res) => {

          let filterDoc;

          if (selectedTitles.length >= 1 || selectedGenders.length >= 1) {

            filterDoc = res.data.data.doctors.filter(
              (el) => selectedTitles.includes(el.title) || selectedGenders.includes(el.gendr)
            );

          } else {

            filterDoc = res.data.data.doctors;

          }

          onRouteUpdata(route);
          onArrayUpdate(filterDoc);
        });
      } else {
        Axios.get(`${link}/api/${route}/${doctor}`).then((res) => {

          let filterDoc;

          if (selectedTitles.length >= 1 || selectedGenders.length >= 1) {
            filterDoc = [res.data.data.doctor].filter(
              (el) =>
                selectedTitles.includes(el.title) || selectedGenders.includes(el.gendr)
            );
          } else {
            filterDoc = [res.data.data.doctor]
          }

          onRouteUpdata(route);
          onArrayUpdate(filterDoc);
        });
      }
    } else {
      setDoctors([]);
      onArrayUpdate([]);
      onRouteUpdata("");
    }
  };

  return (
    <div className="contents select">
      <div className="selected">
        <div>
          <img src={SpecialtiesSvg} alt="Specialties" />
          <select value={specialization} onChange={handleChangeRoute}>
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
        </div>

        <div>
          <img src={DoctorSvg} alt="Doctors" />
          <select value={doctor} onChange={handleChangeDoctor}>
            <option>Doctors</option>
            {doctors.map((el, ind) => {
              return (
                <option value={el._id} key={ind}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>

        <button onClick={handleClick}>Search</button>


      </div>
    </div>
  );
};

export default Select;
