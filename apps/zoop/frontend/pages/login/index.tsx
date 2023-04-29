import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GiThreeFriends } from 'react-icons/gi';
import ButtonWithIcon from '../../atomic/Atom/Button/ButtonWithIcon';
import Container from '../../atomic/Atom/Container';
import PaperContainer from '../../atomic/Atom/Container/PaperContainer';
import TextField from '../../atomic/Atom/TextField';
import { makeAuthenticatedRequest } from '../../lib/utils/authUtils';
import withAuth from '../../lib/utils/withAuth';

const Login: NextPage = () => {
    // Router
    const router = useRouter();

    // Username Inputs
    const [username, setUsername] = useState('');

    const handleUsernameChange:React.ChangeEventHandler = (event: React.ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        setUsername(input.value);
    }

    // Token
    const [accessToken, setAccessToken] = useState<string | undefined>('')
    useEffect(() => {
        const token = Cookies.get('accessToken');
        setAccessToken(token);
    }, [])
    
    // Const create new user
    const handleSubmit = async () => {
        const {data} = await makeAuthenticatedRequest(accessToken, 'post', '/auth/signup', {
            username: username
        });

        if(data.success){
            Cookies.set('accessToken', data.accessToken);
            Cookies.set('refreshToken', data.refreshToken);

            router.replace('/zoop');
        } else{
            console.log(data.error)
        }
    }

    return <div>
        <Container>
            <div className='text-center mb-5'>
                <div className='font-bold text-lg mb-1'>
                    👏🏻 줍줍에 오신것을 환영합니다! 👏🏻
                </div>
                <div>
                    저희의 친밀감을 위해 별명을 입력해주세요 😎
                </div>
            </div>
            <div>
                <TextField
                    label='별명을 입력해주세요!'
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className='text-right mt-3'>
                <ButtonWithIcon
                    label="회원가입하기!"
                    Icon={<GiThreeFriends/>}
                    onClick={handleSubmit}
                    color="green"
                />
            </div>
        </Container>
    </div>
}

export default withAuth(Login);