import React from 'react';
import { LangEnum, TodayNyamT } from '../../../mocks/data';

interface Props{
    nyam:TodayNyamT
}

const NyamSummary:React.FC<Props> = ({nyam}) => {
    return <>
        <div>
            {nyam.expression}
        </div>
        <div className='text-xs text-slate-700 pt-2'>
            Category: {LangEnum[nyam.langType]}
        </div>
    </>
}

export default NyamSummary;