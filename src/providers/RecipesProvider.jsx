import { createContext, useContext } from "react";

import useRecipes from "../hooks/UseLocalStorage.js";

const RecipeContext = createContext();

/* eslint react/prop-types: 0 */
export const RecipesProvider = ({ children }) => {
    const [ recipes, setRecipes ] = useRecipes();

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipesContext = () => useContext(RecipeContext);