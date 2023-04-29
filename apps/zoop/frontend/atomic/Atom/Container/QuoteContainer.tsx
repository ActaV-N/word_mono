import React from 'react';

interface Props{
    children: React.ReactNode
}

const QuoteContainer:React.FC<Props> = ({children}) => {
    return <div className='p-3 rounded-md bg-slate-300 text-slate-700'>
        {children}
    </div>
}

export default QuoteContainer