import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { GiCardExchange } from 'react-icons/gi';
import { TodayNyamT, UseCaseT } from '../../../../mocks/data';
import ButtonWithIcon from '../../../Atom/Button/ButtonWithIcon';
import IconButton from '../../../Atom/Button/IconButton';
import QuoteContainer from '../../../Atom/Container/QuoteContainer';
import TextField from '../../../Atom/TextField';
import Modal from '../../../Atom/Utils/Modal';

interface Props{
    nyam: TodayNyamT,
    useCase: UseCaseT
}

const NyamModifyModal:React.FC<Props> = ({nyam, useCase}) => {
    const initialState = {
        content: useCase.content,
        meaning: useCase.meaning
    }
    const [caseInputs, setCaseInputs] = useState(initialState);

    const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
    
    const handleModifyModalOpen = () => {
        setIsModifyModalOpen(true);
    }
    const handleModifyModalClose = () => {
        setIsModifyModalOpen(false);
        setCaseInputs(initialState);
    }

    const handleCaseInput:React.ChangeEventHandler = (event: React.ChangeEvent) => {
        const el: HTMLInputElement = event.target as HTMLInputElement;
        
        setCaseInputs(useCase => ({
            ...useCase,
            [el.name]:el.value
        }));
    }

    return <div>
        <IconButton
            Icon={<FaPencilAlt/>}
            tails="hover:text-blue-600"
            onClick={handleModifyModalOpen}
        />
        <Modal onClose={handleModifyModalClose} isOpen={isModifyModalOpen}>
            <Modal.Head>
            냠냠 케이스 수정하기 ✍🏻
            </Modal.Head>
            <Modal.Body>
                <QuoteContainer>
                    <div>
                        {nyam.content}
                    </div>
                    <div>
                        뜻: {nyam.meaning}
                    </div>
                </QuoteContainer>
                <div className='mt-3'>
                    <div className='mb-2'>
                        <TextField
                            label="수정하기"
                            onChange={handleCaseInput}
                            name="content"
                            value={caseInputs.content}
                        />
                    </div>
                    <div>
                        <TextField
                            label="의미"
                            onChange={handleCaseInput}
                            name="meaning"
                            value={caseInputs.meaning}
                        />
                    </div>
                    <div className='text-right mt-3'>
                        <ButtonWithIcon
                            label="케이스 수정하기"
                            onClick={() => {}}
                            Icon={<GiCardExchange/>}
                            color="blue"
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default NyamModifyModal;