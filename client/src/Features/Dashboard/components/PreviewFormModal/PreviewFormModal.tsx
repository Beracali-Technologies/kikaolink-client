import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Field } from '@/types';
import PublicRegistrationForm from '../../../Landing/PublicRegistrationForm/PublicRegistrationForm';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PreviewFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    fields: Field[];
}

const PreviewFormModal: React.FC<PreviewFormModalProps> = ({ isOpen, onClose, fields }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <div>
                                        <Dialog.Title className="text-2xl font-bold text-gray-900">
                                            Form Preview
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Preview how your registration form will appear to attendees
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"
                                        aria-label="Close preview"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Preview Content */}
                                <div className="max-h-[70vh] overflow-y-auto">
                                    <div className="p-1">
                                        <PublicRegistrationForm fields={fields} isPreview={true} />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 p-6 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Preview Mode
                                        </span>
                                        <span className="ml-3">
                                            {fields.length} field{fields.length !== 1 ? 's' : ''} configured
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Continue Editing
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            Looks Good!
                                        </button>
                                    </div>
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
