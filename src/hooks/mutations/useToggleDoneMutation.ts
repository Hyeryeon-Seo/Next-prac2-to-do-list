'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useToggleDoneMutation = () => {
    const queryClient = useQueryClient();

    // useMutation - patch todo (toggle isDone)
    const { mutate: toggleTodoDoneMutation } = useMutation({
        mutationFn: async ({ id, isDone }: { id: Todo['id']; isDone: Todo['isDone'] }) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, isDone })
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
                }
            }
        );

    return handleToggleTodoDone;
};

export default useToggleDoneMutation;
