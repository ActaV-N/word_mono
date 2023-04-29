import React from 'react';
import { LangEnum, TodayNyamT } from '../../../mocks/data';
import Accordian from '../../Atom/Accordian';
import { ShowEnum } from '../../Organism/Nyams/NyamNyam';
import NyamDetail from './NyamDetail';
import NyamSummary from './NyamSummary';

interface Props{
    nyam: TodayNyamT,
    showState: keyof typeof ShowEnum
}

const NyamAccordian: React.FC<Props> = ({nyam, showState}) => {
    return (
        <Accordian>
            <Accordian.Summary>
                <NyamSummary nyam={nyam}/> 
            </Accordian.Summary>
            <Accordian.Detail tails={showState === "zoop" ? "bg-orange-white" : "bg-blue-white"}>
                <NyamDetail nyam={nyam} showState={showState} />
            </Accordian.Detail>
        </Accordian>)
}

export default NyamAccordian;