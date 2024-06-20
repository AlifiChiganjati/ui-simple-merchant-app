const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800">
      <h1 className="p-4 text-2xl font-bold italic text-white">Merchant APP</h1>
      <ul className="flex items-center gap-4 p-4 text-xl font-semibold capitalize">
        <li className="text-gray-200 transition duration-300 hover:text-white">
          <a href="/">home</a>
        </li>
        <li className="text-gray-200 transition duration-300 hover:text-white">
          <a href="/merchant">merchant</a>
        </li>
        <li className="text-gray-200 transition duration-300 hover:text-white">
          <a href="/product">product</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
