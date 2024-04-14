import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';

const ChosseDoctor = ({ dataDoctors, route }) => {
    const [link, setLink] = useState("http://localhost:5005");
    const [cookies, setCookies] = useCookies("access_admin_token");


    const handleDelete = (id) => {
        Axios.delete(`${link}/api/${route}/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.access_admin_token}`
            }
        }).then((res) => {
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <section className="show" >
            {
                dataDoctors.map((el, ind) => {
                    return (
                        <div className="doc" key={ind}>

                            <div><img src={`${link}/uploads/${el.avatar}`} alt="doc" /></div>

                            <hr></hr>

                            <div>
                                <h4>{el.name}</h4>
                                <p>{el.specialization}</p>
                                {el.attend.map((ell, indd) => {

                                    return (
                                        <p key={indd}>{ell.day} {ell.hour.start} To {ell.hour.end}</p>
                                    )
                                })}

                            </div>


                            <div className="handle-choose">
                                <NavLink to={`/ShowDoctors/${route}/${el._id}`}><button>Edit</button></NavLink>
                                <button onClick={() => {
                                    handleDelete(el._id)
                                }}>Delete</button>
                            </div>


                        </div>
                    )
                })
            }
        </ section>
    );
}

export default ChosseDoctor;
