import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Chain from '../../atomic/Organism/Navigation/Chain';
import {GiFeather} from 'react-icons/gi';
import NyamNyam from '../../atomic/Organism/Nyams/NyamNyam';

const Nyam: NextPage = () => {
    return <>
        <Head>
            <title>줍줍 - 냠냠😋</title>
            <meta name="description" content="배운 표현 익히기, 배운 표현 냠냠"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Chain leftTo='/' LeftIcon={<GiFeather/>}>
                <NyamNyam />
            </Chain>
        </main>
    </>
}

export default Nyam

