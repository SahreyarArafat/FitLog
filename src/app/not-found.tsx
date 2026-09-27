import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 text-white bg-[#0a0a0a]">
            <h1 className="text-6xl font-black text-[#ccff00] mb-4">404</h1>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Page Not Found</h2>
            <p className="text-neutral-400 text-sm max-w-md mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="bg-[#ccff00] text-black font-bold text-xs px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
                Back to Home
            </Link>
        </main>
    );
}