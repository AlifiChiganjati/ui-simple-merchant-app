import { useState, useEffect } from "react";
import { updateProduct } from "../service/product/product";

const ProductCreateForm = ({ productData }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    point: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (productData) {
      setProduct({
        name: productData.name,
        price: productData.price,
        description: productData.description,
        point: productData.point,
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    clearError(e.target.name);
  };

  const clearError = (fieldName) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProduct(
        token,
        product.name,
        product.price,
        product.description,
        product.point,
        productData.id,
      );

      console.log("Updated product:", response);

      // Handle success message or redirect
    } catch (error) {
      console.log("Error updating product:", error);
      // Handle error message
    }
  };

  return (
    <div className="h-full w-1/2 p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-600 p-6"
      >
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div>
          <label
            htmlFor="name"
            className="text-w mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Product
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`block w-full ${validationErrors.name ? "border-red-500" : "border-gray-200"} rounded-lg border border-none border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 active:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="text-w mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={`block w-full rounded-lg ${validationErrors.price ? "border-red-500" : "border-gray-200"} border border-none border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 active:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {validationErrors.price && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.price}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-w mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={`block w-full ${validationErrors.description ? "border-red-500" : "border-gray-200"} rounded-lg border border-none border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 active:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.description}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="point"
            className="text-w mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Point
          </label>
          <input
            type="text"
            name="point"
            value={product.point}
            onChange={handleChange}
            className={`block w-full ${validationErrors.point ? "border-red-500" : "border-gray-200"} rounded-lg border border-none border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 active:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
          />
          {validationErrors.point && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.point}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded border border-gray-200 bg-blue-500 px-4 py-1 font-semibold capitalize text-gray-200 transition duration-300 hover:bg-blue-600 hover:text-white"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
