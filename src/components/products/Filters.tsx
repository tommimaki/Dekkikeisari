import * as React from 'react';
import { FaSearch } from 'react-icons/fa'


type FiltersProps = {
    handleFilterChange: (id: string, value: string) => void;
};


const Filters = ({ handleFilterChange }: FiltersProps) => {
    const [availableSizes, setAvailableSizes] = React.useState<string[]>([]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        handleFilterChange('category', value);

        switch (value) {
            case 'decks':
                setAvailableSizes(['7.5', '7.75', '8.0', '8.25', '8.5']);
                break;
            case 'shirts':
                setAvailableSizes(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
                break;
            case 'shoes':
                setAvailableSizes(['36', '37', '38', '39', '40', '41', '42', '43', '44']);
                break;
            default:
                setAvailableSizes([]);
        }
        handleFilterChange('size', '');
    };


    return (
        <div className="grid grid-rows-2 grid-cols-2 gap-4">
            <div className="row-span-1 col-span-1  flex justify-end">
                <div className="mb-2  w-1/2  self-end ">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                        Tuoteryhmä
                    </label>
                    <select
                        id="category"
                        onChange={handleCategoryChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Kaikki</option>
                        <option value="decks">Dekit</option>
                        <option value="shoes">Kengät</option>
                        <option value="shirts">Paidat</option>
                    </select>
                </div>
            </div>
            <div className="row-span-1 w-1/2 col-span-1 flex justify-start">
                <div className="mb-2 w-full">
                    <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900">
                        Koko:
                    </label>
                    <select
                        id="size"
                        onChange={(event) => handleFilterChange('size', event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Kaikki</option>
                        {availableSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row-span-1 col-span-2">
                <div className="w-1/2 mx-auto ">
                    <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900">
                        Haku:
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            type="text"
                            onChange={(event) => handleFilterChange('search', event.target.value)}
                            className="block w-full p-2.5 rounded-lg border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <FaSearch className="absolute right-2 top-3.5 text-white pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Filters;
