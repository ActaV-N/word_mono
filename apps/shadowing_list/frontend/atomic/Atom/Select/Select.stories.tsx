import Select from ".";
import {ComponentMeta} from '@storybook/react';

export default {
    title:"Inputs/Select",
    component: Select
} as ComponentMeta<typeof Select> 

const Template = (args:any) => <Select
    onChange={args.onChange}
    label="Storybook"
    >
    <Select.Item value={1}>
        Hello1
    </Select.Item>
    <Select.Item value={2}>
        Hello2
    </Select.Item>
    <Select.Item value={3}>
        Hello3
    </Select.Item>
</Select>

export const Primary = Template.bind({});