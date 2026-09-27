'use client';
import { useState, useEffect } from 'react';
import WorkoutCard from './WorkoutCard';
import { Workout } from '@/context/FitLogContext';

export default function Library() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.abcz.workers.dev/api/fitlog')
            .then((res) => res.json())
            .then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-24 text-center text-[#ccff00] font-mono animate-pulse">
                Loading workouts...
            </div>
        );
    }

    return (
        <section id="library" className="px-6 py-16 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">THE LIBRARY</h2>
                    <p className="text-neutral-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
}