import React from "react";

// SSG
const AboutPage = async () => {
	const response = await fetch(`http://localhost:4000/companyInfo`, {
		// 서버 컴포넌트라 바로 json-server DB 통신
		cache: "force-cache",
	});

	const companyInfo = await response.json(); // {name: .., description:.., image:..}
	return (
		<div className="flex flex-col items-center m-20 gap-20">
			<img
				src={companyInfo.image}
				alt="company-note-img"
				width={500}
				className="rounded"
			/>
			<p className="font-bold text-lg bg-rose-600/10 rounded p-3">
				🏢 {companyInfo.name}
			</p>
			<p className="pl-56 pr-52 font-bold">{companyInfo.description}</p>
		</div>
	);
};

export default AboutPage;
