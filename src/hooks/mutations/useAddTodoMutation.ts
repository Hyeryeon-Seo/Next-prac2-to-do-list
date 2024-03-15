import { NewTodo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const useAddTodoMutation = () => {
    const queryClient = useQueryClient();

    // useMutation - add todo
    const { mutateAsync: newTodoMutation } = useMutation({
        mutationFn: async (newTodo: NewTodo) => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });
        }
    });

    const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const contents = formData.get('contents') as string;

        if (!title.trim() || !contents.trim()) {
            return toast.warning('제목과 내용 모두 입력해주세요! ◡‿◡ ');
        }
        e.currentTarget.reset(); // 아래에 await 써준 경우 reset 위로 올려야
        await newTodoMutation(
            { title, contents },
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
        toast.success('등록되었습니다! ( ˶ˆ ᗜ ˆ˵ )');
    };

    return handleSubmitTodo;
};

export default useAddTodoMutation;
