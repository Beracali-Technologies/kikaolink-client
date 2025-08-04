import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Field } from '../../types';
import PublicRegistrationForm from '../../../Landing/PublicRegistrationForm/PublicRegistrationForm';

interface PreviewFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    fields: Field[];
}

const PreviewFormModal: React.FC<PreviewFormModalProps> = ({ isOpen, onClose, fields }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-light-bg text-left align-middle shadow-xl transition-all">
                                <PublicRegistrationForm fields={fields} isPreview={true} />
                                <div className="bg-white p-4 flex justify-end border-t">
                                    <button type="button" onClick={onClose} className="rounded-md border border-transparent bg-gray-100 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                                        Close Preview
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PreviewFormModal;
