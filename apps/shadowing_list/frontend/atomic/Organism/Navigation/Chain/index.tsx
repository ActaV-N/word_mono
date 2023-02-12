import gsap from 'gsap';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { useRecoilState } from 'recoil';
import { pageTransitionState } from '../../../../recoil/animation';
import IconButton from '../../../Atom/Button/IconButton';

export interface Props{
    children: React.ReactNode,
    leftTo?:string,
    rightTo?:string,
    LeftIcon?: React.ReactNode | IconType,
    RightIcon?: React.ReactNode | IconType,
}

const Chain: React.FC<Props> = ({children, leftTo, rightTo, LeftIcon = <AiOutlineArrowLeft/>, RightIcon = <AiOutlineArrowRight/>}) => {
    // Animation variable
    const [_, setTransitionState] = useRecoilState(pageTransitionState);

    const router = useRouter();
    const chainContainer = useRef(null);
    
    useEffect(() => {
        if(leftTo) router.prefetch(leftTo);
        if(rightTo) router.prefetch(rightTo);
    })

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {    
                /**
                 * Button intro animation
                 */
                const tl = gsap.timeline();
                tl
                .addLabel('start')
                .to('.btn', {
                    x: 0,
                    duration:0.5,
                    ease:'power1.inOut'
                }, 'start')
                .addLabel('buttonDisappear', '>')
                
                tl.to('.main-wrapper', {
                    autoAlpha:1,
                    duration:0.5,
                    ease:'power1.inOut'
                }, 'buttonDisappear-=.1')
        }, chainContainer)

        return () => ctx.revert();
    }, [])

    const handleChainChange:React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent) => {
        setTransitionState({
            isLoading: true,
            isFinished: false
        });

        gsap.context(() => {
            // dir 1 => to the left
            // dir -1 => to the right
            const dir:number = parseInt((event.currentTarget as HTMLButtonElement).dataset.dir as string);
            const pushTo = (dir === 1 ? leftTo : rightTo) || '/';

            const tl = gsap.timeline({
                onComplete:() => {
                    router.push(pushTo)
                    setTransitionState({
                        isLoading: false,
                        isFinished: true
                    });
                }
            });

            /**
             * Button animation
             */
            tl
            .addLabel('click')
            .to('.btn', {
                x: function(_, t){
                    const targetDir = parseInt(t.dataset.dir);
                    return `${-1 * targetDir * 200}%`;
                },
                duration:0.4,
                ease:'power1.inOut'
            }, 'click')
            .addLabel('buttonDisappear', '>')

            /**
             * Main chain animation
             */
            tl.to('.main', {
                scale:0.9,
                duration:0.4,
                ease:'power2.inOut'
            }, 'buttonDisappear-=.3')
            .addLabel('changeChain', '>')
            .to('.main', {
                x:`${dir * 100}%`,
                duration:0.8,
                ease:'power2.inOut'
            }, 'changeChain');

            /**
             * Next chain animation
             */
            tl
            .set('.next-chain', {
                x:`${-1 * dir * 100}%`,
                scale:0.9,
            }, 'click')
            .to('.next-chain', {
                x:'0%',
                duration:0.8,
                ease:'power2.inOut'
            }, 'changeChain')
            .to('.next-chain', {
                scale:1,
                duration:0.4,
                ease:'power2.inOut'
            }, '>')
        }, chainContainer)
    }

    return <div className='w-screen min-h-screen'>
        <div className='w-full h-full min-h-screen flex overflow-x-hidden'>
            <div className='flex h-full min-h-screen relative' ref={chainContainer}>
                <div className='next-chain border-[#ddd] border border-solid fixed w-full h-full min-h-screen top-0 left-0 translate-x-[-100%] bg-white'></div>
                {leftTo && 
                    <IconButton
                        Icon={LeftIcon}
                        data-dir="1"
                        buttonType="float"
                        onClick={handleChainChange}
                        tails="btn btn-left md:top-1/2 bottom-5 left-3 translate-x-[-200%] z-10 translate-y-[-50%]"
                    />}
                    <div className='bg-white border-[#ddd] border border-solid w-screen grow-0 shrink-1 basis-auto main'>
                        <div className='main-wrapper h-full opacity-0 invisible'>
                            {children}
                        </div>
                    </div>
                {rightTo &&
                    <IconButton
                        Icon={RightIcon}
                        data-dir="-1"
                        buttonType="float"
                        onClick={handleChainChange}
                        tails="btn btn-right md:top-1/2 bottom-5 right-3 translate-x-[200%] z-10 translate-y-[-50%]"
                    />
                }
            </div>
        </div>
        <div>
        </div>
    </div>;
}

export default Chain;