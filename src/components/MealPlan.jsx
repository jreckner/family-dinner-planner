import { useEffect, useState } from "react";

import { FaShoppingCart } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

/* eslint react/prop-types: 0 */
const MealPlan = (props) => {
    const { meals = [], removeMealFromPlan } = props;
    const [ groceryList, setGroceryList ] = useState([]);

    useEffect(() => {
        let updatedList = [];
        meals.forEach(meal => {
            updatedList = [...updatedList, ...meal.ingredientLines]
        })
        setGroceryList([...updatedList]);
    }, [groceryList, meals]);

    return (
        <div className="flex flex-col justify-between p-4 gap-2 transform transition duration-500">
            {meals.map((meal, index) => (
                <article
                    key={index}
                    className="relative flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-20">
                    <GrClear className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                             onClick={() => removeMealFromPlan(meal.id)}/>
                    <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>
                        {meal.title}
                    </h1>
                </article>
            ))}
            {[...Array(5 - meals.length)].map((_, index) => (
                <article
                    key={index}
                    className="relative flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-20">
                    <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>
                        Meal #{index + 1}
                    </h1>
                </article>
            ))}
            {groceryList.length > 0 && (
                <div className="text-[#5f574e]">
                    <div className="flex items-center gap-4">
                        <FaShoppingCart />
                        <h2 className="text-2xl font-[Mouse_Memoirs]">Grocery List</h2>
                    </div>
                    <ul className="bg-[#fffef5] rounded-lg p-2 marker:text-[#854632] list-disc flex flex-col gap-y-3 px-6">
                        {groceryList.map((ingredient, index) => (
                            <li key={index} className="pl-4">{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MealPlan;