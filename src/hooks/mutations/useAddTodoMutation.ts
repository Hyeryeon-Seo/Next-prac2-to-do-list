import { NewTodo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const useAddTodoMutation = () => {
    const queryClient = useQueryClient();

    // useMutation - add todo
    const { mutate: newTodoMutation } = useMutation({
        mutationFn: async (newTodo: NewTodo) => {
            await fetch(`http://localhost:3000/api/todos`, {
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
                }
            }
        );
    };

    return handleSubmitTodo;
};

export default useAddTodoMutation;
