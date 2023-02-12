import Home from '../../pages/index';
import {ComponentMeta} from '@storybook/react';
import { RecoilRoot } from 'recoil';

export default {
    title:'Pages/Home',
    component: Home,
    decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>]
} as ComponentMeta<typeof Home>;

export const HomePage = () => <Home/>;