import type { Todo } from '@/types';

// ISR (10초 주기)
const ReportPage = async () => {
    const response = await fetch(`http://localhost:4000/todos`, {
        // 서버컴포넌트 바로 json-server와 통신
        next: {
            revalidate: 10
        }
    });
    const todos: Todo[] = await response.json();

    const totalNumTodos = todos.length;
    const totalNumInProgressTodos = todos.filter((todo: Todo) => todo.isDone === false).length;
    const totalNumDoneTodos = todos.filter((todo: Todo) => todo.isDone === true).length;
    return (
        <div>
            <p className="m-2 text-xs text-neutral-400">
                이 통계는 매 10초마다 갱신됩니다. 업데이트가 안되었다면 새로고침 해주세요!
            </p>
            <div className="m-20 flex flex-col items-center">
                <h1 className="mb-3 text-3xl font-bold">My To-Do Report</h1>
                <p>You can see a report about your to-dos </p>
                <section className="mb-20 mt-20 flex flex-col gap-5">
                    <p>
                        📌 현재 총 <b>{totalNumTodos}</b>개의 할 일 목록이 등록되어 있어요! 📋
                    </p>
                    <p>
                        🏃‍♀️ 현재 <b>{totalNumInProgressTodos}</b>개의 할 일이 남아있어요
                    </p>
                    <p>
                        🥰 현재까지 <b>{totalNumDoneTodos}</b>개의 할 일을 완료했어요
                    </p>
                </section>
                <table
                    className="w-full table-auto overflow-hidden rounded-[15px] border-2 border-gray-400/30 bg-[#504b4b] 
				text-center text-lg text-[#fff] shadow-md shadow-slate-800"
                >
                    <thead className="h-[4rem]">
                        <tr className="bg-[rgba(224,189,189,0.66)]  ">
                            <th className="w-10 border-r-2 border-gray-600/30">No.</th>
                            <th className="border-r-2 border-gray-600/30">제목</th>
                            <th className="border-r-2 border-gray-600/30">내용</th>
                            <th className="w-1/12">완료 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo: Todo, index: number) => {
                            return (
                                <tr key={todo.id} className="h-[4rem] border-b-2 border-b-gray-400/30">
                                    <td className="border-r-2 border-r-gray-400/30">{index + 1}</td>
                                    <td className="w-[30rem] text-ellipsis border-r-2 border-r-gray-400/30">
                                        {todo.title}
                                    </td>
                                    <td className="w-[40rem] text-ellipsis border-r-2 border-r-gray-400/30">
                                        {todo.contents}
                                    </td>
                                    <td>{todo.isDone ? '완료 🎉' : '진행 중 🏃‍♀️'}</td>
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
