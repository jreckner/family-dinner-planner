import RecipeCard from "./RecipeCard.jsx";

/* eslint react/prop-types: 0 */
const RecipeBook = ({ handleAddLabelToSearch, recipes }) => {
    return (
        <div className='recipes-list'>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} addLabelToSearch={handleAddLabelToSearch}/>
            ))}
        </div>
    );
}

export default RecipeBook;