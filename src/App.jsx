import { Image, useState } from "react";
import RecipeBook from "./components/RecipeBook.jsx";
import Search from "./components/Search.jsx";

const App = () => {
    const defaultImage = 'https://thumbs.dreamstime.com/b/empty-plate-left-dinner-view-above-33349397.jpg';
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([{
        title: 'Chicken Noodle Soup',
        image: 'https://hips.hearstapps.com/hmg-prod/images/chicken-noodle-soup-lead-644c2bec7f4e6.jpg?resize=600:*',
        labels: ['chicken', 'instant-pot'],
        description: '',
        preparationTimeInMinutes: 60,
        ingredientLines: [
            '1 tablespoon olive oil',
            '1 cup chopped onion',
            '1 cup chopped celery',
            '1 cup chopped carrots',
            '2 cloves garlic, minced',
            '6 cups chicken broth',
            '1 cup water',
            '2 cups chopped cooked chicken',
            '1 1/2 cups wide egg noodles',
            '1 teaspoon salt',
            '1/4 teaspoon black pepper',
            '1/4 cup chopped fresh parsley'
        ],
        instructions: []
    }, {
        title: 'Spaghetti w/ Meat Sauce',
        image: 'https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg?resize=900%2C1260&zoom=0.40',
        labels: ['pasta', 'beef', 'pork', 'quick'],
        description: '',
        preparationTimeInMinutes: 20,
        ingredientLines: [
            '1 lbs ground beef',
            '1 jar spaghetti sauce',
            '1 package spaghetti noodles',
        ],
        instructions: []
    }, {
        title: 'Beef Tacos',
        image: 'https://familiakitchen.com/wp-content/uploads/2021/01/iStock-960337396-3beef-barbacoa-tacos-e1695391119564-500x500.jpg',
        labels: ['beef', 'quick'],
        description: '',
        preparationTimeInMinutes: 10,
        ingredientLines: [
            '1 lbs ground beef',
            '1 onion',
            '1 avocado',
            '1 package taco seasoning',
            '2 cups shredded cheese',
        ],
        instructions: []
    }, {
        title: 'Carne Asada Tacos',
        image: 'https://www.chewoutloud.com/wp-content/uploads/2019/07/carne-asada-tacos-1-683x1024.jpg',
        labels: ['beef'],
        description: '',
        preparationTimeInMinutes: 10,
        ingredientLines: [
            '2 lbs thin steak',
            '1 onion',
            '1 avocado',
            '1 tbsp carne asada seasoning',
            '2 cups shredded cheese',
        ],
        instructions: []
    }, {
        title: 'Tuna Casserole',
        image: 'https://www.simplejoy.com/wp-content/uploads/2019/09/tuna_noodle_casserole-683x1024.webp',
        labels: ['pasta', 'fish', 'quick'],
        description: 'Yummy casserole with tuna and noodles',
        preparationTimeInMinutes: 30,
        ingredientLines: [
            '2 cans tuna',
            '1 bag egg noddles',
            '1 can cream of mushroom soup'
        ],
        instructions: []
    }, {
        title: 'Chicken Alfredo',
        image: defaultImage,
        labels: ['pasta', 'chicken', 'quick'],
        description: '',
        preparationTimeInMinutes: 20,
        ingredientLines: [
            '1 lbs chicken breast',
            '1 cup heavy cream',
            '1 cup parmesan cheese',
            '3 tbsp butter',
            '3 tbsp flour',
            '1 package fettuccine noodles',
        ],
        instructions: []
    }]);

    const addLabelToSearch = (label) => {
        const newSearchQuery = searchQuery.trim().length > 0 ? `${searchQuery} ${label}` : label;
        setSearchQuery(newSearchQuery);
    }

    const clearSearch = () => {
        setSearchQuery('');
    }

    const applySearch = (recipes) => {
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
                recipes={applySearch(recipes)}
            />
        </div>
    );
}

export default App;
