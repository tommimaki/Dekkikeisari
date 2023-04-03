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
    };

    return (
        <div>
            <h3>Filters:</h3>
            <div>
                <label htmlFor="category">Category:</label>
                <select id="category" onChange={handleCategoryChange}>
                    <option value="">All</option>
                    <option value="decks">Decks</option>
                    <option value="shoes">Shoes</option>
                    <option value="shirts">Shirts</option>
                </select>
            </div>
            <div>
                <label htmlFor="size">Size:</label>
                <select id="size" onChange={(event) => handleFilterChange('size', event.target.value)}>
                    <option value="">All</option>
                    {availableSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
