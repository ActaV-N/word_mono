import gsap from 'gsap';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

const SelectContext = createContext<Function>(() => {})

export type SelectChangeHandler = ({value, name}:{value:string|number, name:string}) => void;

interface Props{
    label?:string
    children: React.ReactNode
    onChange: SelectChangeHandler,
    value?: string | number,
    name?: string
}

const Select: React.FC<Props> = ({
    label="선택",
    children,
    onChange,
    value='',
    name=""
}) => {
    const [defaultLabel, _] = useState(label);
    const [selectInfo, setSelectInfo] = useState<{
        label:string,
        value?:string | number
    }>({
        label: label,
        value: value
    });

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let ctx = gsap.context(() => {
            if(isOpen){
                const tl = gsap.timeline();

                tl
                .addLabel('start')
                .to('.dropdown', {
                    height:'auto',
                    duration:0.3,
                    ease:'power1.out'
                }, 'start')

                tl.to('.icon', {
                    rotate:'180deg',
                    duration:0.3,
                    ease:'power1.out'
                }, 'start')
            } else{
                const tl = gsap.timeline();

                tl
                .addLabel('start')
                .to('.dropdown', {
                    height:'0',
                    duration:0.3,
                    ease:'power1.in'
                }, 'start')

                tl.to('.icon', {
                    rotate:'0',
                    duration:0.3,
                    ease:'power1.out'
                }, 'start')
            }
        }, containerRef)
    }, [isOpen])

    const handleSelect:({}:{value: string | number, label: string}) => void = ({value, label}) => {
        setSelectInfo({
            value,
            label
        })

        onChange && onChange({
            value,
            name
        });

        setIsOpen(false);
    }
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleOutsideClick:(this: Document, ev: MouseEvent) => any = (event: MouseEvent) => {
            const container = containerRef.current as HTMLDivElement;
            const el = event.target as Node
            console.log(el, container)
            if(container && !container.contains(el)){
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [containerRef])

    return <SelectContext.Provider value={handleSelect}>
        <div ref={containerRef} className='bg-[#fff] rounded-md border border-[#ddd] border-solid relative'>
            <div onClick={toggleOpen} className='p-2 flex items-center justify-between cursor-pointer'>
                <div>{selectInfo.label}</div>
                <div className='icon origin-center'>
                    <MdExpandMore/>
                </div>
                <input name={name} value={selectInfo.value} type="hidden" />
            </div>
            <div className='dropdown w-full max-h-40 h-0 overflow-auto absolute rounded-b-md bg-[#fff] top-[100%] translate-y-[3px] shadow-lg'>
                <div>
                    <Item label={defaultLabel} />
                    {children}
                </div>
            </div>
        </div>
    </SelectContext.Provider>
}

interface ItemProps{
    value?: string | number,
    label: string
}

const Item: React.FC<ItemProps> = ({value='', label}) => {
    const handleSelect = useContext(SelectContext);

    const handleClick = () => {
        handleSelect({value, label});
    }

    return <div
    onClick={handleClick}
    className="p-2 cursor-pointer transition-button hover:bg-slate-300"
    >
        {label}
    </div>
}

(Select as typeof Select & {Item: React.FC<ItemProps>})
.Item = ({
    value,
    label
}) => <Item value={value} label={label} />

export default (Select as typeof Select & {Item: React.FC<ItemProps>});