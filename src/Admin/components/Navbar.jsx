import { Link } from "react-router-dom"
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 px-5 bg-white">
      <div>
        <img src="/SkillBridge-logo.png" alt="" className="sm:h-12 h-8" />
      </div>
    </div>
  )
}

export default Navbar
