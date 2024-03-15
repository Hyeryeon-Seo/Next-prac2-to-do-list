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
                <Image
                    src="/calmnote_paico-oficial-unsplash.jpg"
                    alt="notebook-pen"
                    width={6000}
                    height={4000}
                    className="w-screen bg-cover"
                />
            </div>
        </main>
    );
}
