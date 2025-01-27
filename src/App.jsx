import { useEffect, useState } from "react";
import RecipeBook from "./components/RecipeBook.jsx";
import Search from "./components/Search.jsx";

const App = () => {
    const defaultImage = 'https://thumbs.dreamstime.com/b/empty-plate-left-dinner-view-above-33349397.jpg';
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        fetch('/recipes.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((recipe) => {
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
    }, []);

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
            <div className='pt-2 pb-4 gap-2 flex justify-start items-center'>
                <img src="/dinner.jpg" alt="Family Dinner Planner" className="rounded size-12"/>
                <h1 className='text-4xl text-[#5f574e] font-[Mouse_Memoirs] pb-4'>Family Dinner Planner</h1>
            </div>
            <Search query={searchQuery} handleSearchRecipe={setSearchQuery} handleClearSearch={clearSearch} />
            <RecipeBook
                handleAddLabelToSearch={addLabelToSearch}
                recipes={applySearchQuery(recipes)}
            />
        </div>
    );
}

export default App;
