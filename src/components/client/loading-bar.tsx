import React from 'react';
import '../../app/styles/globals.css'; // Import the stylesheet
export const LoadingAnimation = () => {
    return (
        <div className="w-full h-1 progress-bar3">
            <div className="h-full bg-Purple progress-infinite"></div>
        </div>
    );
};
export default LoadingAnimation
