// 특정 id에 대한 요청을 하는 PATCH, DELETE 만 동적 라우팅, [id] 폴더 안에
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        // const { id, isDone } = await request.json();
        const id = params.id;
        const { isDone } = await request.json();
        await fetch(`http://localhost:4000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isDone: !isDone })
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        throw new Error('Internal Server Error !');
    }
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
    // const id = await request.json();
    try {
        await fetch(`http://localhost:4000/todos/${params.id}`, {
            method: 'DELETE'
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        throw new Error('Internal Server Error !');
    }
}
