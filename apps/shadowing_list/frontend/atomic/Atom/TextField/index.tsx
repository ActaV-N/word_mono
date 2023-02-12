import React from 'react';

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
        <input value={value} onSubmit={() => console.log('a')} onChange={onChange} id={id} placeholder={label} className={`peer/input md:text-base text-sm w-full text-${align} border-solid border border-slate-400 rounded-md p-2 outline-[0.5px] outline-inherit ${tails}`} type="text" />
    </div>
}

export default TextField;