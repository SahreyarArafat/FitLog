export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-neutral-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
                <img src="/logo.png" alt="FitLog Logo" className="w-4 h-4 object-contain" /> FITLOG
            </div>
            <div>
                © 2026 FitLog — Workout Library. Train hard, log honest.
            </div>
        </footer>
    );
}