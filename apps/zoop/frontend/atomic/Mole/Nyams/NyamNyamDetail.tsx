import React, { useState } from 'react';
import { MdPlaylistAdd, MdFastfood } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequestWithCookieToken } from '../../../lib/utils/authUtils';
import { TodayNyamT } from '../../../mocks/data';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import QuoteContainer from '../../Atom/Container/QuoteContainer';
import TextField from '../../Atom/TextField';
import Modal from '../../Atom/Utils/Modal';

interface Props{
    nyam: TodayNyamT
}

interface newCaseInput{
    content:string,
    meaning: string
}
const NyamNyamDetail: React.FC<Props> = ({nyam}) => {
    // Query for new case
    const queryClient = useQueryClient();
    const addNewCase = useMutation(async (caseInputs: newCaseInput) => makeRequestWithCookieToken('post', `/expressions/${nyam.id}/cases`, {
        data:{
            ...caseInputs
        }
    }),{
        onMutate: async () => {
            queryClient.cancelQueries('todays_nyam');

            const previous = queryClient.getQueryData('todays_nyam');

            return {previous};
        },
        onError: (_, __, context)=>{
            queryClient.setQueryData('todays_nyam', context?.previous)
        },
        onSettled:() => {
            queryClient.invalidateQueries('todays_nyam');
        },
        onSuccess: () => {
            queryClient.invalidateQueries('todays_nyam');
            handleCaseAddModalClose();
        }
    })
    // Nyam Input state
    const [nyamInputs, setNyamInputs] = useState<newCaseInput>({
        content: "",
        meaning: ""
    });
    
    // Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleNyamCase = () => {
        setIsAddModalOpen(true);
    }

    const handleCaseAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    // Handle input values
    const handleInputChange:React.ChangeEventHandler = (event:React.ChangeEvent) => {
        const el: HTMLInputElement = event.target as HTMLInputElement;
        
        setNyamInputs(nyam => ({
            ...nyam,
            [el.name]:el.value
        }));
    }

    // Sumbit new case
    const handleAddNyam = () => {
        addNewCase.mutate(nyamInputs);
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
                        {nyam.content}
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
                            name="content"
                            value={nyamInputs.content}
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