import React, { useState } from 'react';
import { MdPlaylistAdd, MdFastfood } from 'react-icons/md';
import { TodayNyamT } from '../../../mocks/data';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import QuoteContainer from '../../Atom/Container/QuoteContainer';
import TextField from '../../Atom/TextField';
import Modal from '../../Atom/Utils/Modal';

interface Props{
    nyam: TodayNyamT
}

const NyamNyamDetail: React.FC<Props> = ({nyam}) => {
    const [nyamInputs, setNyamInputs] = useState({
        expression: "",
        meaning: ""
    });
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleInputChange:React.ChangeEventHandler = (event:React.ChangeEvent) => {
        const el: HTMLInputElement = event.target as HTMLInputElement;
        
        setNyamInputs(nyam => ({
            ...nyam,
            [el.name]:el.value
        }));
    }

    const handleNyamCase = () => {
        setIsAddModalOpen(true);
    }

    const handleCaseAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    const handleAddNyam = () => {

    }

    return <div className='text-right mt-5'>
        <ButtonWithIcon
            label="냠냠 케이스 추가하기"
            onClick={handleNyamCase}
            Icon={<MdPlaylistAdd/>}
            color="blue"
        />
        <Modal isOpen={isAddModalOpen} onClose={handleCaseAddModalClose} >
            <Modal.Head>
                새로운 냠냠 케이스 🤩
            </Modal.Head>
            <Modal.Body>
                <QuoteContainer>
                    <div>
                        {nyam.expression}
                    </div>
                    <div>
                        뜻: {nyam.meaning}
                    </div>
                </QuoteContainer>
                <div className='mt-3'>
                    <div className='mb-2'>
                        <TextField
                            label="새로운 냠냠 케이스"
                            onChange={handleInputChange}
                            name="expression"
                            value={nyamInputs.expression}
                        />
                    </div>
                    <div>
                        <TextField
                            label="의미"
                            onChange={handleInputChange}
                            name="meaning"
                            value={nyamInputs.meaning}
                        />
                    </div>
                    <div className='text-right mt-3'>
                        <ButtonWithIcon
                            label="케이스 추가하기"
                            onClick={handleAddNyam}
                            Icon={<MdFastfood/>}
                            color="blue"
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default NyamNyamDetail;