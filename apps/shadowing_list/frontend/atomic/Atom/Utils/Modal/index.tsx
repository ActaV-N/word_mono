import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';

interface Props{
    children: React.ReactNode,
    isOpen?: boolean,
    onClose: Function
}

const Modal: React.FC<Props> = ({children, isOpen = false, onClose}) => {
    const containerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [isClosed, setIsClosed] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
     
    useEffect(() => {
        if(isOpen) setIsClosed(false);
        
        setIsModalOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        let ctx: gsap.Context;    
        if(containerRef.current){
            if(isModalOpen){
                ctx = gsap.context(() => {
                    setIsAnimating(true);
                    const tl = gsap.timeline({
                        onComplete: () => {
                            setIsAnimating(false);
                        }
                    });
                    tl
                    .addLabel('start')
                    .to('.dim', {
                        opacity: 0.3,
                        duration:0.5,
                        ease:'power2.inOut'
                    }, 'start')
    
                    tl
                    .to('.content', {
                        autoAlpha: 1,
                        duration:0.5,
                        ease:'power2.inOut'
                    }, 'start')
                }, containerRef)
            } else{
                ctx = gsap.context(() => {
                    setIsAnimating(true);
    
                    const tl = gsap.timeline({
                        onComplete: () => {
                            setIsAnimating(false);
                            setIsClosed(true);
                        }
                    });
    
                    tl
                    .addLabel('start')
                    .to('.dim', {
                        opacity: 0,
                        duration:0.3,
                        ease:'power2.inOut'
                    }, 'start')
    
                    tl
                    .to('.content', {
                        autoAlpha: 0,
                        duration:0.3,
                        ease:'power2.inOut'
                    }, 'start')
                }, containerRef)
            }
        }

        // return () => ctx && ctx.revert()
    }, [isModalOpen])

    const handleClose = () => {
        setIsModalOpen(false);

        onClose && onClose();
    }

    if(isClosed && !isAnimating) return null;


    return ReactDom.createPortal(<div ref={containerRef} className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center'>
        <div onClick={handleClose} className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 dim cursor-pointer'></div>
        <div className='relative sm:w-9/12 w-10/12 max-w-3xl mx-auto'>
            <div className='bg-white rounded-sm max-h-[calc(100vh-12rem)] content opacity-0 invisible'>
                {children}
            </div>
        </div>
    </div>, document.body);
}

interface HeadProps{
    children: React.ReactNode
}

(Modal as typeof Modal & {Head:React.FC<HeadProps>})
.Head = ({children}) => {
    return <div className='px-3 py-2 text-lg font-semibold border-b border-[#ddd] border-solid'>
        {children}
    </div>
}

interface BodyProps{
    children: React.ReactNode
}

(Modal as typeof Modal & {Body:React.FC<BodyProps>})
.Body = ({children}) => {
    return <div className='p-5'>
        {children}
    </div>
}

export default (Modal as typeof Modal & {
    Head:React.FC<HeadProps>,
    Body:React.FC<BodyProps>
});