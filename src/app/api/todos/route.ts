export async function GET(_request: Request) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/todos`); // json-server에 요청
        const todos = await response.json();
        if (!todos) {
            return new Response('To-dos cannot be found', {
                status: 404
            });
        }
        return Response.json({
            todos
        });
    } catch (error) {
        throw new Error('Internal Server Error !');
    }
}

export async function POST(request: Request) {
    try {
        const { title, contents } = await request.json();
        await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, contents, isDone: false })
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        throw new Error('Internal Server Error !');
    }
}
