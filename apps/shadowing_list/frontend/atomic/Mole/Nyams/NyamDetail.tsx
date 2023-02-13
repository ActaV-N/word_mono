import React, { useState } from 'react';
import { TodayNyamT } from '../../../mocks/data';
import Modal from '../../Atom/Utils/Modal';
import { ShowEnum } from '../../Organism/Nyams/NyamNyam';
import NyamNyamDetail from './NyamNyamDetail';
import NyamZoopDetail from './NyamZoopDetail';

interface Props{
    nyam: TodayNyamT,
    showState: keyof typeof ShowEnum
}

const NyamDetail:React.FC<Props> = ({nyam, showState}) => {
    const [filled, setFilled] = useState<boolean>(nyam.meaning && nyam.langType ? true:false);

    return <div className='text-sm'>
        <div className='text-xs text-slate-600 text-right'>
            {nyam.created_at.toLocaleString()}
        </div>
        <div className='text-black font-bold'>
            뜻: {nyam.meaning}
        </div>
        {nyam.useCases.length !== 0 && (
            <div className='px-3 my-7'>
                <div className='mb-4 font-semibold text-slate-800'>
                    내 냠냠 경험: 
                </div>
                {nyam.useCases
                .map((useCase, i) => (
                <div key={i} className='mb-3'>
                    <div className='text-xs text-slate-700'>
                        {useCase.date.toLocaleString()}
                    </div>
                    <div>
                        <div className='py-1'>
                            {useCase.case}
                        </div>
                        <div className='text-slate-900'>
                            뜻: {useCase.meaning}
                        </div>
                    </div>
                </div>
                ))}
                <div className='mt-3 text-xs text-slate-700 text-right'>
                    냠냠 완료까지 남은 경험: {3 - nyam.useCases.length}
                </div>
            </div>    
        )}
        <div className='text-slate-800 text-xs mt-1'>
            표현 습득 출처: {nyam.media}
        </div>
        
        {showState === "zoop" && <NyamZoopDetail filled={filled} nyam={nyam} />}
        {showState === "nyam" && <NyamNyamDetail nyam={nyam} />}
    </div>
}

export default NyamDetail;