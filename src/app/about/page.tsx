import React from 'react';

// SSG
const AboutPage = async () => {
    const response = await fetch(`http://localhost:4000/companyInfo`, {
        // 서버 컴포넌트라 바로 json-server DB 통신
        cache: 'force-cache'
    });
    const companyInfo = await response.json();
    const { image, name, description } = companyInfo;

    return (
        <div className="m-20 flex flex-col items-center gap-20">
            <img src={image} alt="company-note-img" width={500} className="rounded" />
            <p className="rounded bg-rose-600/10 p-3 text-lg font-bold">🏢 {name}</p>
            <p className="pl-56 pr-52 font-medium">{description}</p>
        </div>
    );
};

export default AboutPage;
