import Select from ".";
import {ComponentMeta} from '@storybook/react';

export default {
    title:"Inputs/Select",
    component: Select,
    argTypes:{
        onChange:{
            actions:"clicked"
        }
    }
} as ComponentMeta<typeof Select> 

const Template = (args:any) => <Select
    onChange={args.onChange}
    label="Storybook"
    >
    <Select.Item value={1} label={"Hello"} />
    <Select.Item value={2} label={"Hello2"} />
    <Select.Item value={3} label={"Hello3"} />
</Select>

export const Primary = Template.bind({});