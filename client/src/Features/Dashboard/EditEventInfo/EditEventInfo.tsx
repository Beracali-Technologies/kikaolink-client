import React from 'react';
import { useForm } from 'react-hook-form';

const EditEventInfo: React.FC = () => {
    // Mock default values for the form
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: '[Demo] Leadership Conference',
            startDate: '2024-05-17',
            startTime: '08:00',
            endDate: '2024-05-17',
            endTime: '17:00',
            timezone: '(GMT+8:00) Singapore',
        }
    });

    const onSubmit = (data: any) => {
        console.log("Saving changes:", data);
        alert('Changes saved!');
    };

    return (
         <div className="max-w-xl">
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                 <div>
                     <label className="text-sm font-medium">Event Title*</label>
                     <input {...register("title")} className="mt-1 w-full p-2 border rounded-md"/>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                     <div>
                         <label className="text-sm font-medium">Start Date*</label>
                         <input type="date" {...register("startDate")} className="mt-1 w-full p-2 border rounded-md"/>
                     </div>
                     <div>
                        <label className="text-sm font-medium">Start Time*</label>
                        <input type="time" {...register("startTime")} className="mt-1 w-full p-2 border rounded-md"/>
                     </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                     <div>
                         <label className="text-sm font-medium">End Date*</label>
                         <input type="date" {...register("endDate")} className="mt-1 w-full p-2 border rounded-md"/>
                     </div>
                     <div>
                        <label className="text-sm font-medium">End Time*</label>
                        <input type="time" {...register("endTime")} className="mt-1 w-full p-2 border rounded-md"/>
                     </div>
                 </div>
                 <div>
                    <label className="text-sm font-medium">Timezone*</label>
                    <input {...register("timezone")} className="mt-1 w-full p-2 border rounded-md"/>
                </div>
                <div className="flex justify-start pt-4">
                    <button type="submit" className="bg-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-700">
                        Save Changes
                    </button>
                </div>
             </form>
         </div>
    );
};

export default EditEventInfo;
