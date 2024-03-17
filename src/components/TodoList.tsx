import { Todo } from '@/types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ title, todos, page }: { title: string; todos: Todo[]; page?: string }) => {
    return (
        <section className="mt-15 mb-24 flex min-h-[250px] w-[83rem] flex-col gap-5 pl-10">
            <p className="pl-2 text-2xl font-bold text-green-900/90">{title}</p>
            <hr className=" border-[0.5px] border-neutral-500/10" />
            <div className="flex flex-wrap gap-10 pt-5">
                {todos?.map((todo: Todo) => {
                    return <TodoItem todo={todo} page={page} key={todo.id} />;
                })}
            </div>
        </section>
    );
};

export default TodoList;
