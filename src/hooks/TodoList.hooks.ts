// 'use client';
import React from 'react';
import useToggleDoneMutation from './mutations/useToggleDoneMutation';
import useDeleteTodoMutation from './mutations/useDeleteTodoMutation';
import useAddTodoMutation from './mutations/useAddTodoMutation';

const useTodo = () => {
    // NOTE 이걸 실행시켜서 useMutation도 하고 (백엔드-DB업뎃), handle..함수를 통해 화면업뎃렌더링도 함
    const handleToggleTodoDone = useToggleDoneMutation();
    const handleDeleteTodo = useDeleteTodoMutation();
    const handleSubmitTodo = useAddTodoMutation();

    return { handleSubmitTodo, handleToggleTodoDone, handleDeleteTodo };
};

export default useTodo;
