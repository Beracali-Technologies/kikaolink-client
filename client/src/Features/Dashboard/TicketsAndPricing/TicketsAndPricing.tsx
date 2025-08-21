import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiTag, FiDollarSign } from 'react-icons/fi';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

// --- SUBCOMPONENTS (Clean and Scalable) ---

const TicketCard = ({ ticket, index, onRemove }) => (
    <div className="bg-gray-50 p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
            <h3 className="font-bold text-gray-800">{ticket.name || `Ticket #${index + 1}`}</h3>
            <p className="text-sm text-gray-500 mt-1">{ticket.price > 0 ? `$${ticket.price}` : 'Free'} - {ticket.quantity} available</p>
        </div>
        <div className="flex-shrink-0">
             <button onClick={() => onRemove(index)} type="button" className="p-2 text-gray-400 hover:text-red-600">
                <FiTrash2 />
            </button>
        </div>
    </div>
);

const AddTicketForm = ({ control, index }) => (
     <div className="p-4 border rounded-lg bg-white space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600"><FiTag/> Ticket Details</div>
        <input {...control.register(`tickets.${index}.name`)} placeholder="Ticket Name (e.g., General Admission)" className="w-full p-2 border rounded"/>
        <div className="grid sm:grid-cols-2 gap-4">
            <input type="number" {...control.register(`tickets.${index}.price`)} placeholder="Price" className="w-full p-2 border rounded"/>
            <input type="number" {...control.register(`tickets.${index}.quantity`)} placeholder="Quantity" className="w-full p-2 border rounded"/>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
const TicketsAndPricing: React.FC<{ eventId: string | number }> = ({ eventId }) => {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            tickets: []
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tickets'
    });

    const onSubmit = (data) => {
        console.log(`Saving ${data.tickets.length} tickets for event ${eventId}:`, data);
        toast.success('Ticket information saved!');
        // Here you would navigate to the next step, e.g., Event Page Design
        // navigate(`/dashboard/events/${eventId}/design`);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                 <h2 className="text-2xl font-bold text-gray-800">Tickets & Pricing</h2>
                 <p className="text-gray-500 mt-1">Create different ticket types for your event.</p>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <TicketCard key={field.id} ticket={field} index={index} onRemove={remove} />
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                 <div className="space-y-4">
                    {fields.map((field, index) => (
                        <AddTicketForm key={field.id} control={control} index={index} />
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center border-t pt-6">
                    <button type="button" onClick={() => append({ name: '', price: 0, quantity: 100 })}
                        className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
                    >
                       <FiPlus /> Add a Ticket
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700">
                        Save & Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketsAndPricing;
