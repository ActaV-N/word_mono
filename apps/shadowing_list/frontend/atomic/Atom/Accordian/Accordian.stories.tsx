import Accordian from ".";
import {ComponentMeta} from '@storybook/react';

export default {
    title:'Surfaces/Accordian',
    component: Accordian
} as ComponentMeta<typeof Accordian>

const Template = (args: any) => <Accordian>
    <Accordian.Summary>
        Accordian Example Summary
    </Accordian.Summary>
    <Accordian.Detail>
        Accordian Example Summary
    </Accordian.Detail>
</Accordian>

export const Primary = Template.bind({});