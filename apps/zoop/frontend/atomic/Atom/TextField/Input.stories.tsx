import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextField from '.';

export default {
    title:'Inputs/Text Field',
    component:TextField,
    argTypes:{
        onChange:{action:'changed'},
        label:{
            control:'text'
        }
    }
} as ComponentMeta<typeof TextField>

const Template = (args: any) => <TextField align={args.align} label={args.label} onChange={args.onChange} />
export const Primary = Template.bind({}) 

