import React from "react";
import { GiSharpSmile } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

enum ButtonTypeEnum{
    float,
    flat
}

interface Props{
    Icon?: React.ReactNode | IconType,
    buttonType?: keyof typeof ButtonTypeEnum,
    tails?: string,
    onClick?: React.MouseEventHandler
}

const Template:React.FC<Props> = ({Icon=<GiSharpSmile/>, tails, onClick, ...props}) => {
    return <>
        <button onClick={onClick} {...props} className={twMerge(`w-9 h-9 flex items-center justify-center rounded-full text-md text-black p-1 bottom-5 right-3 cursor-pointer transition-button duration-200`, tails)}>
            {Icon as React.ReactNode}
        </button>
    </>
}

const IconButton: React.FC<Props> = ({Icon, buttonType = "flat", tails, onClick, ...props}) => {
    const newTails = buttonType === 'float' ? 
    twMerge(`fixed bg-black opacity-70 text-sm shadow-md text-white 
    hover:shadow-none hover:opacity-100`, tails) 
    : twMerge(`hover:text-red-600 hover:bg-slate-400`, tails);

    return <Template onClick={onClick} Icon={Icon} tails={newTails} {...props} />
}

export default IconButton