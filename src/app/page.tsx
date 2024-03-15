import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex">
            <div className="relative h-svh w-full overflow-hidden">
                <div className="absolute inset-x-0  ml-20 mt-20 flex flex-col gap-32">
                    <p className="text-6xl font-bold">Welcome to To Do List !</p>
                    <pre className="text-5xl font-bold leading-normal text-gray-100/70">
                        {`Post To-Dos 
and Check your To-Do Report`}
                    </pre>
                    <p className=" mt-28 text-gray-200/30">Copyright © 2024 NBCamp Ryeon</p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1606327054629-64c8b0fd6e4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="notebook-pen"
                    className="w-screen bg-cover"
                />
            </div>
        </main>
    );
}
