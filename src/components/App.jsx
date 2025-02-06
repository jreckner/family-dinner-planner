import { useEffect, useState } from "react";

import RecipeBook from "./RecipeBook.jsx";
import AddRecipe from "./AddRecipe.jsx";
import MealPlan from "./MealPlan.jsx";

import { nanoid } from 'nanoid';
import Header from "./header/Header.jsx";
import Search from "./Search.jsx";
import useRecipes from "../hooks/UseLocalStorage.js";
import Labels from "./Labels.jsx";

const App = () => {
    const [ recipes, setRecipes ] = useRecipes();

    const [showModal, setShowModal] = useState(false);
    const [mealPlan, setMealPlan] = useState([]);
    const [showMealPlan, setShowMealPlan] = useState(false);

    const [availableLabels, setAvailableLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setAvailableLabels([...new Set(recipes.map((recipe => recipe.labels)).flat())]);
    }, [recipes]);

    const handleOnSearchChange = (searchQuery) => {
        setSearchQuery(searchQuery);
    }

    const filterRecipesBySearchQuery = () => {
        const searchQueryItems = [...searchQuery.trim().split(' '), ...selectedLabels];
        return searchQueryItems.reduce((filteredRecipes, searchQueryItem) => {
            return filteredRecipes
                .filter((recipe) =>
                    recipe.title.toLowerCase().includes(searchQueryItem.toLowerCase())
                    || recipe.labels.some((label) => label.toLowerCase().includes(searchQueryItem.toLowerCase())))
                .filter((recipe) => !mealPlan.some((meal) => meal.id === recipe.id));
        }, recipes);
    }

    const selectLabel = (label) => {
        setSelectedLabels([...selectedLabels, label]);
    }

    return (
        <>
            <div className="flex justify-between">
                <div className='flex-grow px-8'>
                    <Header
                        recipes={recipes}
                        handleShowAddRecipeModal={() => setShowModal(true)}
                        handleShowMealPlanSlider={() => setShowMealPlan(true)}
                    />
                    <Search onSearchChange={handleOnSearchChange} />
                    <Labels labels={availableLabels} />
                    <RecipeBook
                        handleAddLabelToSearch={selectLabel}
                        recipes={filterRecipesBySearchQuery()}
                        handleUpdateRating={(id, rating) => {
                            const updatedRecipes = recipes.map((recipe) =>
                                recipe.id === id ? {...recipe, rating} : recipe
                            );
                            setRecipes(updatedRecipes);
                        }}
                        handleMealPlan={(recipe) => {
                            if (mealPlan.length < 5) {
                                setMealPlan([...mealPlan, recipe]);
                            }
                        }}
                        handleDeleteRecipe={(id) => {
                            setRecipes(recipes.filter((recipe) => recipe.id !== id));
                        }}
                    />
                </div>
            </div>

            <MealPlan
                meals={mealPlan}
                isOpen={showMealPlan}
                removeMealFromPlan={(id) => setMealPlan(mealPlan.filter((meal) => meal.id !== id))}
                handleRequestClosed={() => setShowMealPlan(false)} />

            <AddRecipe isOpen={showModal}
                       handleAddRecipe={(recipe) => {
                           recipe.id = nanoid();
                           setRecipes([...recipes, recipe]);
                           setShowModal(false);
                       }}
                       handleCancelRecipe={() => setShowModal(false)} />
        </>
    );
}

export default App;
