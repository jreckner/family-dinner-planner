import { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import RecipeBook from "./components/RecipeBook.jsx";
import Search from "./components/Search.jsx";
import AddRecipe from "./components/AddRecipe.jsx";
import MealPlan from "./components/MealPlan.jsx";

import { nanoid } from 'nanoid';
import { FaAngleDoubleRight, FaDownload, FaPlus, FaShoppingCart } from 'react-icons/fa';
import {useAuth} from "./AuthProvider.jsx";
import RoleRequired from "./RoleRequired.js";

const Landing = () => {
    const defaultImage = 'https://thumbs.dreamstime.com/b/empty-plate-left-dinner-view-above-33349397.jpg';
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mealPlan, setMealPlan] = useState([]);
    const [showMealPlan, setShowMealPlan] = useState(false);
    const [availableLabels, setAvailableLabels] = useState([]);

    const { user, login, logout } = useAuth();

    useEffect(() => {
        const labels = recipes.reduce((acc, recipe) => {
            return [...acc, ...recipe.labels];
        }, []);
        setAvailableLabels([...new Set(labels)].sort());
    }, [recipes, availableLabels]);

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
            return filteredRecipes
                .filter((recipe) =>
                    recipe.title.toLowerCase().includes(searchQueryItem.toLowerCase())
                    || recipe.labels.some((label) => label.toLowerCase().includes(searchQueryItem.toLowerCase())))
                .filter((recipe) => !mealPlan.some((meal) => meal.id === recipe.id));
        }, recipes);
    }

    const getCurrentMealPlanDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - dayOfWeek + 1);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const options = { month: 'numeric', day: 'numeric' };
        const mondayStr = monday.toLocaleDateString(undefined, options);
        const sundayStr = sunday.toLocaleDateString(undefined, options);

        return `Monday ${mondayStr} - Sunday ${sundayStr}`;
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(recipes),
            fileName: 'recipes.json',
            fileType: 'text/json',
        })
    }

    return (
        <div className="flex justify-between">
            <div className='flex-grow px-8'>
                <div className='flex justify-between items-center'>
                    <div className='pt-2 pb-4 gap-2 flex justify-start items-center'>
                        <img src="/dinner.jpg" alt="Family Dinner Planner" className="rounded size-12"/>
                        <h1 className='text-4xl text-[#5f574e] font-primary pb-4'>Family Dinner Planner</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        {!user && (<GoogleLogin size="large" text="continue_with" shape="pill" onSuccess={login} useOneTap auto_select />)}
                        {user && (<img src={user.picture} alt="User profile" className="rounded-full w-12 cursor-pointer" onClick={logout}/>)}
                        <RoleRequired requiredRoles={["admin"]}>
                            <button
                                className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={exportToJson}>
                                <FaDownload />
                            </button>
                            <button
                                className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={() => setShowModal(true)}>
                                <FaPlus/>
                            </button>
                        </RoleRequired>
                        <button
                            className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={() => setShowMealPlan(true)}>
                        <FaShoppingCart />
                        </button>
                    </div>
                </div>
                <Search query={searchQuery} handleSearchRecipe={setSearchQuery} handleClearSearch={clearSearch}/>
                {availableLabels.length > 0 && (
                    <div className="flex justify-start pb-2">
                        {availableLabels.map((label, index) => (
                            <span key={index}
                                  onClick={() => addLabelToSearch(label)}
                                  className="cursor-pointer bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">{label}</span>
                        ))}
                    </div>
                )}
                <RecipeBook
                    handleAddLabelToSearch={addLabelToSearch}
                    recipes={applySearchQuery(recipes)}
                    handleUpdateRating={(id, rating) => {
                        const updatedRecipes = recipes.map((recipe) =>
                            recipe.id === id ? { ...recipe, rating } : recipe
                        );
                        setRecipes(updatedRecipes);
                    }}
                    handleMealPlan={(recipe) => {
                        if (mealPlan.length < 5) {
                            setMealPlan([...mealPlan, recipe]);
                        } // TODO: Add a message if the meal plan is full
                    }}
                    handleDeleteRecipe={(id) => {
                        setRecipes(recipes.filter((recipe) => recipe.id !== id));
                        setShowModal(false);
                    }}
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
            <SlidingPane
                closeIcon={<FaAngleDoubleRight />}
                title="Meal Plan"
                subtitle={getCurrentMealPlanDates()}
                from="right"
                isOpen={showMealPlan}
                width="460px"
                onRequestClose={() => setShowMealPlan(false)}
            >
                <MealPlan meals={mealPlan}
                          removeMealFromPlan={(id) => setMealPlan(mealPlan.filter((meal) => meal.id !== id))}/>
            </SlidingPane>
        </div>
    );
}

export default Landing;
