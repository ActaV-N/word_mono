import React from 'react';
import { twMerge } from 'tailwind-merge';

enum AlignEnum {
    "left",
    "center",
    "right"
}

export interface Props{
    label?:string,
    id?:string,
    onChange?: React.ChangeEventHandler,
    align?: keyof typeof AlignEnum,
    value?: string,
    tails?: string
}

const TextField:React.FC<Props> = ({ label, id, onChange, align='left', value, tails }) => {
    return <div className={`color-black relative`}>
        <input value={value} onSubmit={() => console.log('a')} onChange={onChange} id={id} placeholder={label} className={twMerge(`peer/input md:text-base text-sm w-full text-${align} border-solid border border-slate-400 rounded-md p-2 outline-none focus:border-slate-900 duration-200 ease-in-out`, tails)} type="text" />
    </div>
}

export default TextField;