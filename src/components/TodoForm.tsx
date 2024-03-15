import CustomButton from './Button';
import useTodo from '@/hooks/TodoList.hooks';

const TodoForm = () => {
    const { handleSubmitTodo } = useTodo();

    return (
        <section className="mb-20 mt-20 flex flex-col gap-5">
            <form onSubmit={(e) => handleSubmitTodo(e)}>
                <div className="flex gap-20">
                    <div className="flex items-center gap-5">
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" name="title" className="h-10 p-2 text-neutral-700" />
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <label htmlFor="contents">Contents</label>
                        <input id="contents" type="text" name="contents" className="h-10 w-80 p-2 text-neutral-700" />
                    </div>
                    <CustomButton type="submit" classNameProperty="w-[12rem] bg-rose-800/30 hover:bg-pink-300/70">
                        Add Todo
                    </CustomButton>
                </div>
            </form>
        </section>
    );
};

export default TodoForm;
