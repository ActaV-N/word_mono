import React from "react";

interface Props{
    tails?:string,
    children: React.ReactNode
}

const PaperContainer:React.FC<Props> = ({tails, children}) => {
    return <div className={`rounded-md bg-[#fff] h-96 border border-solid border-[#ddd] ${tails}`}>
        <div className="h-full">
            {children}
        </div>
    </div>
}

export default PaperContainer;