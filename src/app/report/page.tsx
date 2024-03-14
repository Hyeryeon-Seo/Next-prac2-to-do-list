import type { Todo } from "@/types";

// ISR (10초 주기)
const ReportPage = async () => {
	const response = await fetch(`http://localhost:4000/todos`, {
		// 서버컴포넌트 바로 json-server와 통신
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
			<div className="flex flex-col items-center m-20">
				<h1 className="font-bold text-3xl mb-3">My To-Do Report</h1>
				<p>You can see a report about your to-dos </p>

				<section className="mt-20 mb-20 flex flex-col gap-5">
					<p>
						📌 현재 총 <b>{totalNumTodos}</b>개의 할 일 목록이 등록되어 있어요!
						📋
					</p>
					<p>
						🏃‍♀️ 현재 <b>{totalNumInProgressTodos}</b>개의 할 일이 남아있어요
					</p>
					<p>
						🥰 현재까지 <b>{totalNumDoneTodos}</b>개의 할 일을 완료했어요
					</p>
				</section>

				{/* table padding p- 안먹힘.. */}
				{/* overflow-hidden 중요 : 해야 둥글기 적용됨 */}
				<table
					className="table-auto text-lg border-2 w-full border-gray-400/30 rounded-[15px] overflow-hidden 
				text-center bg-[#504b4b] text-[#fff] shadow-md shadow-slate-800"
				>
					<thead className="h-[4rem]">
						<tr className="bg-[rgba(224,189,189,0.66)]  ">
							<th className="border-r-2 border-gray-600/30 w-10">No.</th>
							<th className="border-r-2 border-gray-600/30">제목</th>
							<th className="border-r-2 border-gray-600/30">내용</th>
							<th className="w-1/12">완료 상태</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo: Todo, index: number) => {
							return (
								<tr
									key={todo.id}
									className="border-b-2 border-b-gray-400/30 h-[4rem]"
								>
									<td className="border-r-2 border-r-gray-400/30">
										{index + 1}
									</td>
									<td className="border-r-2 border-r-gray-400/30">
										{todo.title}
									</td>
									<td className="border-r-2 border-r-gray-400/30">
										{todo.contents}
									</td>
									{/* overflow-hidden  trancate? ellipsis 다 적용해봤지만 길어지면 그냥 줄바꿈..
									넓이, 길이도 설정해봤으나 안됨*/}
									<td>{todo.isDone ? "완료 🎉" : "진행 중 🏃‍♀️"}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ReportPage;
