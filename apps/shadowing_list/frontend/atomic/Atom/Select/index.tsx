import gsap from 'gsap';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

// Context
const SelectContext = createContext<Function>(() => {})

// Select change handler type for parent component
export type SelectChangeHandler = ({value, name}:{value:string|number, name:string}) => void;

// Actual option component(but named it as Item)
const Item: React.FC<ItemProps> = ({value='', label}) => {
    // Context for selecting option
    const handleSelect = useContext(SelectContext);

    const handleClick = () => {
        handleSelect({value, label});
    }

    return <div onClick={handleClick} className="p-2 cursor-pointer transition-button hover:bg-slate-300">
        {label}
    </div>
}

interface Props{
    label?:string,
    defaultLabel?: string,
    children: React.ReactNode,
    onChange: SelectChangeHandler,
    value?: string | number,
    name?: string
}

const Select: React.FC<Props> = ({
    defaultLabel="선택",
    label="",
    children,
    onChange,
    value='',
    name=""
}) => {
    // State for select and option
    const [selectInfo, setSelectInfo] = useState<{
        label:string,
        value?:string | number
    }>({
        label: label,
        value: value
    });

    // Dropdown open state for select
    const [isOpen, setIsOpen] = useState(false);

    // Container of select
    const containerRef = useRef<HTMLDivElement>(null);

    // Animations
    useEffect(() => {
        gsap.context(() => {
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

    // Select functio, invoked when option selected
    const handleSelect:({}:{value: string | number, label: string}) => void = ({value, label}) => {
        // Set selected option info
        setSelectInfo({
            value,
            label
        })

        // change state for parent component
        onChange && onChange({
            value,
            name
        });

        // Close select
        setIsOpen(false);
    }
    
    // Toggle select dropdown
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    /**
     *  Enroll mousedown event at document for closing dropdown
     *  when the part which is not in select is clicked 
     * */ 
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

// Define Select.Item Component
interface ItemProps{
    value?: string | number,
    label: string
}

(Select as typeof Select & {Item: React.FC<ItemProps>})
.Item = ({
    value,
    label
}) => <Item value={value} label={label} />

export default (Select as typeof Select & {Item: React.FC<ItemProps>});