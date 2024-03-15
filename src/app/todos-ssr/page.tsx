import CustomButton from '@/components/Button';
import TodoList from '@/components/TodoList';
import { Todo } from '@/types';
import Link from 'next/link';
import React from 'react';

// SSR 서버 컴포넌트 - 바로 json-server 와 통신
const TodosSSRPage = async () => {
    const reponse = await fetch(`http://localhost:4000/todos`, {
        cache: 'no-cache'
    });

    const todos: Todo[] = await reponse.json();

    const doneTodos = todos?.filter((todo: Todo) => todo.isDone === true);
    const workingTodos = todos?.filter((todo: Todo) => todo.isDone === false);

    return (
        <div className="m-20 flex flex-col items-center">
            <h1 className="mb-3 text-3xl font-bold">My To-Do List</h1>
            <p className="mb-10">See all your Todos and Make them all Done!</p>
            <Link href={`/report`}>
                <CustomButton classNameProperty="w-[15rem] bg-rose-800/30 hover:bg-green-900/30">
                    {`> To-Do Report 보러가기`}
                </CustomButton>
            </Link>
            <TodoList title="Working" todos={workingTodos} page="ssr" />
            <TodoList title="Done" todos={doneTodos} page="ssr" />
        </div>
    );
};

export default TodosSSRPage;
