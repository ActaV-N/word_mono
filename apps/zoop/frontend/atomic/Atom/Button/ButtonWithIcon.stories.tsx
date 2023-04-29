import ButtonWithIcon from "./ButtonWithIcon";
import {ComponentMeta} from '@storybook/react';

export default {
    title:'Inputs/Button with icon',
    component: ButtonWithIcon,
    argTypes:{
        onClick:{
            actions:"clicked"
        },
        tails:{
            control:"text"
        },
        label:{
            control:"text"
        },
    }
} as ComponentMeta<typeof ButtonWithIcon>

const Template = (args:any) => (<ButtonWithIcon
  onClick={args.onClick}  
  label={args.label}
/>)

export const Primary = Template.bind({})