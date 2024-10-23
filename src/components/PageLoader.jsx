import React from 'react'

const PageLoader = () => {
    return (
        <div className="flex flex-row gap-2  absolute top-1/2 left-1/2 items-center justify-center " >
            <div className="w-4 h-4 rounded-full bg-dodgerBlue animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-dodgerBlue animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-dodgerBlue animate-bounce [animation-delay:.7s]"></div>
        </div>
    )
}

export default PageLoader
