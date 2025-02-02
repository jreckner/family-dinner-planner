import RecipeCard from "./RecipeCard.jsx";

/* eslint react/prop-types: 0 */
const RecipeBook = ({ handleAddLabelToSearch, recipes, handleMealPlan, handleDeleteRecipe }) => {
    return (
        <div className='recipes-list'>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id}
                            recipe={recipe}
                            addLabelToSearch={handleAddLabelToSearch}
                            addMealToPlan={handleMealPlan}
                            deleteRecipe={handleDeleteRecipe} />
            ))}
        </div>
    );
}

export default RecipeBook;