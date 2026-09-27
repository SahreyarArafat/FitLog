'use client';
import Link from 'next/link';
import { Workout } from '@/context/FitLogContext';

export default function WorkoutCard({ workout }: { workout: Workout }) {
    // Handle both 'category' and 'muscleGroups' field possibilities from the API
    const rawCategories = (workout as any).muscleGroups || workout.category;
    const categories = Array.isArray(rawCategories)
        ? rawCategories
        : rawCategories ? [rawCategories] : [];

    return (
        <div className="bg-[#121212] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#ccff00]/40 transition-all flex flex-col justify-between group">
            <div>
                <div className="overflow-hidden ">
                    <img
                        src={workout.image}
                        alt={workout.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-5">
                    {/* Category Pill Tags matching the Figma design */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {categories.map((cat: string, idx: number) => (
                            <span
                                key={idx}
                                className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-white font-black text-base uppercase tracking-wide mb-1">
                        {workout.name}
                    </h3>
                    <p className="text-neutral-400 text-xs">
                        {workout.equipment}
                    </p>
                </div>
            </div>

            {/* Stats row with precise SVG vector icons matching design */}
            <div className="px-5 pb-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span className="flex items-center gap-1.5 text-neutral-400">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                    <span className="text-neutral-300">{workout.duration} min</span>
                </span>

                <span className="flex items-center gap-1.5 text-neutral-400">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                    <span className="text-neutral-300">{workout.caloriesBurned} kcal</span>
                </span>

                <span className="flex items-center gap-1.5 text-neutral-400">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-neutral-300">{workout.rating}</span>
                </span>
            </div>

            {/* Hidden or card wrapper link behavior depending on design. Clicking anywhere or card structure */}
            <div className="px-5 pb-5 pt-0">
                <Link
                    href={`/workouts/${workout.id}`}
                    className="block w-full text-center bg-neutral-800 hover:bg-[#ccff00] hover:text-black transition-colors text-xs font-bold py-2.5 rounded-xl text-white"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}