import RecipeCard from "./RecipeCard.jsx";

/* eslint react/prop-types: 0 */
const RecipeBook = ({ handleAddLabelToSearch, recipes, handleUpdateRating, handleMealPlan, handleDeleteRecipe }) => {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] gap-[1em]'>
            {recipes?.map((recipe) => (
                <RecipeCard key={recipe.id}
                            recipe={recipe}
                            updateRating={handleUpdateRating}
                            addLabelToSearch={handleAddLabelToSearch}
                            addMealToPlan={handleMealPlan}
                            deleteRecipe={handleDeleteRecipe} />
            ))}
        </div>
    );
}

export default RecipeBook;