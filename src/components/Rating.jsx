import { useState } from 'react';

/* eslint react/prop-types: 0 */
const Rating = (props) => {
    const { defaultRating = 1, handleRatingChanged } = props;

    const [rating, setRating] = useState(defaultRating);
    const [hovered, setHovered] = useState(0);

    const stars = [1,2,3,4,5];
    const selectedIcon = "❤️";
    const deselectedIcon = "🖤";

    const changeRating = (newRating) => {
        setRating(newRating);
        handleRatingChanged(newRating);
    }

    const hoverRating= (newHovered) => {
        setHovered(newHovered);
    }

    return (
        <div>
            <div className="flex justify-center w-full rating p-1" style={{ fontSize: '1.2em'}}>
                { stars.map(star => {
                    return (
                        <span key={star} style={{ cursor: 'pointer' }}
                            onClick={() => { changeRating(star); }}
                            onMouseEnter={() => { hoverRating(star); }}
                            onMouseLeave={() => { hoverRating(0); }}>
                                { rating < star
                                    ? hovered < star ? deselectedIcon : selectedIcon
                                    : selectedIcon
                                }
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default Rating;