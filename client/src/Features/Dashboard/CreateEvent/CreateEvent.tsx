import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateEvent: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        console.log("Creating event:", data);
        alert('Event created successfully (in console)! Redirecting...');
        // In a real app, the ID would come from the backend response
        const newEventId = "123-demo";
        navigate(`/dashboard/events/${newEventId}/info`);
    };

    return (
         <div>
             <h1 className="text-2xl font-bold text-dark-text mb-6">New Event</h1>
             <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
                <h2 className="text-lg font-semibold border-b pb-4">Basic Information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div>
                        <label className="text-sm font-medium">Event Title*</label>
                        <input {...register("title", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                    </div>
                     <div className="grid grid-cols-2 gap-6">
                         <div>
                             <label className="text-sm font-medium">Start Date*</label>
                             <input type="date" {...register("startDate", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                         </div>
                         <div>
                            <label className="text-sm font-medium">Start Time*</label>
                            <input type="time" {...register("startTime", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                         <div>
                             <label className="text-sm font-medium">End Date*</label>
                             <input type="date" {...register("endDate", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                         </div>
                         <div>
                            <label className="text-sm font-medium">End Time*</label>
                            <input type="time" {...register("endTime", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                         </div>
                     </div>
                     <div>
                        <label className="text-sm font-medium">Timezone*</label>
                        <input {...register("timezone", { required: true })} className="mt-1 w-full p-2 border rounded-md"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700">
                            Create Event
                        </button>
                    </div>
                </form>
             </div>
        </div>
    );
};

export default CreateEvent;
