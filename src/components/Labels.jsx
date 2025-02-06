import { useState } from "react";

/* eslint react/prop-types: 0 */
const Labels = ({labels}) => {
    const [selectedLabels, setSelectedLabels] = useState([]);

    const selectLabel = (label) => {
        setSelectedLabels([...selectedLabels, label]);
    }

    return (
        <div className="flex justify-start pb-2">
            {labels.map((label, index) => (
                <span key={index}
                      onClick={() => selectLabel(label)}
                      className={`cursor-pointer bg-blue-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400`}>{label}</span>
            ))}
        </div>
    )
}

export default Labels;
