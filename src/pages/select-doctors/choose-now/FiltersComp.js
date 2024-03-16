import React, { useState } from "react";

const Filters = ({ doctorTitles, setDoctorTitles, genders, setGenders }) => {
    const [showFilter, setShowFilter] = useState("hide");

    const handleDoctorTitleChange = (event) => {
        const { name, checked } = event.target;
        setDoctorTitles({ ...doctorTitles, [name]: checked });
    };

    const handleGenderChange = (event) => {
        const { name, checked } = event.target;
        setGenders({ ...genders, [name]: checked });
    };

    const handleSelectAll = (category) => {
        if (category === "doctorTitles") {
            const allChecked = Object.values(doctorTitles).every((value) => value);
            const updatedTitles = Object.keys(doctorTitles).reduce((acc, key) => {
                acc[key] = !allChecked;
                return acc;
            }, {});
            setDoctorTitles(updatedTitles);
        } else if (category === "genders") {
            const allChecked = Object.values(genders).every((value) => value);
            const updatedGenders = Object.keys(genders).reduce((acc, key) => {
                acc[key] = !allChecked;
                return acc;
            }, {});
            setGenders(updatedGenders);
        }
    };

    const handleShowFilter = () => {
        showFilter === "hide" ? setShowFilter("show-filter") : setShowFilter("hide")
    }


    return (
        <section className={`filters ${showFilter}`}>
            <span className="header-filter"><h2>Filters</h2><h2 className="btn-show-filter" onClick={handleShowFilter}>+</h2></span>

            <div>
                <h3>Doctor Title</h3>
                <ul>
                    {Object.entries(doctorTitles).map(([title, isChecked]) => (
                        <li key={title}>
                            <input
                                type="checkbox"
                                name={title}
                                checked={isChecked}
                                onChange={handleDoctorTitleChange}
                            />
                            {title}
                        </li>
                    ))}
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={Object.values(doctorTitles).every((value) => value)}
                                onChange={() => handleSelectAll("doctorTitles")}
                            />
                            Select All
                        </label>
                    </li>
                </ul>
            </div>
            <div>
                <h3>Gender</h3>
                <ul>
                    {Object.entries(genders).map(([gender, isChecked]) => (
                        <li key={gender}>
                            <input
                                type="checkbox"
                                name={gender}
                                checked={isChecked}
                                onChange={handleGenderChange}
                            />
                            {gender}
                        </li>
                    ))}
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={Object.values(genders).every((value) => value)}
                                onChange={() => handleSelectAll("genders")}
                            />
                            Select All
                        </label>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Filters;
