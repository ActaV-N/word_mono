import React, { useState } from 'react';
import Container from '../../Atom/Container';
import PaperContainer from '../../Atom/Container/PaperContainer';
import {FaExchangeAlt} from 'react-icons/fa'
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import { TodayNyamT, TODAY_NYAM } from '../../../mocks/data';
import NyamAccordian from '../../Mole/Nyams/NyamAccordian';
import Modal from '../../Atom/Utils/Modal';
/**
 * TODO: Create Accordiand and Accordian Group with expressions
 * TODO: If accordian expanded, there will be some informations about expression.
 * TODO: Meaning, Language(en, kr, jp)
 * TODO: It can be moved to the 'nyam' section which includes the expressions I'm gonna use.
 * TODO: In the nyam section, at least (3 or 5) use cases needed for nyam.
 */
export enum ShowEnum{
    "nyam",
    "zoop"
};

const NyamNyam = () => {

    const [showState, setShowState] = useState<keyof typeof ShowEnum>("nyam");
    const [nyamData, setNyamData] = useState<TodayNyamT[]>(TODAY_NYAM);

    const TodayNyamFilter = (nyam: TodayNyamT):boolean => {
        if(nyam.gonnaNyam){
            return showState === 'nyam';
        } else{
            return showState === 'zoop';
        }
    }

    const handleShowState = () => {
        setShowState(showState => showState === 'nyam' ? 'zoop': 'nyam');
    }

    return <Container>
        <PaperContainer tails="h-[calc(100vh-12rem)]">
            <div className='px-3 h-[50px] flex items-center'>
                <ButtonWithIcon
                    Icon={<FaExchangeAlt/>}
                    label={showState === 'nyam' ? "여태 줍줍한 표현들 보기":"오늘 냠냠할 표현들 보기"}
                    onClick={handleShowState}
                />
            </div>
            <div className='h-[calc(100%-50px)] overflow-y-auto'>
                {nyamData.filter(TodayNyamFilter)
                .map(nyam => <NyamAccordian key={nyam.id} nyam={nyam} showState={showState} />)}
            </div>
        </PaperContainer>
    </Container>
}

export default NyamNyam