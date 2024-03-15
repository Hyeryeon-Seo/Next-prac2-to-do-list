import Link from 'next/link';

export const NavBar = () => {
    return (
        <nav className="flex gap-10 border-b-2 border-gray-300/80 bg-rose-200/20 p-5 font-bold">
            <Link href={`/`} className="hover:text-green-900/90">
                Home
            </Link>
            <Link href={`/about`} className="hover:text-green-900/90">
                About
            </Link>
            <Link href={`/report`} className="hover:text-green-900/90">
                Report
            </Link>
            <Link href={`/todos-csr`} className="hover:text-green-900/90">
                To-Dos-CSR
            </Link>
            <Link href={`/todos-ssr`} className="hover:text-green-900/90">
                To-Dos-SSR
            </Link>
        </nav>
    );
};
