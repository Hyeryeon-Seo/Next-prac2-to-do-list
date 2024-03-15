'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: async (id: Todo['id']) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
                method: 'DELETE'
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
                },
                onError: () => {
                    toast.error('처리에 오류가 발생했습니다. 다시 시도해주세요.');
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
