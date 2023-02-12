import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { pageTransitionSelector } from '../recoil/animation';

const Header = () => {
    const headerRef = useRef(null);
    const {isLoading, isFinished} = useRecoilValue(pageTransitionSelector);
    
    // When page transition Starts
    useEffect(() => {
        gsap.context(() => {
            if(isLoading){
                // Timeline
                const tl = gsap.timeline();
                
                tl.to(headerRef.current, {
                    y:'-100%',
                    duration:0.4,
                    ease:'power2.in'
                })
            }
        }, headerRef)
    }, [isLoading])

    // When page transition Ends
    useEffect(() => {
        gsap.context(() => {
            if(isFinished){
                // Timeline
                const tl = gsap.timeline();

                tl.to(headerRef.current, {
                    y:'0',
                    duration:0.6,
                    ease:'power2.inOut'
                })
            }
        }, headerRef)
    }, [isFinished])
    
    return <div ref={headerRef} className='w-screen h-14 translate-y-[-100%] fixed z-30 top-0 left-0 shadow bg-white/90 backdrop-blur-sm'>
        <div>

        </div>
    </div>
}

export default Header;