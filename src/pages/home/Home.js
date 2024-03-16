import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../comp/header/Header";
import Footer from "../../comp/footer/Footer";
import bgHomePage from "../../images/bgHomePage.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Axios from "axios";


const Home = () => {
  const [link, setLink] = useState("http://localhost:5005");
  const [cookies, setCookies] = useCookies("access_admin_token");
  const navigate = useNavigate();
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const [specialization, setSpecialization] = useState("Specialization");
  const [doctor, setDoctor] = useState("Doctor");
  const [day, setDay] = useState("Day");
  const [start, setStart] = useState("Start");
  const [end, setEnd] = useState("End");
  const [price, setPrice] = useState("Price");
  const [check, setCheck] = useState("Check");

  useEffect(() => {
    if (!cookies.access_admin_token) {
      navigate("/SignIn");
    } else {
      Axios.get(`${link}/api/Book`).then(async (res) => {
        if (localStorage.getItem("role") === "DOCTOR") {
          await Axios.get(`${link}/api/Admin/${localStorage.getItem("access_id")}`, {
            headers: {
              'Authorization': `Bearer ${cookies.access_admin_token}`
            }
          }).then((resDoc) => {
            const dataAdmin = resDoc.data.data.admin;
            const dataBooks = res.data.data.books;
            const filterBooks = dataBooks.filter(el => el.specialization === dataAdmin.specialization && el.doctor === dataAdmin.name);
            setDefaultBooks(filterBooks);
            setBooks(filterBooks);
          })
        } else {
          setDefaultBooks(res.data.data.books);
          setBooks(res.data.data.books);
        }
      });
    }
  }, []);

  const applyFilters = () => {
    let filteredBooks = defaultBooks;

    if (specialization !== "Specialization") {
      filteredBooks = filteredBooks.filter(el => el.specialization === specialization);
    }

    if (doctor !== "Doctor") {
      filteredBooks = filteredBooks.filter(el => el.doctor === doctor);
    }

    if (day !== "Day") {
      filteredBooks = filteredBooks.filter(el => {
        const jsonObj = JSON.parse(el.attend);
        return jsonObj.day === day;
      });
    }

    if (start !== "Start") {
      filteredBooks = filteredBooks.filter(el => {
        const jsonObj = JSON.parse(el.attend);
        return jsonObj.hour.start === start;
      });
    }

    if (end !== "End") {
      filteredBooks = filteredBooks.filter(el => {
        const jsonObj = JSON.parse(el.attend);
        return jsonObj.hour.end === end;
      });
    }

    if (price !== "Price") {
      filteredBooks = filteredBooks.filter(el => el.price === price);
    }

    if (check !== "Check") {
      filteredBooks = filteredBooks.filter(el => el.check === check);
    }

    setBooks(filteredBooks);
  }

  const handleChangeSpecialization = (e) => {
    const value = e.target.value;
    setSpecialization(value);
  }

  const handleChangeDoctor = (e) => {
    const value = e.target.value;
    setDoctor(value);
  }

  const handleChangeDay = (e) => {
    const value = e.target.value;
    setDay(value);
  }

  const handleChangeStart = (e) => {
    const value = e.target.value;
    setStart(value);
  }

  const handleChangeEnd = (e) => {
    const value = e.target.value;
    setEnd(value);
  }

  const handleChangePrice = (e) => {
    const value = e.target.value;
    setPrice(value);
  }

  const handleChangeCheck = (e) => {
    const value = e.target.value;
    setCheck(value);
  }

  useEffect(() => {
    applyFilters();
  }, [specialization, doctor, day, start, end, price, check]);

  return (
    <>
      <Header />
      <div className="main home">
        <img className="main-bg" src={bgHomePage} alt="bgHomePage" />


        <h1>Home</h1>

        <div className="contents">
          <div className="container-books">

            <table border="1">
              <tbody>

                <tr>
                  <td>NUM</td>
                  <td>Name</td>
                  <td>Phone</td>
                  {/* specialization */}
                  <td>
                    <select value={specialization} onChange={(e) => { handleChangeSpecialization(e) }}>
                      <option value="Specialization">Specialization</option>
                      {
                        [...new Set(defaultBooks.map(el => el.specialization))]
                          .map((specialization, ind) => (
                            <option key={ind} value={specialization}>{specialization}</option>
                          ))
                      }
                    </select>

                  </td>
                  {/* doctor */}
                  <td>
                    <select value={doctor} onChange={(e) => {
                      handleChangeDoctor(e)
                    }}>
                      <option value="Doctor">Doctor</option>
                      {
                        [...new Set(defaultBooks.map(el => el.doctor))]
                          .map((doctor, ind) => (
                            <option key={ind} value={doctor}>{doctor}</option>
                          ))
                      }
                    </select>

                  </td>
                  {/* day */}
                  <td>
                    <select value={day} onChange={(e) => {
                      handleChangeDay(e)
                    }}>
                      <option value="Day">Day</option>
                      {
                        [...new Set(defaultBooks.map(el => JSON.parse(el.attend).day))]
                          .map((day, ind) => (
                            <option key={ind} value={day}>{day}</option>
                          ))
                      }
                    </select>
                  </td>
                  {/* start */}
                  <td>
                    <select value={start} onChange={(e) => {
                      handleChangeStart(e)
                    }}>
                      <option value="Start">Start</option>
                      {
                        [...new Set(defaultBooks.map(el => JSON.parse(el.attend).hour.start))]
                          .map((start, ind) => (
                            <option key={ind} value={start}>{start}</option>
                          ))
                      }
                    </select>
                  </td>
                  {/* end */}
                  <td>
                    <select value={end} onChange={(e) => {
                      handleChangeEnd(e)
                    }}>
                      <option value="End">End</option>
                      {
                        [...new Set(defaultBooks.map(el => JSON.parse(el.attend).hour.end))]
                          .map((end, ind) => (
                            <option key={ind} value={end}>{end}</option>
                          ))
                      }
                    </select>
                  </td>
                  {/* price */}
                  <td>
                    <select value={price} onChange={(e) => {
                      handleChangePrice(e)
                    }}>
                      <option value="Price">Price</option>
                      {
                        [...new Set(defaultBooks.map(el => el.price))]
                          .map((price, ind) => (
                            <option key={ind} value={price}>{price}</option>
                          ))
                      }
                    </select>
                  </td>
                  {/* check */}
                  <td>
                    <select value={check} onChange={(e) => {
                      handleChangeCheck(e)
                    }}>
                      <option value="Check">Check</option>
                      {
                        [...new Set(defaultBooks.map(el => el.check))]
                          .map((check, ind) => (
                            <option key={ind} value={check}>{check}</option>
                          ))
                      }
                    </select>
                  </td>
                  <td>Show</td>
                </tr>

                {books.map((el, ind) => {
                  var jsonObj = JSON.parse(el.attend);
                  return (
                    <tr key={ind}>
                      <td>{el.reservationNum}</td>
                      <td>{el.name}</td>
                      <td>{el.phone}</td>
                      <td>{el.specialization}</td>
                      <td>{el.doctor}</td>
                      <td>{jsonObj.day}</td>
                      <td>{jsonObj.hour.start}</td>
                      <td>{jsonObj.hour.end}</td>
                      <td>{el.price}</td>
                      <td>{el.check}</td>
                      <td><NavLink to={`/Book/${el._id}`} className="pointer">Details</NavLink></td>
                    </tr>
                  )
                })}

              </tbody>

            </table>


          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
