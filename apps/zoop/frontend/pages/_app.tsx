import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Noto_Sans_KR} from '@next/font/google';
import Header from '../layout/Header/Header';
import { RecoilRoot } from 'recoil';
import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { makeAuthenticatedRequest, MethodEnum } from '../lib/utils/authUtils';

const notoKR400 = Noto_Sans_KR({weight:"400", subsets:['latin']})

interface UserInfo{
  id: string | null
  email: string | null,
  username: string | null
}

const initialUserState = {
  email:null,
  id:null,
  username: null
}

export const UserStateContext = createContext<UserInfo>(initialUserState)
export const UserDispatchContext = createContext<Function>(() => {});

const queryClient = new QueryClient();
function MyApp({ Component, pageProps}: AppProps) {
  const [user, setUser] = useState<UserInfo>(initialUserState)

  return (
    <>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <UserStateContext.Provider value={user}>
          <UserDispatchContext.Provider value={setUser}>
            <style jsx global>{`
            html{
              font-family: ${notoKR400.style.fontFamily};
            }

            ::selection {
              background:#212529;
              color: #F8F9FA;
            }
          `}</style>
            <Header />
            <Component {...pageProps} />
          </UserDispatchContext.Provider>
        </UserStateContext.Provider>
      </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
