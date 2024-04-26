import React from 'react'

export default function SearchProducts() {
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products
        ? products.filter((product) =>
              product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];
  return (
    <input
    type="text"
    value={searchQuery}
    onChange={handleSearchInputChange}
    placeholder="Search products..."
    className="border border-gray-300 rounded-md p-2 mb-4"
/>
  )
}
