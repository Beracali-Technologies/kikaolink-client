import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { TEvent, TEventCreate } from '@/types';

interface EventFormProps {
    event?: TEvent | null; // Passing existing event to switch to "edit" mode
    onFormSubmit?: (data: any) => void; //making it optional
    isSubmitting?: boolean;  //making it optional
    mode: 'create' | 'edit'; // Explicitly setting the mode
}

const EventForm: React.FC<EventFormProps> = ({ event, onFormSubmit = () => {}, isSubmitting = false, mode }) => {
    const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors } } = useForm<TEventCreate>({
        // Set mode to 'onChange' to enable real-time validation across all fields
        mode: 'onChange'
    });

    const startDate = watch('startDate'); // Watch startDate for changes
    const endDate = watch('endDate');     // Watch endDate for changes

    useEffect(() => {
        if (event && mode == 'edit') {
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);

            reset({
                title: event.title,
                startDate: startDate.toISOString().split('T')[0],
                startTime: startDate.toTimeString().substring(0, 5),
                endDate: endDate.toISOString().split('T')[0],
                endTime: endDate.toTimeString().substring(0, 5),
                location:
                          typeof event.location === 'string'
                            ? event.location
                            : event.location?.name || '',
                                  });
        }
    }, [event, reset, mode]);

    // This useEffect will re-run whenever startDate or endDate changes
    useEffect(() => {
        // Only run if both dates have been selected
        if (startDate && endDate) {
            if (startDate > endDate) {
                setError('startDate', { type: 'manual', message: 'Start date cannot be after end date.' });
                setError('endDate', { type: 'manual', message: 'End date cannot be before start date.' });
            } else {
                // If dates become valid, clear any previous errors
                clearErrors('startDate');
                clearErrors('endDate');
            }
        } else {
             // If one of the dates is cleared, also clear the cross-date errors
             clearErrors('startDate');
             clearErrors('endDate');
        }
    }, [startDate, endDate, setError, clearErrors]); // Depend on startDate, endDate, setError, clearErrors


    const onSubmit: SubmitHandler<TEventCreate> = async (data) => {
        await onFormSubmit(data);
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

            {/* Location Field */}
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input id="location" {...register("location", { required: "Location is required." })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />

                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="startDate">Start Date*</label>
                    <input type="date" id="startDate" {...register("startDate", {
                        required: "Start date is required.",
                    })}
                        className="mt-1 block w-full p-2 border rounded-md" />
                    {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
                </div>
                <div>
                    <label htmlFor="startTime">Start Time*</label>
                    <input type="time" id="startTime" {...register("startTime", { required: "Start time is required." })} className="mt-1 block w-full p-2 border rounded-md" />
                    {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime.message}</p>}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="endDate">End Date*</label>
                    <input type="date" id="endDate" {...register("endDate", {
                        required: "End date is required.",
                    })}
                        className="mt-1 block w-full p-2 border rounded-md" />
                    {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>}
                </div>
                <div>
                    <label htmlFor="endTime">End Time*</label>
                    <input type="time" id="endTime" {...register("endTime", { required: "End time is required." })} className="mt-1 block w-full p-2 border rounded-md" />
                    {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime.message}</p>}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t">
                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center min-w-[150px] bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                    {isSubmitting ?
                            (
                                <>
                                    <FiLoader className="animate-spin" />
                                        {mode === 'create' ? 'Creating' : 'Updating'}
                                </>
                             )
                             : (
                        <span>{mode === 'create' ? 'Create & Continue' : 'Save Changes'}</span>
                    )}
                </button>
            </div>
        </form>
    );
};

export default EventForm;
