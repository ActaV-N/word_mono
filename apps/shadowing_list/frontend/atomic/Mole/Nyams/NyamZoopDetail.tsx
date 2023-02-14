import React, { useState } from 'react';
import { MdDriveFileMove } from 'react-icons/md';
import { IoMdInformationCircle } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import { TodayNyamT } from '../../../mocks/data';
import Modal from '../../Atom/Utils/Modal';
import QuoteContainer from '../../Atom/Container/QuoteContainer';
import TextField from '../../Atom/TextField';

interface Props{
    nyam: TodayNyamT,
    filled: boolean
}

const NyamZoopDetail: React.FC<Props> = ({nyam, filled}) => {
    const [nyamInputs, setNyamInputs] = useState({
        meaning: nyam.meaning,
        langType: nyam.langType,
        media:nyam.media,
    })
    const [isFillModalOpen, setIsFillModalOpen] = useState(false);

    const handleFillModalOpen = () => {
        setIsFillModalOpen(true);
    }

    const onFillModalClose = () => {
        setIsFillModalOpen(false);
    }

    const handleMove = () => {

    }

    return <div className='text-right mt-5'>
        <ButtonWithIcon
            label={filled ? "줍줍 정보 수정하기":"줍줍 정보 채워넣기"}
            onClick={handleFillModalOpen}
            Icon={filled ? <FaEdit/> : <IoMdInformationCircle/>}
            tails="mr-3"
            color="orange"
        />
        <Modal isOpen={isFillModalOpen} onClose={onFillModalClose}>
            <Modal.Head>
                {filled ? "줍줍 정보 수정하기 ✍🏻": "줍줍 정보 채워넣기 ✍🏻"}
            </Modal.Head>
            <Modal.Body>
                <QuoteContainer>
                    {nyam.expression}
                </QuoteContainer>
                <div className='mt-5 mb-3'>
                    <TextField
                        label="뜻"
                        value={nyam.meaning}
                        name="meaning"
                    />
                </div>
                <div className='flex '>
                    <div className='flex-1 pr-2'>
                        셀렉트
                    </div>
                    <div className='flex-1 pl-2'>
                        <TextField
                            label="줍줍 출처"
                            name="media"
                            value={nyam.media}
                        />
                    </div>
                </div>
                <div className='mt-5 text-right'>
                    <ButtonWithIcon
                        label={filled ? "줍줍 정보 수정하기": "줍줍 정보 채워넣기"}
                        Icon={filled ? <FaEdit/> : <IoMdInformationCircle/>}
                        onClick={() => {}}
                        color="orange"
                    />
                </div>
            </Modal.Body>
        </Modal>
        <ButtonWithIcon
            label="오늘 냠냠할 표현으로 옮기기"
            onClick={handleMove}
            Icon={<MdDriveFileMove/>}
            disabled
            color="orange"
            tails={`${!filled && "cursor-not-allowed opacity-70 hover:bg-orange-600"}`}
        />
    </div>
}

export default NyamZoopDetail;