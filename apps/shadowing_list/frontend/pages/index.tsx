import type { NextPage } from 'next'
import Head from 'next/head'
import Chain from '../atomic/Organism/Navigation/Chain'
import {RxActivityLog} from 'react-icons/rx'
import ZoopZoop from '../atomic/Organism/Zoops/ZoopZoop'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>줍줍</title>
        <meta name="description" content="영어, 일본어, 중국어 쉐도잉, 표현 줍줍" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Chain rightTo='/nyam' RightIcon={<RxActivityLog/>}>
          <ZoopZoop />
        </Chain>
      </main>
    </div>
  )
}

export default Home
