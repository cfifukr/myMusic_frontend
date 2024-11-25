import React from 'react';
import './ProgressBar.css'; 

const ProgressBar = ({ progress, duration, onChange }) => {
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <div className='progress-bar-container'>
            <input
                type='range'
                min='0'
                max={duration}
                value={progress}
                onChange={handleInputChange}
                className='progress-bar'
            />
            
        </div>
    );
};

export default ProgressBar;
