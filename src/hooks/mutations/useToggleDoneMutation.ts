'use client';

import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useToggleDoneMutation = () => {
    // 여기서 id,isDone 인자를 받는게 아니라, 이렇게 만든 handleToggleTodoDone 을 내보내면 거기서 사용할 거임
    // NOTE useMutation 만들고 그걸 사용해 mutate하는 handleToggle..함수 만들어서 내보내기 => useTodo훅에서 이런 toggle, delete 등 함수 다 받아서 한꺼번에 페이지 컴포넌트로 넘기기
    const queryClient = useQueryClient();

    // useMutation - patch todo (toggle isDone)
    const { mutate: toggleTodoDoneMutation } = useMutation({
        mutationFn: async ({ id, isDone }: { id: Todo['id']; isDone: Todo['isDone'] }) => {
            const response = await fetch(`http://localhost:3000/api/todos`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, isDone })
            });
            const todo = await response.json();
            return todo;
        }
    });

    const handleToggleTodoDone = (
        { id, isDone }: { id: Todo['id']; isDone: Todo['isDone'] } // async 필요?
    ) =>
        toggleTodoDoneMutation(
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
