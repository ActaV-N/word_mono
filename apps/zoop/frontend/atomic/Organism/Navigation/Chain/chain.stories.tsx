import {ComponentMeta} from '@storybook/react';
import Chain, { Props } from '.';
import {AiFillSmile} from 'react-icons/ai';
import { RecoilRoot } from 'recoil';

export default {
    title:'Navigation/Chain',
    component: Chain,
    parameters:{
        layout: 'fullscreen',
    },
    decorators:[(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>]
} as ComponentMeta<typeof Chain>

export const LeftChain = () => <Chain rightTo="/">
    Hello left chain
</Chain>

export const RightChain = () => <Chain leftTo="/">
    Hello right chain
</Chain>

export const MiddleChain = () => <Chain leftTo="/" rightTo="/">
    Hello middle chain
</Chain>

export const WithIcon = () => <Chain leftTo="/" LeftIcon={<AiFillSmile/>}>
    Hi with icon
</Chain>