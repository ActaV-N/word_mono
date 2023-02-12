import React from 'react';
import { MdDriveFileMove } from 'react-icons/md';
import ButtonWithIcon from '../../Atom/Button/ButtonWithIcon';

interface Props{
    onClick: React.MouseEventHandler
}

const NyamZoopDetail: React.FC<Props> = ({onClick}) => {
    return <div className='text-right mt-5'>
        <ButtonWithIcon
            label="오늘 냠냠할 표현으로 옮기기"
            onClick={onClick}
            Icon={<MdDriveFileMove/>}
            tails="bg-orange-600 hover:bg-orange-800 text-white hover:text-white"
        />
    </div>
}

export default NyamZoopDetail;