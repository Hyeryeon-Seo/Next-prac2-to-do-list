export interface Todo {
    id: string;
    title: string;
    contents: string;
    isDone: boolean;
}

export type NewTodo = Pick<Todo, 'title' | 'contents'>; // interface는 Pick 사용 X

export interface CompanyInfo {
    image: string;
    name: string;
    description: string;
}
