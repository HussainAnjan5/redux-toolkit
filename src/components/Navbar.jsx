import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to calculate the total amount
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      {/* Navbar */}
      <div className='bg-violet-400 fixed z-10 w-full flex justify-between p-3 text-white text-2xl font-bold'>
        <h1>Shopping Cart</h1>
        <div className='flex justify-around w-1/3'>
          <Link to={"/"}>Home</Link>
          <Link to={"/cart"}>Cart</Link>
          <span
            className='flex justify-center items-center cursor-pointer'
            onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
          >
            <FaShoppingCart className="mr-2" />
            {items.length}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-5 z-20 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className='text-right text-2xl font-bold mb-4 text-gray-600'
          onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
        >
          &times;
        </button>

        {/* Cart Items */}
        <h2 className='text-3xl font-bold mb-5'>Your Cart</h2>
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <div key={item.id} className='flex items-center justify-between mb-4'>
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-16 h-16 object-cover rounded-md'
                />
                {/* Product Title */}
                <div className='flex-1 px-3'>
                  <h3 className='text-xl font-semibold'>{item.title}</h3>
                  <p className='text-gray-500'>${item.price.toFixed(2)}</p>
                </div>
                {/* Product Quantity */}
                <div className='text-gray-700'>x{item.quantity}</div>
              </div>
            ))}

            {/* Total Amount */}
            <div className='text-xl font-bold mt-4'>
              Total Amount: ${calculateTotalAmount().toFixed(2)}
            </div>

            {/* Checkout Button */}
            <button className='w-full mt-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition'>
              Checkout
            </button>
          </>
        ) : (
          <p className='text-gray-500 text-center'>Your cart is empty.</p>
        )}
      </div>

      {/* Overlay (Click to close sidebar) */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-10'
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        />
      )}
    </div>
  );
};

export default Navbar;
