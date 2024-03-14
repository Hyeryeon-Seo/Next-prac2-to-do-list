"use client"; // 클라이언트 컴포넌트 CSR

import type { NewTodo, Todo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import NotFoundPage from "../not-found";
import { useRouter } from "next/navigation";

const TodosCSRPage = () => {
	// TODO 컴포넌트 분리 / axios... 변수 타입 적어보기
	const queryClient = useQueryClient();
	const router = useRouter();
	// useState를 꼭 써야 하나? title, contents .. (input  => input name 활용하기
	const [title, setTitle] = useState("");
	const [contents, setContents] = useState("");

	const {
		data: todos, // [{},{},..]
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
			const { data } = await axios.post(
				`http://localhost:3000/api/todos`,
				newTodo,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return data.todo;
		},
	});

	// useMutation - patch todo (toggle isDone)
	const toggleDoneMutation = useMutation({
		// mu,
	});

	// useMutation - delete todo
	const deleteTodoMutation = useMutation({
		mutationFn: async (id: Todo["id"]) => {
			// console.log(`🔮: ${id}`);
			const response = await fetch(`http://localhost:3000/api/todos`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(id),
			});
			const todo = await response.json();
			console.dir(`🔮: ${todo}`);
			return todo;
		},
	});

	const handleReportClick = () => {
		router.push("/report");
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
			<p>See all your Todos and Make them all Done!</p>

			<section className="mt-10 mb-20 flex flex-col gap-5">
				<h2>새로운 To Do 추가하기</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						newTodoMutation.mutate(
							{ title, contents },
							{
								onSuccess: () => {
									setTitle("");
									setContents("");
									queryClient.invalidateQueries({
										// useMutation 활용
										queryKey: ["todos"],
									});
								},
							}
						);
					}}
				>
					<div className="flex gap-20">
						<div className="flex items-center gap-5">
							<label htmlFor="title">Title</label>
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="text-pink-600 h-10"
							/>
						</div>
						<div className={`flex items-center gap-5`}>
							<label htmlFor="contents">Contents</label>
							<input
								id="contents"
								type="text"
								value={contents}
								onChange={(e) => setContents(e.target.value)}
								className="text-purple-700/70 w-80 h-10"
							/>
						</div>
						<button
							type="submit"
							className="border-2 border-purple-400/30 bg-purple-400/30 p-2 rounded-lg w-40 hover:bg-pink-300/70"
						>
							Add Todo
						</button>
					</div>
				</form>
			</section>

			<button onClick={handleReportClick}>{`> To-Do Report 보러가기`}</button>

			{todos.map((todo: Todo) => {
				return (
					<div
						key={todo.id}
						className="bg-pink-100 border border-pink-200 text-pink-500 p-8 mb-5 rounded hover:scale-105 w-10/12 transform delay-100"
					>
						<h2 className="text-lg font-bold">{todo.title}</h2>
						<p>{todo.contents}</p>
						{todo.isDone ? <p>🥰 Done</p> : <p>🤔 Not Done Yet</p>}
						<button className="inline-block rounded bg-purple-300 px-6 pb-2 pt-2.5 text-xs font-medium ">
							완료/완료취소
						</button>
						<button
							onClick={() =>
								deleteTodoMutation.mutate(todo.id, {
									onSuccess: () => {
										queryClient.invalidateQueries({
											queryKey: ["todos"],
										});
									},
								})
							}
						>
							삭제
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default TodosCSRPage;
