'use client'; // 클라이언트 컴포넌트여야 SSR페이지에서도 사용 가능

import CustomButton from './Button';
import { Todo } from '@/types';
import useTodo from '@/hooks/TodoList.hooks';

const TodoItem = ({ todo, page }: { todo: Todo; page?: string }) => {
    const { handleToggleTodoDone, handleDeleteTodo } = useTodo();

    return (
        <div
            key={todo.id}
            className="flex min-h-[15rem] w-[25rem] transform flex-col gap-1 rounded bg-[#504b4b] p-8 text-gray-300
            			shadow-sm shadow-slate-800 delay-100 hover:scale-105"
        >
            <h2 className="mb-3 text-xl font-bold">{todo.title}</h2>
            <p className="min-h-[3rem]">{todo.contents}</p>
            <p className="my-6 text-lg font-semibold">{todo.isDone ? '🥰 완료' : '🤔 진행 중'}</p>
            {page === 'ssr' ? (
                ''
            ) : (
                <div className="flex justify-between">
                    <CustomButton
                        onClick={() => handleToggleTodoDone({ id: todo.id, isDone: todo.isDone })}
                        classNameProperty="w-[10rem] bg-sky-200/70 hover:bg-sky-200/80 text-[#504b4b] px-6"
                    >
                        {todo.isDone ? '완료 취소' : '완료'}
                    </CustomButton>
                    <CustomButton
                        onClick={() => handleDeleteTodo(todo.id)}
                        classNameProperty="w-[10rem] bg-rose-200/70 hover:bg-rose-200/80 text-[#504b4b] px-6"
                    >
                        삭제
                    </CustomButton>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
