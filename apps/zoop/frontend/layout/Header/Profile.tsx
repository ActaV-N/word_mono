import React, { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import IconButton from '../../atomic/Atom/Button/IconButton';

interface Props{
    email: string | null,
    username: string | null
}

const Profile:React.FC<Props> = ({email, username}) => {
    if(username){
        return <div className='text-xs'>
            안녕하세요! {username} 님! 🙌🏻
        </div>
    }

    if(email){
        return <></>
    }

    return <>
        <div>
            <a href="http://localhost:8000/auth/google">
                <IconButton
                    Icon={<FaGoogle/>}
                    tails="hover:text-[#EA4336]"
                />
            </a>
        </div>
        <div className='ml-3'>
            <a href="http://localhost:8000/auth/naver">
                <IconButton
                    Icon={<SiNaver/>}
                    tails="hover:text-[#04CF5B]"
                />
            </a>
        </div>
    </>
}

export default Profile;