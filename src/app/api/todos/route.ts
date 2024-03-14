export async function GET(request: Request) {
	const response = await fetch(`http://localhost:4000/todos`); // json-server에 요청
	const todos = await response.json();
	if (!todos) {
		return new Response("To-dos cannot be found", {
			status: 404,
		});
	}
	return Response.json({
		todos,
	}); // {todos: [{},{},..]}
}

export async function POST(request: Request) {
	const { title, contents } = await request.json();
	const response = await fetch(`http://localhost:4000/todos`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title, contents, isDone: false }), // id는 자동생성
	});
	const todo = await response.json(); // 데이터 넣고 응답 받기
	return Response.json({ todo });
}

export async function DELETE(request: Request) {
	const id = await request.json();
	const response = await fetch(`http://localhost:4000/todos/${id}`, {
		method: "DELETE",
	});
	const todo = await response.json();
	return Response.json({ todo }); // 해당하는 todo 반환
}
