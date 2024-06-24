import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../service/product/product";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formEdit, setFormEdit] = useState({
    name: "",
    price: "",
    description: "",
    point: "",
  });
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  console.log("Token:", token);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!token) return;
    const productList = async () => {
      try {
        const products = await getAllProduct(token);
        setProducts(products);
      } catch (error) {
        console.log("Error products:", error);
        setProducts([]);
      }
    };
    productList();
  }, [token]);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormEdit({
      name: product.name,
      price: product.price,
      description: product.description,
      point: product.point,
    });
    setModal(true);
  };

  const closeEditModal = () => {
    setModal(false);
    setEditingProduct(null);
    setFormEdit({
      name: "",
      price: "",
      description: "",
      point: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateProduct(
        token,
        formEdit.name,
        formEdit.price,
        formEdit.description,
        formEdit.point,
        editingProduct.id,
      );

      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...formEdit }
          : product,
      );
      setProducts(updatedProducts);
      closeEditModal();
      console.log("ini response update:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await deleteProduct(token, productId);
      const remainingProducts = products.filter(
        (product) => product.id !== productId,
      );
      setProducts(remainingProducts);
      console.log("response:", response);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <section className="flex h-screen w-full flex-col items-center bg-gray-200">
        <h2 className="text-4xl font-bold">Product Page</h2>
        {products.map((product) => (
          <ul key={product.id}>
            <li className="mt-2 w-72 rounded bg-gray-400 p-4 capitalize">
              <p>Nama Product: {product.name}</p>
              <p>Price: {product.price}</p>
              <p>Deskripsi: {product.description}</p>
              <p>Poin: {product.point}</p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(product)}
                  className="rounded border border-gray-200 bg-blue-500 px-4 py-1 font-semibold capitalize text-gray-200 transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="rounded border border-gray-200 bg-red-400 px-4 py-1 font-semibold capitalize text-gray-200 transition duration-300 hover:bg-red-600 hover:text-white"
                >
                  delete
                </button>
              </div>
            </li>
          </ul>
        ))}
      </section>

      {modal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-1/2 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Product
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formEdit.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formEdit.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deskripsi
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formEdit.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="point"
                  className="block text-sm font-medium text-gray-700"
                >
                  Point
                </label>
                <input
                  type="text"
                  id="point"
                  name="point"
                  value={formEdit.point}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
