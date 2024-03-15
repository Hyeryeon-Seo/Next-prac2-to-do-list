'use client'; // 클라이언트 컴포넌트 CSR

import type { Todo } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotFoundPage from '../not-found';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/Button';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';

const TodosCSRPage = () => {
    // TODO 컴포넌트 분리 / axios... 변수 타입 적어보기
    const router = useRouter();

    const {
        data: todos,
        isLoading,
        isError
    } = useQuery({
        // TODO hook 으로 만들어보기
        queryKey: ['todos'],
        queryFn: async () => {
            // axios 사용해보기
            const { data } = await axios.get(`http://localhost:3000/api/todos`); // route handler 활용
            return data.todos;
        }
    });

    const handleReportClick = () => {
        router.push('/report');
    };

    if (isLoading) {
        return <div>로딩 중입니다 .. !</div>;
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
            <section className="flex flex-wrap justify-center gap-10">
                {todos.map((todo: Todo) => {
                    return <TodoItem todo={todo} />;
                })}
            </section>
        </div>
    );
};

export default TodosCSRPage;
