import { useState, Text } from 'react';

const MealPlan = () => {
    // const [mealPlan, setMealPlan] = useState([]);

    return (
        <div className="flex py-2 gap-2">
            <article
                className="flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-40">
                <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>Meal #1</h1>
            </article>
            <article
                className="flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-40">
                <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>Meal #2</h1>
            </article>
            <article
                className="flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-40">
                <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>Meal #3</h1>
            </article>
            <article
                className="flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-40">
                <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>Meal #4</h1>
            </article>
            <article
                className="flex bg-[lightgrey] inset-shadow-sm inset-shadow-zinc-400 rounded-lg text-[#5f574e] justify-center items-center w-100 h-40">
                <h1 className='text-3xl font-[Mouse_Memoirs] text-[grey]'>Meal #5</h1>
            </article>
        </div>
    );
}

export default MealPlan;