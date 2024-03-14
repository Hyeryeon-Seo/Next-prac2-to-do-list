"use client"; // 클라이언트 컴포넌트 CSR

import type { NewTodo, Todo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NotFoundPage from "../not-found";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/Button";
import TodoItem from "@/components/TodoItem";
import useTodo from "@/hooks/TodoList.hooks";

const TodosCSRPage = () => {
  // TODO 컴포넌트 분리 / axios... 변수 타입 적어보기
  const queryClient = useQueryClient();
  const router = useRouter();
  // useState를 꼭 써야 하나? title, contents .. (input  => input name 활용하기
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const toggleTodo = useTodo();
  //   useEffect(() => {
  //     toggleTodo({ id: "e52c", isDone: true });
  //   }, []);

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    // TODO hook 으로 만들어보기
    queryKey: ["todos"],
    queryFn: async () => {
      // axios 사용해보기
      const { data } = await axios.get(`http://localhost:3000/api/todos`); // route handler 활용
      return data.todos;
    },
  });

  // useMutation - add todo
  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const todo = await response.json();
      return todo;
    },
  });

  // useMutation - patch todo (toggle isDone)
  //   const toggleDoneMutation = useMutation({
  //     mutationFn: async ({
  //       id,
  //       isDone,
  //     }: {
  //       id: Todo["id"];
  //       isDone: Todo["isDone"];
  //     }) => {
  //       const response = await fetch(`http://localhost:3000/api/todos`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id, isDone }),
  //       });
  //       const todo = await response.json();
  //       return todo;
  //     },
  //   });

  // useMutation - delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: Todo["id"]) => {
      const response = await fetch(`http://localhost:3000/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const todo = await response.json();
      return todo;
    },
  });

  const handleReportClick = () => {
    router.push("/report");
  };

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newTodoMutation.mutate(
      { title, contents },
      {
        onSuccess: () => {
          setTitle("");
          setContents("");
          queryClient.invalidateQueries({
            queryKey: ["todos"],
          });
        },
      },
    );
  };

  if (isLoading) {
    return <div>로딩 중입니다 .. !</div>;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col items-center m-20">
      <h1 className="font-bold text-3xl mb-3">My To-Do List</h1>
      <p className="mb-10">See all your Todos and Make them all Done!</p>
      <CustomButton
        onClick={handleReportClick}
        classNameProperty="w-[15rem] bg-rose-800/30 hover:bg-green-900/30"
      >
        {`> To-Do Report 보러가기`}
      </CustomButton>
      <section className="mt-20 mb-20 flex flex-col gap-5">
        <form onSubmit={handleSubmitTodo}>
          <div className="flex gap-20">
            <div className="flex items-center gap-5">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-neutral-700 h-10 p-2"
              />
            </div>
            <div className={`flex items-center gap-5`}>
              <label htmlFor="contents">Contents</label>
              <input
                id="contents"
                type="text"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-80 text-neutral-700 h-10 p-2"
              />
            </div>
            <CustomButton
              type="submit"
              classNameProperty="w-[12rem] bg-rose-800/30 hover:bg-pink-300/70"
            >
              Add Todo
            </CustomButton>
          </div>
        </form>
      </section>
      <section className="flex flex-wrap gap-10 justify-center">
        {todos.map((todo: Todo) => {
          return (
            // <TodoItem todo={todo} />
            <div
              key={todo.id}
              className="flex flex-col gap-1 bg-[#504b4b] text-gray-300 p-8 rounded hover:scale-105 transform delay-100
            			w-3/12 min-h-[15rem] shadow-sm shadow-slate-800"
            >
              <h2 className="text-lg font-bold">{todo.title}</h2>
              <p>{todo.contents}</p>
              <p className="mt-3">
                {todo.isDone ? "🥰 Done" : "🤔 Not Done Yet"}
              </p>
              <div className="flex justify-between">
                <CustomButton
                  onClick={() =>
                    toggleTodo({ id: todo.id, isDone: todo.isDone })
                  }
                  classNameProperty="bg-sky-200/70 hover:bg-sky-200/80 text-[#504b4b] px-6"
                >
                  완료 / 완료취소
                </CustomButton>
                <CustomButton
                  onClick={() =>
                    deleteTodoMutation.mutate(todo.id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["todos"],
                        });
                      },
                    })
                  }
                  classNameProperty="bg-rose-200/70 hover:bg-rose-200/80 text-[#504b4b] px-6"
                >
                  삭제
                </CustomButton>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TodosCSRPage;
