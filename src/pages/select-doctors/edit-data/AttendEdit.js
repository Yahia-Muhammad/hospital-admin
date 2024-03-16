import React, { useState, useEffect } from 'react';

const AttendEdit = ({ arrAttend, onUpdateAttend }) => {
    const [attend, setAttend] = useState([]);

    useEffect(() => {
        const updatedAttend = arrAttend.map(jsonString => JSON.parse(jsonString));
        setAttend(updatedAttend);
    }, [arrAttend]);

    const handleEditAttend = (index, field, value) => {
        const updatedAttendList = [...attend];
        if (field === 'day') {
            updatedAttendList[index].day = value;
        } else if (field === 'start') {
            updatedAttendList[index].hour.start = value;
        } else if (field === 'end') {
            updatedAttendList[index].hour.end = value;
        }
        setAttend(updatedAttendList);
        onUpdateAttend(updatedAttendList);

    };



    return (
        <>
            {attend.map((el, ind) => {
                return (
                    <span className='attend' key={ind}>
                        <select defaultValue={el.day} onChange={(e) => handleEditAttend(ind, 'day', e.target.value)}>
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
                            <input type="text" placeholder="Start" defaultValue={el.hour.start} onChange={(e) => handleEditAttend(ind, 'start', e.target.value)} />
                        </span>
                        <span>
                            <label>End : </label>
                            <input type="text" placeholder="End" defaultValue={el.hour.end} onChange={(e) => handleEditAttend(ind, 'end', e.target.value)} />
                        </span>
                    </span>
                )
            })}
        </>
    );
}

export default AttendEdit;
