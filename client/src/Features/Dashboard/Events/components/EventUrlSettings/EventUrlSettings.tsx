import React, { useState, useEffect } from 'react';
import { FiCopy, FiCheck, FiEdit, FiGlobe, FiUsers } from 'react-icons/fi';
import { eventUrlService, EventUrls } from '@/services/url/eventUrlService';
import toast from 'react-hot-toast';

interface EventUrlSettingsProps {
    eventId: string;
}

const EventUrlSettings: React.FC<EventUrlSettingsProps> = ({ eventId }) => {
    const [urls, setUrls] = useState<EventUrls | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [customSlug, setCustomSlug] = useState('');
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        loadUrls();
    }, [eventId]);

    const loadUrls = async () => {
        try {
            const data = await eventUrlService.getEventUrls(eventId);
            setUrls(data);
            setCustomSlug(data.custom_slug || '');
        } catch (error) {
            toast.error('Failed to load event URLs');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSlug = async () => {
        if (!customSlug.trim()) {
            toast.error('Please enter a custom URL');
            return;
        }

        setSaving(true);
        try {
            const updated = await eventUrlService.updateEventSlug(eventId, customSlug);
            setUrls(updated);
            setEditing(false);
            toast.success('Event URL updated successfully!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update URL');
        } finally {
            setSaving(false);
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text || '').then(() => {
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
            toast.success('URL copied to clipboard!');
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!urls) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center text-gray-500">
                    Failed to load URLs
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event URLs</h3>

            {/* Custom Slug Editor */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Event URL
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        {window.location.host}/e/
                    </span>
                    {editing ? (
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                value={customSlug || ''}
                                onChange={(e) => setCustomSlug(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your-event-name"
                            />
                            <button
                                onClick={handleSaveSlug}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setCustomSlug(urls.custom_slug || '');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center gap-2">
                            <span className="px-3 py-2 bg-gray-100 rounded-md border">
                                {urls.custom_slug || 'No custom slug set'}
                            </span>
                            <button
                                onClick={() => setEditing(true)}
                                className="p-2 text-gray-500 hover:text-gray-700"
                            >
                                <FiEdit className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    This will be your event's public URL: {window.location.host}/e/{urls.custom_slug || 'your-event-name'}
                </p>
            </div>

            {/* Event Website URL */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <FiGlobe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Event Website</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={urls.live_url || ''}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
                    />
                    <button
                        onClick={() => copyToClipboard(urls.live_url || '', 'live')}
                        className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                    >
                        {copied === 'live' ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Registration URL */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <FiUsers className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Registration Page</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={urls.registration_url || ''}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
                    />
                    <button
                        onClick={() => copyToClipboard(urls.registration_url || '', 'registration')}
                        className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                    >
                        {copied === 'registration' ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Embed Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Embed on Your Website</h4>
                <p className="text-sm text-blue-700 mb-2">
                    Add this iframe to embed the registration form on your website:
                </p>
                <code className="block p-2 bg-white rounded border text-sm overflow-x-auto">
                    {`<iframe src="${urls.registration_url || ''}" width="100%" height="600" frameborder="0"></iframe>`}
                </code>
            </div>
        </div>
    );
};

export default EventUrlSettings;
