import { useState } from 'react';

/* eslint react/prop-types: 0 */
const Rating = (props) => {
    const { defaultRating = 1, handleRatingChanged } = props;

    const [rating, setRating] = useState(defaultRating);
    const [hovered, setHovered] = useState(0);

    const stars = [1,2,3,4,5];
    const selectedIcon = "💙";
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
            <div className="flex justify-center w-full rating" style={{ fontSize: '1.3em'}}>

                { stars.map(star => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <span style={{ cursor: 'pointer' }}
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