import { FaRegCopyright } from "react-icons/fa";
const Footer = () => {
    return (
        <div className="bg-Tk_Footer w-full flex items-center justify-center p-10">
            <div>
                <img src="/SkillBridgeLogo.png" alt="" className="sm:h-12 h-8 mx-auto" />
                <div className="flex items-center justify-center gap-2 text-TK_Text border-TK_Gray border-t-2 my-2">
                    <FaRegCopyright className="text-lg"/>
                    <p>| 2024 SkillBridge Network Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
