"use client";

import { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodoMutation } = useMutation({
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

  const handleDeleteTodo = (id: Todo["id"]) => {
    deleteTodoMutation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      },
    });
  };

  return handleDeleteTodo;
};

export default useDeleteTodoMutation;
