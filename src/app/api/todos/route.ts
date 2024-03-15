export async function GET(request: Request) {
    const response = await fetch(`http://localhost:4000/todos`); // json-server에 요청
    const todos = await response.json();
    if (!todos) {
        return new Response('To-dos cannot be found', {
            status: 404
        });
    }
    return Response.json({
        todos
    });
}

export async function POST(request: Request) {
    const { title, contents } = await request.json();
    await fetch(`http://localhost:4000/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, contents, isDone: false })
    });
}

export async function PATCH(request: Request) {
    const { id, isDone } = await request.json();
    await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDone: !isDone })
    });
}

export async function DELETE(request: Request) {
    const id = await request.json();
    await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE'
    });
}
