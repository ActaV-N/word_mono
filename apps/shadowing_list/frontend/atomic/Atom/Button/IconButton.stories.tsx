import IconButton from "./IconButton";
import {ComponentMeta} from '@storybook/react';

export default {
    title:"Inputs/Icon Button",
    component: IconButton,
    argTypes:{
        buttonType:{
            options: ['flat', 'float'],
            control: {type:'select'}
        },
        onClick: {action: "clicked"}
    }
} as ComponentMeta<typeof IconButton>

const Template = (args: any) => <IconButton onClick={args.onClick} buttonType={args.buttonType} />

export const Flat = Template.bind({});
(Flat as typeof Flat & {args:any}).args = {
    buttonType:'flat',
}