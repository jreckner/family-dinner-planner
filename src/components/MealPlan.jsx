import { useEffect, useState } from "react";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { FaAngleDoubleRight, FaShoppingCart } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { DEFAULT_RECIPE_IMAGE } from "../lib/constants.js";
import { getCurrentMealPlanDates } from "../lib/helpers.js";

/* eslint react/prop-types: 0 */
const MealPlan = ({ meals, isOpen, removeMealFromPlan, handleRequestClosed }) => {
    const [ groceryList, setGroceryList ] = useState([]);

    useEffect(() => {
        let updatedList = [];
        meals.forEach(meal => {
            updatedList = [...updatedList, ...meal.ingredientLines]
        })
        setGroceryList([...updatedList]);
    }, [meals]);

    return (
        <SlidingPane
            closeIcon={<FaAngleDoubleRight />}
            title="Meal Plan"
            subtitle={getCurrentMealPlanDates()}
            from="right"
            isOpen={isOpen}
            width="460px"
            onRequestClose={handleRequestClosed}>
            <div className="flex flex-col justify-center gap-2 transform transition duration-500">
                {meals.map((meal, index) => (
                    <article
                        key={index}
                        className="relative flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-20">
                        <GrClear className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                 onClick={() => removeMealFromPlan(meal.id)}/>
                        <div className="relative w-full cursor-not-allowed" onClick={() => removeMealFromPlan(meal.id)}>
                            <img
                                className="w-full h-20 object-cover object-center rounded-lg"
                                src={meal.image}
                                alt={meal.title}
                            />
                            <p className="absolute inset-0 flex items-center justify-center text-5xl font-primary text-white font-bold font-outline">
                                {meal.title}
                            </p>
                        </div>
                    </article>
                ))}
                {[...Array(5 - meals.length)].map((_, index) => (
                    <article
                        key={index}
                        className="relative flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-20">
                        <div className="relative w-full">
                            <img
                                className="w-full h-20 object-cover object-center rounded-lg"
                                src={DEFAULT_RECIPE_IMAGE}
                                alt="Choose a meal"
                            />
                            {/*
                            <p className="absolute inset-0 flex items-center justify-center text-5xl font-primary text-white font-bold font-outline">
                                Choose Meal #{meals.length + index + 1} ...
                            </p>
                            */}
                        </div>
                    </article>
                ))}
                {groceryList.length > 0 && (
                    <div className="bg-[#fffef5] w-100 mt-4 text-[#5f574e] shadow-lg p-2 border border-[#5f574e]/5">
                        <div className="flex items-center gap-4">
                            <FaShoppingCart/>
                            <h2 className="text-2xl font-primary">Grocery List</h2>
                        </div>
                        <ul className="bg-[#fffef5] p-2 marker:text-[#854632] list-disc flex flex-col gap-y-3 px-6">
                            {groceryList.map((ingredient, index) => (
                                <li key={index} className="pl-4 underline ">{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </SlidingPane>
    );
}

export default MealPlan;