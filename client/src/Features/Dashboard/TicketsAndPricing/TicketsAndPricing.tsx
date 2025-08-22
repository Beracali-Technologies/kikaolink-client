import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { FiPlus, FiTrash2, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';

// --- TYPE DEFINITIONS FOR THIS COMPONENT ---
// Define the shape of a single ticket
interface Ticket {
    name: string;
    price: number | string; // Use string for input flexibility, then parse
    quantity: number | string;
}

// Define the shape of the entire form's data
interface TicketFormData {
    tickets: Ticket[];
}


// --- FULLY TYPED SUBCOMPONENTS ---
const TicketCard: React.FC<{ ticket: any; index: number; onRemove: (index: number) => void }> = ({ ticket, index, onRemove }) => (
    <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-between">
        <div>
            <h3 className="font-bold text-gray-800">{ticket.name || `New Ticket`}</h3>
            <p className="text-sm text-gray-500 mt-1">{ticket.price > 0 ? `$${ticket.price}` : 'Free'} - {ticket.quantity} available</p>
        </div>
        <button onClick={() => onRemove(index)} type="button" className="p-2 text-gray-400 hover:text-red-600">
            <FiTrash2 />
        </button>
    </div>
);

const AddTicketForm: React.FC<{ control: Control<TicketFormData>; index: number }> = ({ control, index }) => (
     <div className="p-4 border-2 rounded-lg bg-white space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600"><FiTag/> Ticket Details</div>
        <input
            {...control.register(`tickets.${index}.name` as const, { required: "Name is required."})}
            placeholder="Ticket Name (e.g., General Admission)"
            className="w-full p-2 border rounded"
        />
        <div className="grid sm:grid-cols-2 gap-4">
            <input
                type="number"
                {...control.register(`tickets.${index}.price` as const, { required: "Price is required.", valueAsNumber: true })}
                placeholder="Price"
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                {...control.register(`tickets.${index}.quantity` as const, { required: "Quantity is required.", valueAsNumber: true })}
                placeholder="Quantity"
                className="w-full p-2 border rounded"
            />
        </div>
    </div>
);


// --- THE FINAL, CORRECTED MAIN COMPONENT ---
const TicketsAndPricing: React.FC = () => {
    // --- 2. GET eventId from URL PARAMETERS ---
    // This removes the need to pass it as a prop from the router.
    const { eventId } = useParams<{ eventId: string }>();

    const { control, handleSubmit } = useForm<TicketFormData>({
        defaultValues: {
            tickets: []
        }
    });

    // --- 3. THE name PROPERTY IS NOW CORRECTLY TYPED ---
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tickets'
    });

    // --- 4. THE `data` PARAMETER IS NOW CORRECTLY TYPED ---
    const onSubmit = (data: TicketFormData) => {
        console.log(`Saving ${data.tickets.length} tickets for event ${eventId}:`, data);
        toast.success('Ticket information saved!');
        // In the future, you can navigate to the next step:
        // navigate(`/dashboard/events/${eventId}/design`);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <header>
                 <h2 className="text-2xl font-bold text-gray-800">Tickets & Pricing</h2>
                 <p className="text-gray-500 mt-1">Create different ticket types for your event.</p>
            </header>

            <div className="space-y-4">
                {fields.length === 0 && <p className="text-center text-gray-400 p-8 bg-gray-50 rounded-lg">No tickets added yet. Click "Add a Ticket" to get started.</p>}
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
                    <button
                        type="button"
                        onClick={() => append({ name: '', price: '', quantity: '' })} // Append with empty strings for better input control
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
