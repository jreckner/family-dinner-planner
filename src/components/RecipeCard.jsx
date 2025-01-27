import { useState } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import Rating from "./Rating.jsx";

/* eslint react/prop-types: 0 */
const RecipeCard = (props) => {
    const { key, recipe, addLabelToSearch } = props;

    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

    return (
        <article id={key} className="flex flex-col bg-white shadow-2xl rounded-lg text-[#5f574e] transform transition duration-500 hover:scale-102">
            <div className='flex-grow'>
                <img
                    className="w-full h-48 object-cover
                               object-center rounded-t-lg"
                    src={recipe.image}
                    alt={recipe.title}
                />
                <section className="flex flex-col gap-4 p-4 md:p-2 md:py-1">

                    <h1 className="text-3xl font-[Mouse_Memoirs]">{recipe.title}</h1>
                    {recipe.description.length > 0 && (
                        <p>{recipe.description}</p>
                    )}
                    <div className="bg-[#f5fff9] rounded-lg p-2 flex flex-col gap-y-3">
                        <h3 className="text-md font-semibold text-[#7b284f]">
                            Preparation time: {recipe.preparationTimeInMinutes} minutes
                        </h3>
                    </div>
                </section>

                <section className="flex flex-col gap-4 p-4 md:p-2 md:py-1">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-[Mouse_Memoirs]">Ingredients</h2>
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

                {recipe.instructions.length > 0 && (
                    <section className="flex flex-col gap-4 p-2 md:p-2 md:py-1">
                        <hr className="pb-4"/>
                        <div className="flex content-center justify-between">
                            <h2 className="text-2xl font-[Mouse_Memoirs]">Instructions</h2>
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
            <Rating defaultRating={recipe.rating} />
            {recipe.labels.length > 0 && (
                <div className="flex justify-start p-2">
                    {recipe.labels.map((label, index) => (
                        <span key={index}
                              onClick={() => addLabelToSearch(label)}
                              className="cursor-pointer bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">{label}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

export default RecipeCard;