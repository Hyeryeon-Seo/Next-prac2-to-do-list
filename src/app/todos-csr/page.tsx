'use client'; // 클라이언트 컴포넌트 CSR

import type { Todo } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import NotFoundPage from '../not-found';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/Button';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

const TodosCSRPage = () => {
    const router = useRouter();

    const {
        data: todos,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            // axios 사용해보기
            const { data } = await axios.get(`http://localhost:3000/api/todos`); // route handler 활용
            return data.todos;
        }
    });

    const doneTodos = todos?.filter((todo: Todo) => todo.isDone === true);
    const workingTodos = todos?.filter((todo: Todo) => todo.isDone === false);

    const handleReportClick = () => {
        router.push('/report');
    };

    if (isLoading) {
        return (
            <div className="flex h-svh items-center justify-center text-lg ">
                <p>로딩 중입니다. 잠시만 기다려주세요 (˶ᵔ ᵕ ᵔ˶)</p>
            </div>
        );
    }

    if (isError) {
        return <NotFoundPage />;
    }

    return (
        <div className="m-20 flex flex-col items-center">
            <h1 className="mb-3 text-3xl font-bold">My To-Do List</h1>
            <p className="mb-10">See all your Todos and Make them all Done!</p>
            <CustomButton
                onClick={handleReportClick}
                classNameProperty="w-[15rem] bg-rose-800/30 hover:bg-green-900/30"
            >
                {`> To-Do Report 보러가기`}
            </CustomButton>
            <TodoForm />
            <TodoList title="Working" todos={workingTodos} />
            <TodoList title="Done" todos={doneTodos} />
        </div>
    );
};

export default TodosCSRPage;
