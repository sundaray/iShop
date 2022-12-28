import Link from "next/link";

const Navigation = ({ user, handleSignOut }) => {
  return (
    <>
      <nav className="w-full h-16 px-4 bg-gray-900 text-gray-400 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold">iShop</h1>
        </Link>
        <ul className="flex items-center space-x-6">
          <Link href="/cart">
            <li>Cart</li>
          </Link>
          {user ? (
            <Link href="users/sign-in">
              <li>Sign in</li>
            </Link>
          ) : (
            <li onClick={handleSignOut}>Sign out</li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
