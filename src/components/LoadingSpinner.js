import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './LoadingSpinner.css';

const LoadingSpinner = ({ hidden, centered, colored, small }) => {
    return(
        <div className={`loading-spinner ${hidden ? 'hidden' : ''} ${centered ? 'centered' : ''} ${colored ? 'colored' : ''}`}>
            <CircularProgress color="inherit" size={small ? 20 : 40} />
        </div>
    );
};

export default LoadingSpinner;