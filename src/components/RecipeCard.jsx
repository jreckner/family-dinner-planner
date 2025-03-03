import { useState } from "react";
import { Tooltip } from 'react-tailwind-tooltip';

import Rating from "./Rating.jsx";
import RoleRequired from "./RoleRequired.js";

import { FcCollapse, FcExpand } from "react-icons/fc";
import { FaClipboardList, FaUtensils } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import { PiTimerBold } from "react-icons/pi";
import { RiDeleteBin2Line } from "react-icons/ri";

/* eslint react/prop-types: 0 */
const RecipeCard = (props) => {
    const { recipe, updateRating, addLabelToSearch, addMealToPlan, deleteRecipe } = props;

    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

    const handleUpdateRating = (newRating) => {
        updateRating(recipe.id, newRating);
    }

    return (
        <article id={recipe.id} className="flex flex-col bg-[#FAF9F6] max-w-108 shadow-2xl rounded-lg text-[#5f574e] hover:scale-102">
            <div className='flex-grow'>
                <div className="relative">
                    <img
                        className="w-full h-45 object-cover object-center rounded-t-lg"
                        src={recipe.image}
                        alt={recipe.title}
                    />
                    <div className="absolute top-2 right-2">
                        <RoleRequired requiredRoles={["admin"]}>
                            <div className="flex gap-1">
                                <MdModeEdit
                                    className="fill-red-700 bg-white cursor-pointer text-white rounded-full p-1"
                                    onClick={() => console.log(recipe.id)}
                                    size='2.0em' />
                                <RiDeleteBin2Line
                                    className="fill-red-700 bg-white cursor-pointer text-white rounded-full p-1"
                                    onClick={() => deleteRecipe(recipe.id)}
                                    size='2.0em' />
                            </div>
                        </RoleRequired>
                    </div>
                </div>
                <section className="flex flex-col gap-2 p-4 md:p-2 md:py-1">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-primary">{recipe.title}</h1>
                        <Tooltip title="Add Meal to Plan" placement="left" arrowStyle="bg-[#5f574e]" tooltipStyle="bg-[#5f574e] text-white font-primary" arrow>
                            <GiHotMeal className="fill-orange-700 cursor-pointer " onClick={() => addMealToPlan(recipe)} size="1.3em" />
                        </Tooltip>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                        <div className="flex items-center gap-1">
                            {recipe.ingredientLines.length > 0 && (
                                <Tooltip title="Show Ingredients" placement="right" arrowStyle="bg-[#5f574e]" tooltipStyle="bg-[#5f574e] text-white font-primary" arrow>
                                    <FaUtensils className="cursor-pointer" onClick={() => setIsIngredientsOpen(!isIngredientsOpen)} />
                                </Tooltip>
                            )}
                            {recipe.instructions.length > 0 && (
                                <Tooltip title="Show Instructions" placement="right" arrowStyle="bg-[#5f574e]" tooltipStyle="bg-[#5f574e] text-white font-primary" arrow>
                                    <FaClipboardList className="cursor-pointer" onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}/>
                                </Tooltip>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <PiTimerBold size="1.4em"/><p className="text-xl text-[#5f574e] font-primary">{recipe.preparationTimeInMinutes} minutes</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-1">
                        {recipe.description.length > 0 && (
                            <p className="italic">{recipe.description}</p>
                        )}
                    </div>
                </section>

                { isIngredientsOpen && (
                <section className="flex flex-col gap-4 p-4 md:p-2 md:py-1">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-primary">Ingredients</h2>
                        {(isIngredientsOpen
                                ? <FcCollapse onClick={() => setIsIngredientsOpen(!isIngredientsOpen)} size='1.3em'/>
                                : <FcExpand onClick={() => setIsIngredientsOpen(!isIngredientsOpen)} size='1.3em'/>
                        )}
                    </div>
                    {isIngredientsOpen && (
                        <ul className="bg-[#fffef5] rounded-lg p-2 marker:text-[#854632] list-disc flex flex-col gap-y-3 px-6">
                            {recipe.ingredientLines.map((ingredient, index) => (
                                <li key={index} className="pl-4">{ingredient}</li>
                            ))}
                        </ul>
                    )}
                </section>
                )}

                {recipe.instructions.length > 0 && (
                    <section className="flex flex-col gap-4 p-2 md:p-2 md:py-1">
                        <hr className="pb-4"/>
                        <div className="flex content-center justify-between">
                            <h2 className="text-2xl font-primary">Instructions</h2>
                            {(isInstructionsOpen
                                    ? <FcCollapse onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                                                  size='1.3em'/>
                                    :
                                    <FcExpand onClick={() => setIsInstructionsOpen(!isInstructionsOpen)} size='1.3em'/>
                            )}
                        </div>
                        {isInstructionsOpen && (
                            <ol className="marker:text-[#854632] marker:font-bold list-decimal flex flex-col gap-y-3 px-6">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index} className="pl-4">{instruction}</li>
                                ))}
                            </ol>
                        )}
                    </section>
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex justify-start p-2">
                    {recipe.labels.sort().map((label, index) => (
                        <span key={index}
                              onClick={() => addLabelToSearch(label)}
                              className="cursor-pointer bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">{label}</span>
                    ))}
                </div>
                <Rating defaultRating={recipe.rating} handleRatingChanged={handleUpdateRating}/>
            </div>
        </article>
    );
}

export default RecipeCard;