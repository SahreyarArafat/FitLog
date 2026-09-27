'use client';


export default function Hero() {
    return (
        <section className="mt-8 border border-neutral-800 rounded-2xl bg-neutral-900 px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-neutral-800/60">
            <div className="pl-6 ">
                <p className="text-[#ccff00] font-mono text-xs font-bold tracking-widest uppercase mb-3">
                    WORKOUT LIBRARY
                </p>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-4 font-sans">
                    TRAIN WITH INTENT. LOG EVERY SET.
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                </p>
                <a
                    href="#library"
                    className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                    BROWSE WORKOUTS
                </a>
            </div>

            <div className="flex justify-center lg:justify-end">
                <div className=" w-full max-w-md flex items-center justify-center">
                    {/* Hero Image */}
                    <img
                        src="/banner.png"
                        alt="Workout Banner"
                        className="w-full h-full object-cover rounded-xl opacity-80"
                    />
                </div>
            </div>
        </section>
    );
}