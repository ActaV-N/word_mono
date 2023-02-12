import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Noto_Sans_KR} from '@next/font/google';
import Header from '../layout/Header';
import { RecoilRoot } from 'recoil';

const notoKR400 = Noto_Sans_KR({weight:"400", subsets:['latin']})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <RecoilRoot>
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
      </RecoilRoot>
    </>
  )
}

export default MyApp
