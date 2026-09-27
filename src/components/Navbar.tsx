'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = useFitLog();

    return (
        <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-neutral-800 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-white font-black tracking-wider text-sm sm:text-base shrink-0">
                    <img src="/logo.png" alt="FitLog Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                    <span>FITLOG</span>
                </Link>

                {/* Middle Navigation Links (Hidden on small mobile screens, visible on md and up) */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className={`text-sm font-medium transition-colors ${pathname === '/'
                                ? 'text-[#ccff00] bg-[#1a2e05] px-3 py-1.5 rounded-full border border-[#ccff00]/30'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={`text-sm font-medium transition-colors ${pathname === '/my-plan'
                                ? 'text-[#ccff00] bg-[#1a2e05] px-3 py-1.5 rounded-full border border-[#ccff00]/30'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Right Badges / Status Counters */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-neutral-300 shrink-0">
                    <Link href="/my-plan" className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                        <span>Plan</span>
                        <span className="bg-[#ccff00] text-black px-2 py-0.2 rounded-full font-bold">
                            {plan.length}
                        </span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-1.5 border border-neutral-700 px-2.5 py-1 rounded-full hover:border-neutral-500">
                        <span>Saved</span>
                        <span className="text-white">{saved.length}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}