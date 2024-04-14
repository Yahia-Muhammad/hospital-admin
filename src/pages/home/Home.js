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
  const [month, setMonth] = useState("Month");
  const [dayNum, setDayNum] = useState("Day");
  const [year, setYear] = useState("Year");
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
      filteredBooks = filteredBooks.filter(el => el.attend.day === day);
    }

    if (month !== "Month") {
      filteredBooks = filteredBooks.filter(el => el.attend.date.month === month);
    }

    if (dayNum !== "Day") {
      filteredBooks = filteredBooks.filter(el => el.attend.date.day === dayNum);
    }

    if (year !== "Year") {
      filteredBooks = filteredBooks.filter(el => el.attend.date.year === year);
    }

    if (start !== "Start") {
      filteredBooks = filteredBooks.filter(el => el.attend.hour.start === start);
    }

    if (end !== "End") {
      filteredBooks = filteredBooks.filter(el => el.attend.hour.end === end);
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

  const handleChangeMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
  }

  const handleChangeDayNum = (e) => {
    const value = e.target.value;
    setDayNum(isNaN(value) ? "Day" : parseInt(value));
  }

  const handleChangeYear = (e) => {
    const value = e.target.value;
    setYear(value);
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
  }, [specialization, doctor, day, month, dayNum, year, start, end, price, check]);

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
                  <td>
                    <select value={specialization} onChange={(e) => { handleChangeSpecialization(e) }}>
                      <option value="Specialization">Specialization</option>
                      {[...new Set(defaultBooks.map(el => el.specialization))].map((specialization, ind) => (
                        <option key={ind} value={specialization}>{specialization}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={doctor} onChange={(e) => { handleChangeDoctor(e) }}>
                      <option value="Doctor">Doctor</option>
                      {[...new Set(defaultBooks.map(el => el.doctor))].map((doctor, ind) => (
                        <option key={ind} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={day} onChange={(e) => { handleChangeDay(e) }}>
                      <option value="Day">Day</option>
                      {[...new Set(defaultBooks.map(el => el.attend.day))].map((day, ind) => (
                        <option key={ind} value={day}>{day}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={month} onChange={(e) => { handleChangeMonth(e) }}>
                      <option value="Month">Month</option>
                      {[...new Set(defaultBooks.map(el => el.attend.date.month))].map((month, ind) => (
                        <option key={ind} value={month}>{month}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={dayNum} onChange={(e) => { handleChangeDayNum(e) }}>
                      <option value="Day">Day</option>
                      {[...new Set(defaultBooks.map(el => el.attend.date.day))].map((day, ind) => (
                        <option key={ind} value={day}>{day}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={year} onChange={(e) => { handleChangeYear(e) }}>
                      <option value="Year">Year</option>
                      {[...new Set(defaultBooks.map(el => el.attend.date.year))].map((year, ind) => (
                        <option key={ind} value={year}>{year}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select value={start} onChange={(e) => { handleChangeStart(e) }}>
                      <option value="Start">Start</option>
                      {[...new Set(defaultBooks.map(el => el.attend.hour.start))].map((start, ind) => (
                        <option key={ind} value={start}>{start}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={end} onChange={(e) => { handleChangeEnd(e) }}>
                      <option value="End">End</option>
                      {[...new Set(defaultBooks.map(el => el.attend.hour.end))].map((end, ind) => (
                        <option key={ind} value={end}>{end}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={price} onChange={(e) => { handleChangePrice(e) }}>
                      <option value="Price">Price</option>
                      {[...new Set(defaultBooks.map(el => el.price))].map((price, ind) => (
                        <option key={ind} value={price}>{price}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={check} onChange={(e) => { handleChangeCheck(e) }}>
                      <option value="Check">Check</option>
                      {[...new Set(defaultBooks.map(el => el.check))].map((check, ind) => (
                        <option key={ind} value={check}>{check}</option>
                      ))}
                    </select>
                  </td>
                  <td>Show</td>
                </tr>
                {books.map((el, ind) => (
                  <tr key={ind}>
                    <td>{el.reservationNum}</td>
                    <td>{el.name}</td>
                    <td>{el.phone}</td>
                    <td>{el.specialization}</td>
                    <td>{el.doctor}</td>
                    <td>{el.attend.day}</td>
                    <td>{el.attend.date.month}</td>
                    <td>{el.attend.date.day}</td>
                    <td>{el.attend.date.year}</td>
                    <td>{el.attend.hour.start}</td>
                    <td>{el.attend.hour.end}</td>
                    <td>{el.price}</td>
                    <td>{el.check}</td>
                    <td><NavLink to={`/Book/${el._id}`} className="pointer">Details</NavLink></td>
                  </tr>
                ))}
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
