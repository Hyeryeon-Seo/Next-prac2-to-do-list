import React from "react";

// SSG
const AboutPage = async () => {
	const response = await fetch(`http://localhost:4000/companyInfo`, {
		// 서버 컴포넌트라 바로 json-server DB 통신
		cache: "force-cache",
	});

	const companyInfo = await response.json(); // {name: .., description:.., image:..}
	return (
		<div>
			<p>{companyInfo.name}</p>
			<p>{companyInfo.description}</p>
			<img src={companyInfo.image} />
			<p>fsdfsdf</p>
		</div>
	);
};

export default AboutPage;
