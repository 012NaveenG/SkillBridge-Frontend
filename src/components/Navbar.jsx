import { Link } from "react-router-dom"
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {



  return (
    <div className="flex items-center justify-between px-5 p-2 bg-white">
      <div>
        <img src="/SkillBridge-logo.png" alt="" className="sm:h-12 h-8" />
      </div>
      {
        sessionStorage.getItem('candidateName') ? '' : (
          <div className="flex items-center justify-center gap-5 text-TK_Text">
            {/* <Link to={'/about'}>
              <p className="text-lg font-bold">About</p>
            </Link>

            <Link to={'/help'}>
              <p className="text-lg font-bold">Help</p>
            </Link> */}

            <Link to={'/login'}>
              <button className="bg-dodgerBlue hover:bg-blue-400 transition-all duration-150 ease-in-out text-white px-10 py-2 rounded-md text-lg">Login</button>
            </Link>
          </div>
        )
      }


    </div>
  )
}

export default Navbar
