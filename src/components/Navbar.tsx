import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useClickOutside from "../hooks/useClickOutside";
import Logo from "../assets/logo_white.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showMenu, setShownMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(menuRef, () => setShownMenu(false));

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="flex justify-center bg-slate-700 text-slate-100 px-2 py-3 lg:mx-32">
      <div className="flex gap-4 items-center font-bold">
        <Link to="/">
          <img src={Logo} alt="AnimeList" className="h-10" />
        </Link>
      </div>
      <Link to="/search" className="grid place-items-center p-4 ml-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z" /></svg>
      </Link>
      {user && (
        <div ref={menuRef} className="relative flex justify-center items-center gap-2 cursor-pointer" onClick={() => setShownMenu(prev => !prev)}>
          <span className="text-sm select-none hidden lg:inline">{user.username}</span>
          <img src={user.images.webp.image_url} alt={user.username} className="w-8" />
          <div className={`absolute bg-slate-200 text-black right-0 top-10 z-10 text-sm${showMenu ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"} duration-200`}>
            <Link to="/profile" className="block px-4 py-2 hover:bg-slate-500 hover:text-slate-100">Profile</Link>
            <div className="cursor-pointer px-4 py-2 hover:bg-slate-500 hover:text-slate-100" onClick={handleLogout}>Logout</div>
          </div>
        </div>
      )}
    </nav>
  );
}
