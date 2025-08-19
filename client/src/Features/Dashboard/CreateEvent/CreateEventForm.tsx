import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// type for our form data for better type safety
type FormValues = {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
};

//  props for the component, including the submission callback
interface CreateEventFormProps {
    onFormSubmit: (data: FormValues) => void;
    isSubmitting: boolean;
}


const CreateEventForm: React.FC<CreateEventFormProps> = ({ onFormSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    // This makes sure we pass the strongly-typed data to the parent
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Submitting Event Info:", data);
        onFormSubmit(data); // Pass data up to the parent to handle next steps
    };

    return (
        // The form content, now neatly separated
         <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-4">
                Basic Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title*</label>
                    <input
                        id="title"
                        {...register("title", { required: "Event title is required." })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div>
                         <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date*</label>
                         <input
                            type="date"
                            id="startDate"
                            {...register("startDate", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                         />
                     </div>
                     <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time*</label>
                        <input
                            type="time"
                            id="startTime"
                            {...register("startTime", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                     </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div>
                         <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date*</label>
                         <input
                            type="date"
                            id="endDate"
                            {...register("endDate", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                         />
                     </div>
                     <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time*</label>
                        <input
                            type="time"
                            id="endTime"
                            {...register("endTime", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                     </div>
                 </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            disabled={isSubmitting}>
                            
                            {isSubmitting ? 'Creating...' : 'Create Event'}

                    </button>
                </div>
            </form>
         </div>
    );
};


export default CreateEventForm;
