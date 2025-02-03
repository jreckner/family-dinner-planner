import RecipeCard from "./RecipeCard.jsx";

/* eslint react/prop-types: 0 */
const RecipeBook = ({ handleAddLabelToSearch, recipes, handleUpdateRating, handleMealPlan, handleDeleteRecipe }) => {
    return (
        <div className='recipes-list'>
            {recipes.map((recipe) => (
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