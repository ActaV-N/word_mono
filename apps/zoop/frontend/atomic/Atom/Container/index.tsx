import React from "react";

interface Props{
    children: React.ReactNode
}

const Container:React.FC<Props> = ({children}) => {
    return <div className='w-full h-full'>
        <div className='wrapper sm:w-10/12 w-11/12 max-w-3xl mx-auto py-24'>
            {children}
        </div>
    </div>
}

export default Container