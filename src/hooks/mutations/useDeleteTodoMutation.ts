'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: async (id: Todo['id']) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });
        }
    });

    const handleDeleteTodo = async (id: Todo['id']) => {
        if (window.confirm(`정말 삭제하시겠습니까?`)) {
            await deleteTodoMutation(id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['todos']
                    });
                }
            });
            toast.success('삭제되었습니다');
        } else {
            return;
        }
    };

    return handleDeleteTodo;
};

export default useDeleteTodoMutation;
