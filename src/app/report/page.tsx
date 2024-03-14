import type { Todo } from "@/types";

// ISR (10초 주기)
const ReportPage = async () => {
	const response = await fetch(`http://localhost:4000/todos`, {
		// 통계정보는 json-server에 만들기
		next: {
			revalidate: 10,
		},
	});
	const todos = await response.json(); // 타입 써서 import 해오기

	const totalNumTodos = todos.length;
	const totalNumInProgressTodos = todos.filter(
		(todo: Todo) => todo.isDone === false
	).length;
	const totalNumDoneTodos = todos.filter(
		(todo: Todo) => todo.isDone === true
	).length;
	return (
		<div>
			{/* TODO 간략하게 working , done todos 보여주기 (표로?) */}
			<p>현재 총 {totalNumTodos}개의 할 일 목록이 등록되어 있어요!</p>
			<p>현재 {totalNumInProgressTodos}개의 할 일이 남아있어요</p>
			<p>현재까지 {totalNumDoneTodos}개의 할 일을 완료했어요</p>
		</div>
	);
};

export default ReportPage;
