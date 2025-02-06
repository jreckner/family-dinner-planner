import {FaDownload, FaPlus, FaShoppingCart} from "react-icons/fa";
import RoleRequired from "../RoleRequired.js";
import {exportToJson } from "../../lib/helpers.js";
import GoogleLoginProfile from "./GoogleLoginProfile.jsx";
import {useRecipesContext} from "../../providers/RecipesProvider.jsx";

/* eslint react/prop-types: 0 */
const Header = ({handleShowAddRecipeModal, handleShowMealPlanSlider}) => {
    const { recipes } = useRecipesContext();

    return (
        <div className='flex justify-between items-center'>
            <div className='pt-2 pb-4 gap-2 flex justify-start items-center'>
                <img src="/dinner.jpg" alt="Family Dinner Planner" className="rounded size-12"/>
                <h1 className='text-4xl text-[#5f574e] font-primary pb-4'>Family Dinner Planner</h1>
            </div>
            <div className="flex items-center gap-1">
                <GoogleLoginProfile />
                <RoleRequired requiredRoles={["admin"]}>
                    <button
                        className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => exportToJson(recipes)}>
                        <FaDownload/>
                    </button>
                    <button
                        className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={handleShowAddRecipeModal}>
                        <FaPlus/>
                    </button>
                </RoleRequired>
                <button
                    className="h-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleShowMealPlanSlider}>
                    <FaShoppingCart/>
                </button>
            </div>
        </div>
    )
}

export default Header;