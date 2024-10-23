import { Link } from "react-router-dom"

const HeroCard = () => {
    return (
        <div className="bg-dodgerBlue p-10 rounded-md relative overflow-hidden">
            <h1 className="text-4xl w-[89%] text-white">Unlocking Potential, Empowering Careers – Join SkillBridge Pvt. Ltd. and Shape the Future with Us.</h1>
            <p className="text-sm text-white w-[70%] my-2 opacity-70">At SkillBridge Network Pvt. Ltd., we believe in fostering a culture of innovation and excellence. Our comprehensive hiring process ensures we bring on board the brightest minds, ready to tackle challenges and drive our vision forward. Take the first step towards an exciting career with us by participating in our unique assessment exams. Your journey to success starts here</p>
          
            <div className="bg-white rounded-full h-52 w-52 absolute top-[-40%] left-[90%] opacity-45"></div>
            <div className="bg-white rounded-full h-20 w-20 absolute top-[30%] left-[85%] opacity-55"></div>
            <div className="bg-TK_Gray rounded-full h-8 w-8 absolute top-[70%] left-[80%] opacity-55"></div>
        </div>
    )
}

export default HeroCard
