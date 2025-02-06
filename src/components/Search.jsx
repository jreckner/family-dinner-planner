import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { RiDeleteBin2Line } from "react-icons/ri";

/* eslint react/prop-types: 0 */
const Search = ({onSearchChange}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearchQuery = (changedSearchQuery) => {
        setSearchQuery(changedSearchQuery);
        onSearchChange(changedSearchQuery);
    }

    const clearSearch = () => {
        setSearchQuery('');
        onSearchChange('');
    }

    return (
        <div className="pb-1">
            <div className="relative">
                <input type="text"
                    value={searchQuery}
                    onChange={(event) => updateSearchQuery(event.target.value)}
                    placeholder="Search..."
                    className="bg-white text-[#5f574e] w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size='1.3em' />
                <RiDeleteBin2Line className="fill-red-700 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size='1.3em' onClick={() => clearSearch()} />
            </div>
        </div>
    );
}

export default Search;