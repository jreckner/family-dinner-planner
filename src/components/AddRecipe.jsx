import { useState } from 'react';

import { FaPlus } from 'react-icons/fa';
import { IoIosRemoveCircle } from "react-icons/io";
import RecipeCard from "./RecipeCard.jsx";

/* eslint react/prop-types: 0 */
const AddRecipe = ({ isOpen, handleAddRecipe, handleCancelRecipe }) => {
    const defaultImage = 'https://thumbs.dreamstime.com/b/empty-plate-left-dinner-view-above-33349397.jpg';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [preparationTimeInMinutes, setPreparationTimeInMinutes] = useState('');
    const [labels, setLabels] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [preview, setPreview] = useState(null);

    if (!isOpen) return null;

    const handleInputChange = (event) => {
        setNewIngredient(event.target.value);
    };

    const addIngredient = () => {
        if (newIngredient.trim() !== '') {
            setIngredients([...ingredients, newIngredient.trim()]);
            setNewIngredient('');
        }
    };

    const removeIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        resetForm();
        handleCancelRecipe();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            description: description || '',
            image: image || defaultImage,
            preparationTimeInMinutes: parseInt(preparationTimeInMinutes, 10),
            labels: labels.split(/[, ]+/).map(label => label.trim()),
            ingredientLines: ingredients,
            instructions: []
        };
        handleAddRecipe(newRecipe);
        resetForm();
    };

    const handlePreview = (e) => {
        if (preview) {
            setPreview(null);
            return;
        }

        e.preventDefault();
        const newRecipe = {
            title,
            description: description || '',
            image: image || defaultImage,
            preparationTimeInMinutes: parseInt(preparationTimeInMinutes, 10),
            labels: labels.split(/[, ]+/).map(label => label.trim()),
            ingredientLines: ingredients,
            instructions: []
        };
        setPreview(newRecipe);
    }

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage('');
        setPreparationTimeInMinutes('');
        setLabels('');
        setIngredients([]);
        setPreview(null);
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className='flex p-2'>
                    <div className="bg-white rounded-lg shadow-lg p-8 w-155">
                        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Title:</label>
                                <input type='text' value={title}
                                       onChange={(e) => setTitle(e.target.value)} required
                                       placeholder="Grandma's Spaghetti"
                                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Description:</label>
                                <input type='text' value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                       placeholder='A classic Italian pasta dish'
                                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Image URL:</label>
                                <input type='text' value={image}
                                       onChange={(e) => setImage(e.target.value)}
                                       placeholder={defaultImage}
                                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Preparation Time
                                    (minutes):</label>
                                <input type='number' value={preparationTimeInMinutes}
                                       onChange={(e) => setPreparationTimeInMinutes(e.target.value)} required
                                       placeholder={30}
                                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Ingredients:</label>
                                <div className='flex gap-1'>
                                    <input
                                        type="text"
                                        value={newIngredient}
                                        onChange={handleInputChange}
                                        placeholder="1 cup of sugar"
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                                    <button onClick={addIngredient}
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                        <FaPlus/>
                                    </button>
                                </div>
                                {ingredients.length > 0 && (
                                    <ul className="bg-[#fffef5] rounded-lg p-2 marker:text-[#854632] list-disc flex flex-col gap-y-1 px-6">
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index} className='flex justify-between'>
                                                <li className="pl-4">{ingredient}</li>
                                                <IoIosRemoveCircle size='1.3em'
                                                                   onClick={() => removeIngredient(index)}/>
                                            </div>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Labels (comma
                                    separated):</label>
                                <input type='text' value={labels}
                                       onChange={(e) => setLabels(e.target.value)}
                                       placeholder='beef, pasta, quick'
                                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                            </div>
                            <div className='mb-4 flex justify-between'>
                                <div className='flex gap-2'>
                                    <button onClick={handleCancel}
                                            className='bg-neutral-500/75 hover:bg-neutral-700/75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Cancel
                                    </button>
                                    <button type='submit'
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add
                                        Recipe
                                    </button>
                                </div>
                                <button onClick={handlePreview}
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Preview
                                    Recipe
                                </button>
                            </div>
                        </form>
                    </div>
                    {preview && (
                        <div className='w-125'>
                            <RecipeCard recipe={preview} onClick={() => setPreview(null)}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;