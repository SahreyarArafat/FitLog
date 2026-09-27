'use client';
import { useState } from 'react';
import { useFitLog, Workout } from '@/context/FitLogContext';
import Link from 'next/link';

export default function MyPlanPage() {
    const { plan, saved, removeFromPlan, toggleDone, removeFromSaved } = useFitLog();
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
    const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

    const totalMinutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = plan.reduce((acc, curr) => acc + (curr.caloriesBurned ?? (curr as any).caloriesBurned ?? 0), 0);

    // Sorting helper function
    const sortWorkouts = (items: Workout[]) => {
        return [...items].sort((a, b) => {
            const calA = a.caloriesBurned ?? (a as any).caloriesBurned ?? 0;
            const calB = b.caloriesBurned ?? (b as any).caloriesBurned ?? 0;

            if (sortBy === 'duration') return a.duration - b.duration;
            if (sortBy === 'calories') return calB - calA;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });
    };

    const sortedPlan = sortWorkouts(plan);
    const sortedSaved = sortWorkouts(saved);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 text-white min-h-[80vh]">
            <h1 className="text-3xl font-black uppercase tracking-wide">MY PLAN</h1>
            <p className="text-neutral-400 text-sm mt-1 mb-8">Cap of five lifts for today. Finish them, then load more.</p>

            {/* Metrics Summary Row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <p className="text-xs text-neutral-400">Exercises</p>
                    <p className="text-2xl font-black text-[#ccff00] mt-1">{plan.length}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <p className="text-xs text-neutral-400">Minutes</p>
                    <p className="text-2xl font-black text-[#ccff00] mt-1">{totalMinutes}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <p className="text-xs text-neutral-400">Calories</p>
                    <p className="text-2xl font-black text-[#ccff00] mt-1">{totalCalories}</p>
                </div>
            </div>

            {/* Tabs & Sort Dropdown Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-8">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('plan')}
                        className={`font-bold text-sm pb-2 border-b-2 transition-colors ${activeTab === 'plan' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-neutral-400'
                            }`}
                    >
                        Today's Plan
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`font-bold text-sm pb-2 border-b-2 transition-colors ${activeTab === 'saved' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-neutral-400'
                            }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-xs text-neutral-400">Sort By:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                    >
                        <option value="duration" className="bg-neutral-900">Duration</option>
                        <option value="calories" className="bg-neutral-900">Calories</option>
                        <option value="rating" className="bg-neutral-900">Rating</option>
                    </select>
                </div>
            </div>

            {/* Content List */}
            {activeTab === 'plan' ? (
                sortedPlan.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4">
                        {sortedPlan.map((item) => (
                            <div key={item.id} className={`flex items-center justify-between bg-neutral-900 border ${item.completed ? 'border-[#ccff00]/40 opacity-75' : 'border-neutral-800'} p-4 rounded-xl`}>
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div>
                                        <h3 className={`font-bold text-sm ${item.completed ? 'line-through text-neutral-400' : 'text-white'}`}>{item.name}</h3>
                                        <p className="text-xs text-neutral-400 mt-1">{item.equipment}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/workouts/${item.id}`} className="text-xs bg-neutral-800 px-3 py-1.5 rounded-lg hover:bg-neutral-700">View Details</Link>
                                    <button onClick={() => toggleDone(item.id)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${item.completed ? 'bg-[#ccff00] text-black' : 'border border-[#ccff00] text-[#ccff00]'}`}>
                                        {item.completed ? 'Done ✓' : 'Mark as Done'}
                                    </button>
                                    <button onClick={() => removeFromPlan(item.id)} className="text-neutral-500 hover:text-red-400 px-2 font-bold">✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                sortedSaved.length === 0 ? (
                    // <div className="text-center py-16 text-neutral-500">No saved workouts yet.</div>
                    <EmptyState />

                ) : (
                    <div className="space-y-4">
                        {sortedSaved.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{item.name}</h3>
                                        <p className="text-xs text-neutral-400 mt-1">{item.equipment}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={`/workouts/${item.id}`} className="text-xs bg-neutral-800 px-3 py-1.5 rounded-lg hover:bg-neutral-700">View Details</Link>
                                    <button onClick={() => removeFromSaved(item.id)} className="text-neutral-500 hover:text-red-400 px-2 font-bold">✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </main>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-24 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
            <h2 className="text-xl font-black uppercase text-white mb-2">NOTHING HERE YET</h2>
            <p className="text-neutral-400 text-sm mb-6">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90">
                Go to workouts
            </Link>
        </div>
    );
}