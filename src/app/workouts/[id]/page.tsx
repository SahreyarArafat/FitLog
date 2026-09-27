'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFitLog, Workout } from '@/context/FitLogContext';
import Link from 'next/link';

export default function WorkoutDetailPage() {
    const params = useParams();
    const { id } = params;
    const { addToPlan, addToSaved } = useFitLog();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setWorkout(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen text-[#ccff00] flex items-center justify-center font-mono">
                Loading workout details...
            </div>
        );
    }

    if (!workout) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
                <Link href="/" className="bg-[#ccff00] text-black font-bold px-4 py-2 rounded-xl text-xs">
                    Back to Home
                </Link>
            </div>
        );
    }

    const rawCategories = (workout as any).muscleGroups || workout.category;
    const categories = Array.isArray(rawCategories) ? rawCategories : rawCategories ? [rawCategories] : [];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col justify-between">

            <main className="max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side — Visual / Media */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-4">
                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="w-full h-[400px] sm:h-[500px] object-cover rounded-xl"
                        />
                    </div>

                    {/* Right Side — Details & Actions */}
                    <div>


                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide mb-3">
                            {workout.name}
                        </h1>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            {workout.description || "A compound movement that builds strength, muscle mass, and power from a stable platform."}
                        </p>
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {categories.map((cat: string, idx: number) => (
                                <span key={idx} className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded-lg uppercase">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        {/* Key Specs Table / Panel */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-8">
                            <div className="grid grid-cols-2 divide-x divide-y divide-neutral-800 text-xs">
                                <SpecItem label="EQUIPMENT" value={workout.equipment} />
                                <SpecItem label="DIFFICULTY" value={(workout as any).difficulty || "Intermediate"} />
                                <SpecItem label="SETS" value={(workout as any).sets || "4"} />
                                <SpecItem label="REPS" value={(workout as any).reps || "6-8"} />
                                <SpecItem label="DURATION" value={`${workout.duration} min`} />
                                <SpecItem label="CALORIES" value={`${workout.caloriesBurned} kcal`} />
                                <SpecItem label="RATING" value={`⭐ ${workout.rating}`} />
                            </div>
                        </div>

                        {/* Instructions Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-black uppercase tracking-wider mb-3">
                                INSTRUCTIONS
                            </h3>
                            <ol className="space-y-2 text-xs text-neutral-300 list-decimal list-inside leading-relaxed">
                                {((workout as any).instructions || [
                                    "Set up the required equipment securely with proper weight.",
                                    "Maintain a rigid core and stable posture throughout the lift.",
                                    "Execute the movement smoothly through a full range of motion.",
                                    "Control the negative descent back to the starting position."
                                ]).map((step: string, index: number) => (
                                    <li key={index} className="py-1">
                                        <span className="text-white font-medium">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Call-to-Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => addToPlan(workout)}
                                className="flex-1 bg-[#ccff00] text-black font-bold text-xs py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add to today's plan
                            </button>
                            <button
                                onClick={() => addToSaved(workout)}
                                className="flex-1 bg-neutral-900 border border-neutral-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Save for later
                            </button>
                        </div>

                    </div>
                </div>
            </main>


        </div>
    );
}

function SpecItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="p-3.5">
            <p className="text-neutral-500 font-bold text-[10px] uppercase">{label}</p>
            <p className="text-white font-semibold mt-0.5">{value}</p>
        </div>
    );
}