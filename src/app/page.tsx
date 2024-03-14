import Image from "next/image";

export default function Home() {
  return (
    <main className="flex">
      {/* // imn-h-screen */}
      {/* <div className="flex justify-between"> */}
      <div className="relative w-full h-svh overflow-hidden">
        <div className="flex flex-col  gap-32 mt-20 ml-20 absolute inset-x-0">
          <p className="text-6xl font-bold">Welcome to To Do List !</p>
          <pre className="text-5xl leading-normal font-bold text-gray-100/70">
            {`Post To-Dos 
and Check your To-Do Report`}
          </pre>
          <p className=" text-gray-200/30 mt-28">
            Copyright © 2024 NBCamp Ryeon
          </p>
        </div>
        {/* <div className="bg-cover bg-blend-darken bg-black bg-opacity-80"> */}
        <img
          //https://images.unsplash.com/photo-1578852612716-854e527abf2e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
          src="https://images.unsplash.com/photo-1606327054629-64c8b0fd6e4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="notebook-pen"
          // width={1000}
          className="w-screen bg-cover bg-blend-darken bg-black bg-opacity-20"
        />
      </div>
    </main>
  );
}
