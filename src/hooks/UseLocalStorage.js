import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { DEFAULT_RECIPE_IMAGE } from "../lib/constants.js";

const useRecipes = () => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('family-dinner-planner-data'));
    const [recipes, setRecipes] = useState(recipesFromLocalStorage || []);
    
    useEffect(() => {
        if (recipes.length === 0) {
            fetch('/recipes.json')
                .then(response => response.json())
                .then(data => {
                    data.forEach((recipe) => {
                        recipe.id = nanoid();
                        if (!recipe.image) {
                            recipe.image = DEFAULT_RECIPE_IMAGE;
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
    }, [recipes.length]);

    useEffect(() => {
        if (recipes.length > 0) {
            localStorage.setItem('family-dinner-planner-data', JSON.stringify(recipes));
        }
    }, [recipes]);

    return [recipes, setRecipes];
}

export default useRecipes;