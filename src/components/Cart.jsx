import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../Redux/CartSlice';

const Cart = () => {
  const Cartitems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Action to remove item from cart
  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  return (
    <div className='p-10 bg-gray-100 min-h-screen'>
      <h1 className='text-5xl font-bold py-10 text-center'>Your Cart</h1>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5'>
        {Cartitems.length > 0 ? (
          Cartitems.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-4 mb-4 border-b-2 last:border-none'
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className='w-20 h-20 object-cover rounded-md shadow-sm'
              />

              {/* Product Title */}
              <div className='flex-1 px-5'>
                <h2 className='text-xl font-semibold'>{item.title}</h2>
              </div>

              {/* Price */}
              <div className='text-lg font-bold text-violet-600'>
                ${item.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className='text-lg text-gray-700'>
                Quantity: {item.quantity}
              </div>

              {/* Remove Button */}
              <button
                className='ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
                onClick={() => handleRemove(item.id)} // Remove item by id
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 text-xl'>
            Your cart is currently empty.
          </p>
        )}
      </div>

      {/* Checkout Button */}
      {Cartitems.length > 0 && (
        <div className='max-w-4xl mx-auto text-right mt-6'>
          <button className='px-6 py-3 bg-violet-600 text-white rounded-md text-lg font-bold hover:bg-violet-500 transition'>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
