import { useEffect, useState } from "react";

import RecipeBook from "./RecipeBook.jsx";
import AddRecipe from "./AddRecipe.jsx";
import MealPlan from "./MealPlan.jsx";

import { nanoid } from 'nanoid';
import Header from "./header/Header.jsx";
import Search from "./Search.jsx";
import Labels from "./Labels.jsx";

import {useRecipesContext} from "../providers/RecipesProvider.jsx";

const App = () => {
    const { recipes, setRecipes } = useRecipesContext();
    const [mealPlan, setMealPlan] = useState([]);
    const [availableLabels, setAvailableLabels] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    const [showMealPlan, setShowMealPlan] = useState(false);

    useEffect(() => {
        setAvailableLabels([...new Set(recipes.map((recipe => recipe.labels)).flat())]);
    }, [recipes]);

    const addLabelToSearchQuery = (label) => {
        const newSearchQuery = searchQuery.trim().length > 0 ? `${searchQuery} ${label} ` : label;
        setSearchQuery(newSearchQuery);
    }

    return (
        <>
            <div className="flex justify-between">
                <div className='flex-grow px-8'>
                    <Header
                        handleShowAddRecipeModal={() => setShowAddRecipeModal(true)}
                        handleShowMealPlanSlider={() => setShowMealPlan(true)}
                    />
                    <Search query={searchQuery} handleQueryOnChange={setSearchQuery} />
                    <Labels labels={availableLabels} handleLabelOnClick={addLabelToSearchQuery} />
                    <RecipeBook
                        recipesFilter={searchQuery}
                        meals={mealPlan}
                        handleAddLabelToSearch={addLabelToSearchQuery}
                        handleMealPlan={(recipe) => {
                            if (mealPlan.length < 5) {
                                setMealPlan([...mealPlan, recipe]);
                            }
                        }}
                    />
                </div>
            </div>

            <MealPlan
                meals={mealPlan}
                isOpen={showMealPlan}
                removeMealFromPlan={(id) => setMealPlan(mealPlan.filter((meal) => meal.id !== id))}
                handleRequestClosed={() => setShowMealPlan(false)} />

            <AddRecipe isOpen={showAddRecipeModal}
                       handleAddRecipe={(recipe) => {
                           recipe.id = nanoid();
                           setRecipes([...recipes, recipe]);
                           setShowAddRecipeModal(false);
                       }}
                       handleCancelRecipe={() => setShowAddRecipeModal(false)} />
        </>
    );
}

export default App;
