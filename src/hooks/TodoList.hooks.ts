import React from "react";
import useToggleDoneMutation from "./mutations/useToggleDoneMutation";

const useTodo = () => {
  const { handleToggleTodoDone } = useToggleDoneMutation();
  // NOTE 이걸 실행시켜서 useMutation도 하고 (백엔드-DB업뎃), handle..함수를 통해 화면업뎃렌더링도 함
  return handleToggleTodoDone;
};

export default useTodo;
