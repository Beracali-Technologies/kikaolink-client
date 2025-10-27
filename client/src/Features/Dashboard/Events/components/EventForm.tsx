import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { TEvent, TEventCreate } from '@/types';

interface EventFormProps {
    event?: TEvent | null;
    onFormSubmit?: (data: any) => void;
    isSubmitting?: boolean;
    mode: 'create' | 'edit';
}

const EventForm: React.FC<EventFormProps> = ({ event, onFormSubmit = () => {}, isSubmitting = false, mode }) => {
    const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors } } = useForm<TEventCreate>({
        mode: 'onChange'
    });

    const startDate = watch('startDate');
    const endDate = watch('endDate');
    const startTime = watch('startTime');
    const endTime = watch('endTime');

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
                location: typeof event.location === 'string'
                    ? event.location
                    : event.location?.name || '',
            });
        }
    }, [event, reset, mode]);

    // Enhanced date validation with time consideration
    useEffect(() => {
        if (startDate && endDate) {
            const startDateTime = new Date(`${startDate}T${startTime || '00:00'}`);
            const endDateTime = new Date(`${endDate}T${endTime || '00:00'}`);

            if (startDateTime > endDateTime) {
                setError('startDate', {
                    type: 'manual',
                    message: 'Start date/time cannot be after end date/time.'
                });
                setError('endDate', {
                    type: 'manual',
                    message: 'End date/time cannot be before start date/time.'
                });
            } else {
                clearErrors(['startDate', 'endDate']);
            }
        } else {
            clearErrors(['startDate', 'endDate']);
        }
    }, [startDate, endDate, startTime, endTime, setError, clearErrors]);

    // Prevent form submission when there are date validation errors
    const onSubmit: SubmitHandler<TEventCreate> = async (data) => {
        // Final validation check before submission
        const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
        const endDateTime = new Date(`${data.endDate}T${data.endTime}`);

        if (startDateTime > endDateTime) {
            setError('startDate', {
                type: 'manual',
                message: 'Start date/time cannot be after end date/time.'
            });
            setError('endDate', {
                type: 'manual',
                message: 'End date/time cannot be before start date/time.'
            });
            return; // Prevent form submission
        }

        await onFormSubmit(data);
    };

    // Check if form has validation errors to disable submit button
    const hasValidationErrors = Object.keys(errors).length > 0;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
            {/* Form Fields */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title*</label>
                <input
                    id="title"
                    {...register("title", { required: "Event title is required." })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            {/* Location Field */}
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    id="location"
                    {...register("location", { required: "Location is required." })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
            </div>

            {/* Start Date & Time */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date*</label>
                    <input
                        type="date"
                        id="startDate"
                        {...register("startDate", {
                            required: "Start date is required.",
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.startDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time*</label>
                    <input
                        type="time"
                        id="startTime"
                        {...register("startTime", {
                            required: "Start time is required."
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.startTime && (
                        <p className="mt-1 text-sm text-red-500">{errors.startTime.message}</p>
                    )}
                </div>
            </div>

            {/* End Date & Time */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date*</label>
                    <input
                        type="date"
                        id="endDate"
                        {...register("endDate", {
                            required: "End date is required.",
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.endDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time*</label>
                    <input
                        type="time"
                        id="endTime"
                        {...register("endTime", {
                            required: "End time is required."
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.endTime && (
                        <p className="mt-1 text-sm text-red-500">{errors.endTime.message}</p>
                    )}
                </div>
            </div>

            {/* Form-level error summary (optional) */}
            {hasValidationErrors && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">
                        Please fix the validation errors above before submitting.
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t">
                <button
                    type="submit"
                    disabled={isSubmitting || hasValidationErrors}
                    className="flex items-center justify-center min-w-[150px] bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <FiLoader className="animate-spin mr-2" />
                            {mode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                    ) : (
                        <span>{mode === 'create' ? 'Create & Continue' : 'Save Changes'}</span>
                    )}
                </button>
            </div>
        </form>
    );
};

export default EventForm;
