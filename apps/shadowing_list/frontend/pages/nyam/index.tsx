import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Chain from '../../atomic/Organism/Navigation/Chain';
import {GiFeather} from 'react-icons/gi';
import NyamNyam from '../../atomic/Organism/Nyams/NyamNyam';

const Nyam: NextPage = () => {
    return <>
        <Head>
            <title>μ€μ€ - λ λ π</title>
            <meta name="description" content="λ°°μ΄ νν μ΅νκΈ°, λ°°μ΄ νν λ λ "/>
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

