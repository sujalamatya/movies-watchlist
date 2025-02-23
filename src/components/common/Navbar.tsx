import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center border-b-2 border-gray-600">
      <div className="text-xl font-bold">MoveIT</div>

      {/* Nav Links */}
      <ul className="flex space-x-6">
        {["Home", "MyMovies", "Favorites"].map((item) => (
          <li key={item}>
            <Link
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative hover:underline hover:underline-offset-4"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
