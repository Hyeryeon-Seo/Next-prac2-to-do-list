import React from "react";

// ISR (10초 주기)
const ReportPage = async () => {
	const response = await fetch(`http://localhost:4000/reports`, {
		// 통계정보는 json-server에 만들기
		next: {
			revalidate: 10,
		},
	});
	const data = await response.json(); // 타입 써서 import 해오기
	return <div>ReportPage</div>;
};

export default ReportPage;
