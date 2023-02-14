import React from 'react';
import {IconType} from 'react-icons'
import {RiGhostSmileLine} from 'react-icons/ri'
import { twMerge } from 'tailwind-merge';

enum ColorEnum{
    "basic"="hover:text-slate-800 hover:bg-slate-400",
    "orange"="bg-orange-600 hover:bg-orange-800 text-white hover:text-slate-200",
    "blue"="bg-blue-600 hover:bg-blue-800 text-white hover:text-slate-200",
    "green"="bg-green-600 hover:bg-green-800 text-white hover:text-slate-200",
    "red"="bg-red-600 hover:bg-red-800 text-white hover:text-slate-200"
}

interface Props{
    label: string,
    Icon?: React.ReactNode | IconType,
    tails?: string,
    onClick: React.MouseEventHandler,
    disabled?: boolean,
    color?: keyof typeof ColorEnum
}

const ButtonWithIcon:React.FC<Props> = ({label, Icon=<RiGhostSmileLine/>, tails, onClick, disabled, color="basic"}) => {
    return <>
        <button onClick={onClick} disabled={disabled}>
            <div className={twMerge(twMerge(`flex items-center cursor-pointer px-3 py-1 rounded-sm transition-button text-sm`, ColorEnum[color]), tails)}>
                <div className='pr-2'>
                    {Icon as React.ReactNode}
                </div>
                <div>
                    {label}
                </div>
            </div>
        </button>
    </>
}

export default ButtonWithIcon