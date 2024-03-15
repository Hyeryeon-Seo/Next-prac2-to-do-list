// 'use client';
import useToggleDoneMutation from './mutations/useToggleDoneMutation';
import useDeleteTodoMutation from './mutations/useDeleteTodoMutation';
import useAddTodoMutation from './mutations/useAddTodoMutation';

const useTodo = () => {
    const handleToggleTodoDone = useToggleDoneMutation();
    const handleDeleteTodo = useDeleteTodoMutation();
    const handleSubmitTodo = useAddTodoMutation();

    return { handleSubmitTodo, handleToggleTodoDone, handleDeleteTodo };
};

export default useTodo;
