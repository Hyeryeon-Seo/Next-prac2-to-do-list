import { NewTodo, Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const useAddTodoMutation = () => {
    const queryClient = useQueryClient();

    // useMutation - add todo
    const { mutate: newTodoMutation } = useMutation({
        mutationFn: async (newTodo: NewTodo) => {
            const response = await fetch(`http://localhost:3000/api/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });
            const todo = await response.json();
            return todo;
        }
    });

    const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const contents = formData.get('contents') as string;

        newTodoMutation(
            { title, contents },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['todos']
                    });
                    e.currentTarget.reset();
                }
            }
        );
    };

    return handleSubmitTodo;
};

export default useAddTodoMutation;
