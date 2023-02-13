import React from 'react';
import {IconType} from 'react-icons'
import {RiGhostSmileLine} from 'react-icons/ri'
import { twMerge } from 'tailwind-merge';

interface Props{
    label: string,
    Icon?: React.ReactNode | IconType,
    tails?: string,
    onClick: React.MouseEventHandler,
    disabled?: boolean
}

const ButtonWithIcon:React.FC<Props> = ({label, Icon=<RiGhostSmileLine/>, tails, onClick, disabled}) => {
    return <>
        <button onClick={onClick} disabled={disabled}>
            <div className={twMerge(`flex items-center cursor-pointer px-3 py-1 rounded-sm transition-button text-sm hover:text-slate-800 hover:bg-slate-400`, tails)}>
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