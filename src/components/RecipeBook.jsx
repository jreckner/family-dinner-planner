import RecipeCard from "./RecipeCard.jsx";
import {useRecipesContext} from "../providers/RecipesProvider.jsx";

/* eslint react/prop-types: 0 */
const RecipeBook = ({ recipesFilter, meals, handleAddLabelToSearch, handleMealPlan }) => {
    const { recipes, setRecipes } = useRecipesContext();

    const filterRecipesBySearchQuery = () => {
        const searchQueryItems = recipesFilter.trim().split(' ');
        return searchQueryItems.reduce((filteredRecipes, searchQueryItem) => {
            return filteredRecipes
                .filter((recipe) =>
                    recipe.title.toLowerCase().includes(searchQueryItem.toLowerCase())
                    || recipe.labels.some((label) => label.toLowerCase().includes(searchQueryItem.toLowerCase())))
                .filter((recipe) => !meals.some((meal) => meal.id === recipe.id));
        }, recipes);
    }

    const handleUpdateRating = (id, rating) => {
        const updatedRecipes = recipes.map((recipe) =>
            recipe.id === id ? {...recipe, rating} : recipe
        );
        setRecipes(updatedRecipes);
    }

    const handleDeleteRecipe=(id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] gap-[1em]'>
            {filterRecipesBySearchQuery()?.map((recipe) => (
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