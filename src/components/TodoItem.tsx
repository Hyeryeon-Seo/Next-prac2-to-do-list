// 'use client'; 필요없음 (button도 컴포넌트 분리해서?)

import CustomButton from './Button';
import { Todo } from '@/types';
import useTodo from '@/hooks/TodoList.hooks';

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { handleToggleTodoDone, handleDeleteTodo } = useTodo();

    return (
        <div
            key={todo.id}
            className="flex min-h-[15rem] w-[25rem] transform flex-col gap-1 rounded bg-[#504b4b] p-8 text-gray-300
            			shadow-sm shadow-slate-800 delay-100 hover:scale-105"
            //w-3/12 이런식으로 너비 정하니 갯수마다 달라져 문제생김
        >
            <h2 className="mb-3 text-xl font-bold">{todo.title}</h2>
            <p className="min-h-[3rem]">{todo.contents}</p>
            <p className="my-6 text-lg font-semibold">
                {/* 조건부 스타일링하기 글씨색깔! */}
                {todo.isDone ? '🥰 완료' : '🤔 진행 중'}
            </p>
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
        </div>
    );
};

export default TodoItem;
