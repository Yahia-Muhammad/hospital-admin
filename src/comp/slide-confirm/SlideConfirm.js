import React from 'react';
import './SlideConfirm.css';

const SlideConfirm = ({ text, showConfirm }) => {
    return (
        <div className={`slide-confirm ${showConfirm}`}>{text}</div>
    );
}

export default SlideConfirm;
