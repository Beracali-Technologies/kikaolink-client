import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { TEvent, TEventCreate } from '../../../types';

interface EventFormProps {
    event?: TEvent | null; // Passing existing event to switch to "edit" mode
    onFormSubmit?: (data: any) => void; //making it optional
    isSubmitting?: boolean;  //making it optional
    mode: 'create' | 'edit'; // Explicitly set the mode
}

const EventForm: React.FC<EventFormProps> = ({ event, onFormSubmit = () => {}, isSubmitting = false, mode }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TEventCreate>();

    useEffect(() => {
        if (event) { // Populate form if in edit mode
            reset({
                title: event.title,
                startDate: new Date(event.start_date).toISOString().split('T')[0],
                startTime: new Date(event.start_date).toTimeString().substring(0, 5),
                endDate: new Date(event.end_date).toISOString().split('T')[0],
                endTime: new Date(event.end_date).toTimeString().substring(0, 5),
            });
        }
    }, [event, reset]);

    const onSubmit: SubmitHandler<TEventCreate> = (data) => {
        onFormSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
            {/* Form Fields */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title*</label>
                <input id="title" {...register("title", { required: "Event title is required." })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="startDate">Start Date*</label>
                    <input type="date" id="startDate" {...register("startDate", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="startTime">Start Time*</label>
                    <input type="time" id="startTime" {...register("startTime", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="endDate">End Date*</label>
                    <input type="date" id="endDate" {...register("endDate", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="endTime">End Time*</label>
                    <input type="time" id="endTime" {...register("endTime", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t">
                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center min-w-[150px] bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                    {isSubmitting ? ( <FiLoader className="animate-spin" /> ) : (
                        <span>{mode === 'create' ? 'Create & Continue' : 'Save Changes'}</span>
                    )}
                </button>
            </div>
        </form>
    );
};

export default EventForm;
