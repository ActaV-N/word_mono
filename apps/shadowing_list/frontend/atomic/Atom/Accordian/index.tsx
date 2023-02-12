import gsap from 'gsap';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import {MdExpandMore} from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

const AccordianContext = createContext(() => {});

interface Props{
    children: React.ReactNode
}

const Accordian:React.FC<Props> = ({children}) => {
    const accordianContainer = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    useEffect(() => {
        // Expand animations
        gsap.context(() => {
            if(isExpanded){
                const tl = gsap.timeline();

                // Content expand
                tl
                .addLabel('start')
                .to('.accordian-content', {
                    height:'auto',
                    duration:0.6,
                    ease:'power2.out'
                }, 'start')

                // Icon animation
                tl
                .to('.icon', {
                    rotate:'180deg',
                    duration:0.4,
                    ease:'power2.out'
                }, 'start')
            } else{
                const tl = gsap.timeline();

                // Content expand
                tl
                .addLabel('start')
                .to('.accordian-content', {
                    height:0,
                    duration:0.5,
                    ease:'power1.inOut'
                }, 'start')

                // Icon animation
                tl
                .to('.icon', {
                    rotate:'0',
                    duration:0.4,
                    ease:'power2.out'
                }, 'start')
            }
        }, [accordianContainer]);
    }, [isExpanded])

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return <AccordianContext.Provider value={handleExpand}>
        <div ref={accordianContainer} className="first:border-t border-b border-[#ddd] border-solid">
            {children}
            
        </div>
    </AccordianContext.Provider>
}

interface SummaryProps{
    children: React.ReactNode,
    Icon?: React.ReactNode | IconType
}

(Accordian as typeof Accordian & {Summary:React.FC<SummaryProps>})
.Summary = ({children, Icon=<MdExpandMore />}) => {
    const handleExpand = useContext(AccordianContext);

    return <div onClick={handleExpand} className='flex items-center justify-between cursor-pointer'>
        <div className='px-3 py-2'>
            {children}
        </div>
        <div className='p-5'>
            <div className='icon origin-center'>
                {Icon as React.ReactNode}
            </div>
        </div>    
    </div>
}

interface DetailProps{
    children: React.ReactNode,
    tails?: string
}

(Accordian as typeof Accordian & {Detail:React.FC<DetailProps>})
.Detail = ({children, tails}) => {
    return <div className={twMerge(`accordian-content px-3 h-0 bg-slate-200 overflow-hidden`, tails)}>
        <div className='py-3'>
            {children}
        </div>
    </div>
}

export default (Accordian as typeof Accordian & {
    Summary:React.FC<SummaryProps>,
    Detail:React.FC<DetailProps>
});