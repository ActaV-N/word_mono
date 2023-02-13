import React, { useState } from 'react';
import { MdPlaylistAdd } from 'react-icons/md';
import { TodayNyamT } from '../../../mocks/data';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import TextField from '../../Atom/TextField';
import Modal from '../../Atom/Utils/Modal';

interface Props{
    nyam: TodayNyamT
}

const NyamNyamDetail: React.FC<Props> = ({nyam}) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleNyamCase = () => {
        setIsAddModalOpen(true);
    }

    const handleCaseAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    return <div className='text-right mt-5'>
        <ButtonWithIcon
            label="냠냠 케이스 추가하기"
            onClick={handleNyamCase}
            Icon={<MdPlaylistAdd/>}
            tails="bg-blue-600 hover:bg-blue-800 text-white hover:text-white"
        />
        <Modal isOpen={isAddModalOpen} onClose={handleCaseAddModalClose} >
            <Modal.Head>
                새로운 냠냠 케이스 🤩
            </Modal.Head>
            <Modal.Body>
                <div className='p-3 rounded-md bg-slate-300 text-slate-700'>
                    <div>
                        {nyam.expression}
                    </div>
                    <div>
                        뜻: {nyam.meaning}
                    </div>
                </div>
                <div className='mt-3'>
                    <div className='mb-2'>
                        <TextField
                            label="새로운 냠냠 케이스"
                        />
                    </div>
                    <div>
                        <TextField
                            label="의미"
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default NyamNyamDetail;