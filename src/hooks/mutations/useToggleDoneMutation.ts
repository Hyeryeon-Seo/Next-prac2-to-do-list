'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useToggleDoneMutation = () => {
    const queryClient = useQueryClient();

    // useMutation - patch todo (toggle isDone)
    const { mutate: toggleTodoDoneMutation } = useMutation({
        mutationFn: async ({ id, isDone }: { id: Todo['id']; isDone: Todo['isDone'] }) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isDone })
            });
        }
    });

    const handleToggleTodoDone = async ({ id, isDone }: { id: Todo['id']; isDone: Todo['isDone'] }) =>
        await toggleTodoDoneMutation(
            { id, isDone },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['todos']
                    });
                },
                onError: () => {
                    toast.error('처리에 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        );

    return handleToggleTodoDone;
};

export default useToggleDoneMutation;
