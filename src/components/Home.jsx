import axios from "axios";
import { useEffect, useState } from "react";
import { add } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  
  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setFilteredProducts(response.data);

      // Extract categories from the products and remove duplicates
      const allCategories = ["all", ...new Set(response.data.map(product => product.category))];
      setCategories(allCategories);
    };

    fetchData();
  }, []);

  // Filter products by category
  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered); // Show filtered products
    }
  };
const handleadd =(product)=>{
    dispatch(add(product))
}
  return (
    <div className="bg-gray-100 px-10 py-20">
      {/* Filter Buttons */}
      <div className="container mx-auto mb-6">
        <div className="flex justify-center space-x-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-lg shadow-md ${
                selectedCategory === category ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } transition-colors duration-300`}
            >
              {category === "all" ? "All Products" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-xl font-bold text-gray-800 mb-2 truncate">
                {item.title}
              </h1>
              <p className="text-gray-600 mb-4 h-16 overflow-hidden">
                {item.description}
              </p>
            <div className="flex justify-between">
            <p className="text-lg font-semibold text-green-500">
                ${item.price}
              </p>
              {/* Add to Cart Button */}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
               onClick={() =>(handleadd(item))}>
                Add to Cart
              </button>

            </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
