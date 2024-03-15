import type { CompanyInfo } from '@/types';
import Image from 'next/image';
import React from 'react';

// SSG
const AboutPage = async () => {
    const response = await fetch(`http://localhost:4000/companyInfo`, {
        // 서버 컴포넌트라 바로 json-server DB 통신
        cache: 'force-cache'
    });
    const companyInfo: CompanyInfo = await response.json();
    const { image, name, description } = companyInfo;

    return (
        <div className="m-20 flex  flex-col items-center gap-14">
            <Image src={image} alt="company-note-img" width={500} height={500} className="rounded" />
            <p className="rounded bg-rose-600/10 px-5 py-2 text-lg font-bold">🏢 {name}</p>
            <p className="w-[54rem] font-medium leading-loose">{description}</p>
        </div>
    );
};

export default AboutPage;
