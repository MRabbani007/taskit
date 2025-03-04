import { MdOutlineTaskAlt } from "react-icons/md";
// import Logo from "../../assets/todo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-wrap flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-6 bg-gradient-to-l from-cyan-950 to-gray-950 text-white">
      <Link to="/" title="Home Page" className="flex items-center gap-1">
        {/* <img src={Logo} alt="Logo" className="w-12" /> */}
        <MdOutlineTaskAlt size={25} />
        <span className="font-bold text-xl">Taskit</span>
      </Link>
      <p className="font-mono flex flex-wrap items-center whitespace-nowrap">
        <span className="text-xl">&#169;</span>
        <span>2024 Taskit Inc. </span>
        <span>All rights reserved.</span>
      </p>
    </div>
  );
}
