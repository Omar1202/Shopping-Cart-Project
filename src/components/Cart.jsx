import { useContext } from 'react';
import { CartContext } from '../store/Cart-context';

export default function Cart() {
  const CartCtx = useContext(CartContext);
  
  const totalPrice = CartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {CartCtx.items.length === 0 && <p>No items in cart!</p>}
      {CartCtx.items.length > 0 && (
        <ul id="cart-items">
          {CartCtx.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => CartCtx.updateItemCart(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => CartCtx.updateItemCart(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
