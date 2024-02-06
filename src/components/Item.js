import React, { useState } from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // State to track isInCart locally
  const [isInCart, setIsInCart] = useState(item.isInCart);

  // Function to handle button click
  function handleAddToCartClick() {
    // Add fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        setIsInCart(updatedItem.isInCart);
        onUpdateItem(updatedItem);
      });
  }

  // Function to handle delete button click
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/* Add the onClick listener */}
      <button
        className={isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
