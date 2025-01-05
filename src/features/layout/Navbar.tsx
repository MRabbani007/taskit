import { Link } from "react-router-dom";
// Imported Context
// Imported Components
import MenuMobile from "../navigation/MenuMobile";
// Imported Media
import Logo from "../../assets/todo.svg";
import UserMenu from "../navigation/UserMenu";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4 py-2 px-4 bg-zinc-200">
      <Link to="/" title="Home Page" className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-10" />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
      <MenuMobile />
      <UserMenu />
    </nav>
  );
}
