import React from 'react';
import { MdDriveFileMove } from 'react-icons/md';
import { IoMdInformationCircle } from 'react-icons/io';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';
import { TodayNyamT } from '../../../mocks/data';

interface Props{
    nyam: TodayNyamT,
    filled: boolean
}

const NyamZoopDetail: React.FC<Props> = ({nyam, filled}) => {
    const handleFill = () => {

    }

    const handleMove = () => {

    }

    return <div className='text-right mt-5'>
        <ButtonWithIcon
            label="줍줍 정보 채워넣기"
            onClick={handleFill}
            Icon={<IoMdInformationCircle/>}
            tails="bg-orange-600 hover:bg-orange-800 text-white hover:text-white mr-3"
        />
        <ButtonWithIcon
            label="오늘 냠냠할 표현으로 옮기기"
            onClick={handleMove}
            Icon={<MdDriveFileMove/>}
            disabled
            tails={`bg-orange-600 hover:bg-orange-800 text-white hover:text-white ${!filled && "cursor-not-allowed opacity-70 hover:bg-orange-600"}`}
        />
    </div>
}

export default NyamZoopDetail;