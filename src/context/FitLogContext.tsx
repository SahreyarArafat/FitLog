'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export type Workout = {
    id: string | number;
    name: string;
    category: string[];
    equipment: string;
    duration: number; // in mins
    caloriesBurned: number;
    rating: number;
    image: string;
    description: string;
    difficulty?: string;
    sets?: number;
    reps?: string;
    instructions?: string[];
    completed?: boolean;
};

type FitLogContextType = {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: string | number) => void;
    toggleDone: (id: string | number) => void;
    addToSaved: (workout: Workout) => void;
    removeFromSaved: (id: string | number) => void;
    toast: string | null;
    showToast: (msg: string) => void;
};

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [toastState, setToastState] = useState<string | null>(null);

    useEffect(() => {
        const savedPlan = localStorage.getItem('fitlog_plan');
        const savedList = localStorage.getItem('fitlog_saved');
        if (savedPlan) setPlan(JSON.parse(savedPlan));
        if (savedList) setSaved(JSON.parse(savedList));
    }, []);

    useEffect(() => {
        localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {
        localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    }, [saved]);

    const showToast = (msg: string) => {
        setToastState(msg);
        toast(msg, {
            style: {
                background: '#ccff00',
                color: '#1a1818',
                border: '1px solid #333',
                fontSize: '12px',
                fontWeight: 'bold',
            },
            icon: '♦️',
        });
    };

    const addToPlan = (workout: Workout) => {
        if (plan.length >= 5) {
            showToast('Plan is full! Cap is 5 lifts.');
            return;
        }
        if (plan.some((item) => item.id === workout.id)) {
            showToast('Workout already in today\'s plan!');
            return;
        }
        setPlan([...plan, { ...workout, completed: false }]);
        showToast('Added to today\'s plan');
    };

    const removeFromPlan = (id: string | number) => {
        setPlan(plan.filter((item) => item.id !== id));
        showToast('Removed from plan');
    };

    const toggleDone = (id: string | number) => {
        setPlan(
            plan.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
        );
        showToast('Workout status updated');
    };

    const addToSaved = (workout: Workout) => {
        if (saved.some((item) => item.id === workout.id)) {
            showToast('Already saved for later!');
            return;
        }
        setSaved([...saved, workout]);
        showToast('Saved for later');
    };

    const removeFromSaved = (id: string | number) => {
        setSaved(saved.filter((item) => item.id !== id));
        showToast('Removed from saved');
    };

    return (
        <FitLogContext.Provider
            value={{ plan, saved, addToPlan, removeFromPlan, toggleDone, addToSaved, removeFromSaved, toast: toastState, showToast }}
        >
            {children}
        </FitLogContext.Provider>
    );
};

export const useFitLog = () => {
    const context = useContext(FitLogContext);
    if (!context) throw new Error('useFitLog must be used within a FitLogProvider');
    return context;
};