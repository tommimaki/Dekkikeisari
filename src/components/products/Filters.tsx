import * as React from 'react';

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
        <div>

            <div className="flex justify-center space-x-8">
                <div className='mb-2'>
                    <label htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 ">
                        Tuoteryhmä
                    </label>
                    <select
                        id="category"
                        onChange={handleCategoryChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Kaikki</option>
                        <option value="decks">Dekit</option>
                        <option value="shoes">Kengät</option>
                        <option value="shirts">Paidat</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="size"
                        className="block mb-2 text-sm font-medium text-gray-900 ">
                        Koko:
                    </label>
                    <select
                        id="size"
                        onChange={(event) => handleFilterChange('size', event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Kaikki</option>
                        {availableSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className="mb-4" />
        </div>
    );

};

export default Filters;
