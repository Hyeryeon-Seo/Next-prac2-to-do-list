'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: async (id: Todo['id']) => {
            await fetch(`http://localhost:3000/api/todos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });
        }
    });

    const handleDeleteTodo = (id: Todo['id']) => {
        deleteTodoMutation(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['todos']
                });
            }
        });
    };

    return handleDeleteTodo;
};

export default useDeleteTodoMutation;
