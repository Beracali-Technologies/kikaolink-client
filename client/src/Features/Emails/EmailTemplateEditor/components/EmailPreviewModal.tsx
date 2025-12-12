import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiUser, FiCalendar, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { MdQrCode } from 'react-icons/md'; // Proper QR code icon
import { EmailPreviewData, EmailTemplate, Event } from '@/types';
import { eventService } from '@/services/events/eventService';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  preview: EmailPreviewData;
  template: EmailTemplate;
  eventId: Event | null;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  preview,
  template,
  eventId,
  event,
}) => {
  const [realEvent, setRealEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);

  // Fetch real event data when modal opens
  useEffect(() => {
    if (isOpen && eventId) {
      fetchRealEventData();
    }
  }, [isOpen, eventId]);

  const fetchRealEventData = async () => {
    try {
      setIsLoadingEvent(true);
      const eventData = await eventService.getEvent(eventId);
      setRealEvent(eventData);
    } catch (error) {
      console.error('Failed to fetch event data:', error);
    } finally {
      setIsLoadingEvent(false);
    }
  };

  if (!isOpen) return null;

   // Use REAL event data from props
   const getEventTitle = () => {
    if (event?.title) return event.title;
    if (preview.event?.title) return preview.event.title;
    return 'Event Title';
  };

  const getEventDate = () => {
    if (event?.start_date) {
      return new Date(event.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (preview.event?.start_date) {
      return new Date(preview.event.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Date to be announced';
  };

  const getEventLocation = () => {
    if (event?.location) return event.location;
    if (preview.event?.location) return preview.event.location;
    return 'Location to be announced';
  };

  // Process merge fields: replace event fields with real data, keep attendee fields
  const processMergeFields = (content: string): string => {
    let processed = content || '';
    
    // Get real values
    const eventTitle = getEventTitle();
    const eventDate = getEventDate();
    const eventLocation = getEventLocation();
    
    // Replace ONLY event merge fields with REAL data
    const eventReplacements: Record<string, string> = {
      'event_title': eventTitle,
      'event_date': eventDate,
      'event_location': eventLocation,
    };

    Object.entries(eventReplacements).forEach(([key, value]) => {
      const pattern = new RegExp(`\\(\\(${key}\\)\\)`, 'g');
      processed = processed.replace(pattern, value);
    });

    // KEEP attendee fields as merge fields (don't replace them)
    // These remain: ((attendee_first_name)), ((attendee_last_name)), etc.
    
    // Convert markdown bold to HTML
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks
    processed = processed.replace(/\\n/g, '<br>');
    
    return processed;
  };

  const getTemplateValues = () => {
    const greeting = template.greeting || 'Dear ((attendee_first_name)),';
    const message = template.message || '';
    const closing = template.closing || 'Best regards,\\nThe Event Team';
    const fromName = template.from_name || (event?.title ? `${event.title} Team` : 'Event Team');
    const replyTo = template.reply_to || 'noreply@event.com';
    const subject = template.subject || `Your Ticket for ${getEventTitle()}`;
    const bannerText = template.banner_text;
    const showBanner = template.show_banner || false;
    const bannerImage = preview.template?.banner_url || template.banner_image;
    const enabledSections = template.enabled_sections || { 
      qrCode: true, 
      attendeeInfo: true, 
      eventInfo: true 
    };

    return {
      greeting: processMergeFields(greeting),
      message: processMergeFields(message),
      closing: processMergeFields(closing),
      fromName,
      replyTo,
      subject: processMergeFields(subject),
      bannerText: bannerText ? processMergeFields(bannerText) : undefined,
      showBanner,
      bannerImage,
      enabledSections
    };
  };

  const processedData = getTemplateValues();


  // Blue badge for attendee merge fields
  const renderAttendeeField = (field: string) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
      {field}
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <FiMail className="h-7 w-7" />
            <div>
              <h2 className="text-2xl font-bold">Email Preview</h2>
              <p className="text-sm opacity-90 mt-1">
                Event: <strong>{getEventTitle()}</strong>
                {isLoadingEvent && ' • Loading real event data...'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Simple explanatory note */}
        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-start gap-3 max-w-3xl mx-auto">
            <FiAlertCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Event details (title, date, location) show real information. 
              Fields in <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-xs font-medium mx-1">blue</span> 
              are personalized — they will be replaced with each attendee's actual data (name, email, etc.) when sent.
            </p>
          </div>
        </div>

        {/* Email Preview */}
        <div className="p-8 bg-gray-50 flex-1">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border">
            
            {/* Banner */}
            {processedData.showBanner && (
              <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white text-center py-4">
                {processedData.bannerImage ? (
                  <img 
                    src={processedData.bannerImage} 
                    alt="Banner" 
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <h3 className="text-xl font-bold">
                    {processedData.bannerText || 'THANK YOU FOR REGISTERING'}
                  </h3>
                )}
              </div>
            )}

            {/* Email Header */}
            <div className="p-8 border-b">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{processedData.subject}</h1>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <FiUser className="h-4 w-4" />
                  From: {processedData.fromName}
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="h-4 w-4" />
                  Reply to: {processedData.replyTo}
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-8 space-y-10">
              {/* Greeting */}
              <div 
                className="text-lg text-gray-800"
                dangerouslySetInnerHTML={{ __html: processedData.greeting }}
              />

              {/* Message */}
              {processedData.message && (
                <div 
                  className="text-gray-700 leading-relaxed text-base"
                  dangerouslySetInnerHTML={{ __html: processedData.message }}
                />
              )}

              {/* QR Code */}
              {processedData.enabledSections.qrCode && (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Your Digital Ticket</h3>
                  <div className="inline-block p-6 bg-white rounded-xl shadow-lg">
                    <MdQrCode size={140} className="text-gray-800" />
                  </div>
                  <p className="mt-6 text-sm text-gray-600">
                    Registration ID: {renderAttendeeField('((registration_id))')}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Scan this QR code at the event entrance</p>
                </div>
              )}

              {/* Attendee Info */}
              {processedData.enabledSections.attendeeInfo && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-3">
                    <FiUser className="h-6 w-6" />
                    Attendee Information
                  </h3>
                  <div className="space-y-4 text-base">
                    <div>
                      <span className="text-gray-700 font-medium">Name:</span>{' '}
                      {renderAttendeeField('((attendee_full_name))')}
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Email:</span>{' '}
                      {renderAttendeeField('((attendee_email))')}
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Company:</span>{' '}
                      {renderAttendeeField('((attendee_company))')}
                    </div>
                  </div>
                </div>
              )}

              {/* Event Info */}
              {processedData.enabledSections.eventInfo && (
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-5 flex items-center gap-3">
                    <FiCalendar className="h-6 w-6" />
                    Event Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
                    <div>
                      <div className="text-gray-600 text-sm">Event</div>
                      <div className="font-semibold text-gray-900">{getEventTitle()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">Date</div>
                      <div className="font-semibold text-gray-900">{getEventDate()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">Location</div>
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        <FiMapPin className="h-4 w-4" />
                        {getEventLocation()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Closing */}
              <div 
                className="text-gray-700 border-t pt-6"
                dangerouslySetInnerHTML={{ __html: processedData.closing }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-white text-center py-5 text-sm">
              <p>Powered by <strong>KikaoLink</strong></p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-5 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};