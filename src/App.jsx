import { useEffect, useState } from "react";
import RecipeBook from "./components/RecipeBook.jsx";
import Search from "./components/Search.jsx";
import MealPlan from "./components/MealPlan.jsx";
import AddRecipe from "./components/AddRecipe.jsx";

import { nanoid } from 'nanoid';
import { FaPlus } from 'react-icons/fa';

const App = () => {
    const defaultImage = 'https://thumbs.dreamstime.com/b/empty-plate-left-dinner-view-above-33349397.jpg';
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const recipesFromLocalStorage = JSON.parse(localStorage.getItem('family-dinner-planner-data'));
        if (recipesFromLocalStorage) {
            setRecipes(recipesFromLocalStorage);
        } else {
            fetch('/recipes.json')
                .then(response => response.json())
                .then(data => {
                    data.forEach((recipe) => {
                        recipe.id = nanoid();
                        if (!recipe.image) {
                            recipe.image = defaultImage;
                        }
                        if (recipe.preparationTimeInMinutes <= 30) {
                            if (!recipe.labels.includes('quick')) {
                                recipe.labels.push('quick');
                            }
                        }
                    });
                    setRecipes(data)
                })
                .catch(error => console.error('Error:', error));
        }
    }, []);

    useEffect(() => {
        if (recipes.length > 0) {
            localStorage.setItem('family-dinner-planner-data', JSON.stringify(recipes));
        }
    }, [recipes]);

    const addLabelToSearch = (label) => {
        const newSearchQuery = searchQuery.trim().length > 0 ? `${searchQuery} ${label}` : label;
        setSearchQuery(newSearchQuery);
    }

    const clearSearch = () => {
        setSearchQuery('');
    }

    const applySearchQuery = (recipes) => {
        const searchQueryItems = searchQuery.trim().split(' ');
        return searchQueryItems.reduce((filteredRecipes, searchQueryItem) => {
            return filteredRecipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(searchQueryItem.toLowerCase()) || recipe.labels.some((label) => label.toLowerCase().includes(searchQueryItem.toLowerCase()))
            )
        }, recipes);
    }

    return (
        <div className='px-8'>
            <div className='flex justify-between items-center'>
                <div className='pt-2 pb-4 gap-2 flex justify-start items-center'>
                    <img src="/dinner.jpg" alt="Family Dinner Planner" className="rounded size-12"/>
                    <h1 className='text-4xl text-[#5f574e] font-[Mouse_Memoirs] pb-4'>Family Dinner Planner</h1>
                </div>
                <button
                    className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={() => setShowModal(true)}>
                    <FaPlus/>
                </button>
            </div>
            <Search query={searchQuery} handleSearchRecipe={setSearchQuery} handleClearSearch={clearSearch}/>
            <MealPlan/>
            <RecipeBook
                handleAddLabelToSearch={addLabelToSearch}
                recipes={applySearchQuery(recipes)}
            />
            <AddRecipe isOpen={showModal}
                       handleAddRecipe={(recipe) => {
                           recipe.id = nanoid();
                           setRecipes([...recipes, recipe]);
                           setShowModal(false);
                       }}
                       handleCancelRecipe={() => setShowModal(false)
            }/>
        </div>

    );
}

export default App;
