import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full  border-b border-gray-300 shadow-sm bg-background px-4 py-3">
      <div className="w-full mx-auto flex lg:max-w-5xl items-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl">Fullsoft</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
