import React, { useState, useEffect } from 'react';
import { FiCopy, FiCheck, FiEdit, FiGlobe, FiUsers, FiCode } from 'react-icons/fi';
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
    const [embedCopied, setEmbedCopied] = useState(false);

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

    const copyEmbedCode = () => {
        const embedCode = `<iframe src="${urls?.registration_url || ''}" width="100%" height="600" frameborder="0"></iframe>`;
        navigator.clipboard.writeText(embedCode).then(() => {
            setEmbedCopied(true);
            setTimeout(() => setEmbedCopied(false), 2000);
            toast.success('Embed code copied to clipboard!');
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setCustomSlug(urls.custom_slug || '');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
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
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
                        className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md transition-all duration-200 hover:border-gray-400"
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
                        className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md transition-all duration-200 hover:border-gray-400"
                    >
                        {copied === 'registration' ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Enhanced Embed Section */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FiCode className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-blue-900 text-lg">Embed on Your Website</h4>
                        <p className="text-sm text-blue-700">
                            Add this iframe to embed the registration form on your website
                        </p>
                    </div>
                </div>

                <div className="relative group">
                    <pre className="p-4 bg-white rounded-lg border-2 border-blue-200 text-sm overflow-x-auto transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-sm">
                        <code className="text-gray-800">
                            {`<iframe src="${urls.registration_url || ''}" width="100%" height="600" frameborder="0"></iframe>`}
                        </code>
                    </pre>

                    {/* Copy Button with Animation */}
                    <button
                        onClick={copyEmbedCode}
                        className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-300 transform ${
                            embedCopied
                                ? 'bg-green-100 text-green-600 scale-110'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105'
                        }`}
                    >
                        <div className="relative">
                            {embedCopied ? (
                                <div className="flex items-center gap-1 animate-bounce">
                                    <FiCheck className="w-4 h-4" />
                                    <span className="text-xs font-medium">Copied!</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <FiCopy className="w-4 h-4" />
                                    <span className="text-xs font-medium">Copy</span>
                                </div>
                            )}
                        </div>
                    </button>

                    {/* Ripple Animation Effect */}
                    {embedCopied && (
                        <div className="absolute inset-0 rounded-lg bg-green-500 opacity-0 animate-ping"></div>
                    )}
                </div>

                {/* Preview Note */}
                <div className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        The embedded form will automatically match your event's branding and styling
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventUrlSettings;
