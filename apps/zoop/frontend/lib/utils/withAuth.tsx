import { AxiosError } from "axios";
import { useRouter } from "next/router"
import { ComponentType, useContext, useEffect } from "react";
import { refreshRequest } from "../api/axios";
import { makeAuthenticatedRequest } from "./authUtils";
import Cookies from 'js-cookie';
import { UserDispatchContext } from "../../pages/_app";

export interface AuthenticatedPageProps{
    email: string,
    id: string
}

export default function withAuth<P extends AuthenticatedPageProps>(Component: ComponentType<P>): ComponentType<P>{
    return function AuthenticatedComponent(props: P){
        const router = useRouter();
        const setUser = useContext(UserDispatchContext);

        useEffect(() => {
            async function checkToken(){
                const accessToken = Cookies.get('accessToken')
                if(!accessToken){
                    router.push('/');
                    setUser({
                        email:null,
                        id:null,
                        username: null
                    })
                    return;
                }

                try{
                    const response = await makeAuthenticatedRequest(accessToken, 'get', '/users/me');
                    setUser(response.data);
                    console.log('valid accessToken ', response.data);
                } catch(error){
                    let axiosError = error as AxiosError;
                    if(axiosError.response?.status === 401){
                        // Try Refresh
                        const refreshToken = Cookies.get('refreshToken')
                        if(!refreshToken){
                            router.push('/');
                            setUser({
                                email:null,
                                id:null,
                                username:null
                            })
                            return;
                        }
                        
                        try{
                            const response = await refreshRequest(refreshToken);
                            Cookies.set('accessToken', response.data.accessToken, {
                                httpOnly: true,
                                // secure: true
                            })

                            Cookies.set('refreshToken', response.data.refreshToken, {
                                httpOnly: true,
                                // secure: true
                            })
                            const userResponse = await makeAuthenticatedRequest(accessToken, 'get', '/users/me');
                            setUser(userResponse.data);
                            console.log('valid refreshToken ', response.data);
                            console.log('valid accessToken ', userResponse.data);
                        } catch(error){
                            router.push('/');
                            setUser({
                                email:null,
                                id:null,
                                username:null
                            })
                        }
                    }
                }
            }

            checkToken();
        }, [])

        return <Component {...props} />
    }
}