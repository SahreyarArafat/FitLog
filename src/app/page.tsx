'use client';
import Library from '@/components/Library';
import Hero from '@/components/Hero';

export default function HomePage() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col justify-between">

            <main>
                {/* Hero / Banner Section */}
                <Hero />
                {/* Library Section (Includes Sorting Dropdown & Cards Grid) */}
                <Library />
            </main>

        </div>
    );
}