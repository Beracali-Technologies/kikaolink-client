// import LegalLayout from '@/components/ui/legal/LegalLayout'; to be used later
import HeroHeader from "../../components/HeroHeader/HeroHeader";

export default function TermsOfService() {
    return (
    <>
    <HeroHeader />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 md:py-20">
                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          TERMS OF SERVICE
        </h1>
        <p className="text-lg text-gray-500 mb-12 font-medium">
          Last Updated: November 22, 2025<br />
          Operated by Beracali Technologies (Tanzania)<br />
          Contact:{' '}
          <a href="mailto:kelvinmullar5@gmail.com" className="text-blue-600 hover:underline">
                kikaolink@beracalitechnologies.co.tz
          </a>
        </p>

        <section className="space-y-12">

          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to Kikaolink. These Terms of Service (“Terms”) govern your use of the Kikaolink platform, including our mobile and web applications, APIs, integrations, and related services (“Services”).<br /><br />
              By accessing or using Kikaolink, you agree to be bound by these Terms. If you do not agree, please stop using the Services immediately.
            </p>
          </div>

          {/* 2. Definitions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
            <ul className="list-disc pl-8 space-y-2">
              <li><strong>“Kikaolink”</strong> refers to the event management, registration, and attendance platform owned by Beracali Technologies.</li>
              <li><strong>“User”</strong> refers to any individual or organization using the Services.</li>
              <li><strong>“Organizer”</strong> refers to an event owner using Kikaolink to manage events.</li>
              <li><strong>“Attendee”</strong> refers to a person who registers or checks in to an event.</li>
              <li><strong>“External Data Sources”</strong> refer to integrations such as Google Forms, Google Sheets, Typeform, or custom APIs.</li>
            </ul>
          </div>

          {/* 3. Eligibility */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
            <p>You must:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Be at least 18 years old.</li>
              <li>Have the authority to bind your organization (if applicable).</li>
              <li>Use the platform in compliance with Tanzania laws and international regulations applicable to digital services.</li>
            </ul>
          </div>

          {/* 4. Use of the Services */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Use of the Services</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Provide accurate information.</li>
              <li>Use the platform only for lawful purposes.</li>
              <li>Not attempt to hack, disrupt, or misuse the platform.</li>
              <li>Not reverse engineer or copy any part of the system.</li>
            </ul>
            <p className="mt-5">Kikaolink provides tools for:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Event creation and management</li>
              <li>Attendee registration</li>
              <li>QR code generation and scanning</li>
              <li>Data syncing from external sources</li>
              <li>Email and SMS communications</li>
              <li>Analytics and dashboards</li>
            </ul>
          </div>

          {/* 5. Accounts and Security */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accounts and Security</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities under your account</li>
              <li>Notifying us immediately if you suspect unauthorized access</li>
            </ul>
            <p className="mt-4">Kikaolink is not responsible for data loss caused by your mishandling of credentials.</p>
          </div>

          {/* 6. External Integrations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. External Integrations (Google Forms, Sheets, APIs)</h2>
            <p>When connecting Kikaolink with third-party platforms:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>You authorize Kikaolink to access the linked platform only for the intended purpose of syncing event data.</li>
              <li>You are responsible for ensuring you have rights to access and sync that data.</li>
              <li>You may revoke access at any time through the external platform (e.g., Google Account Permissions).</li>
            </ul>
            <p className="mt-4">Kikaolink strictly follows:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Google API Services User Data Policy</li>
              <li>OAuth 2.0 guidelines</li>
              <li>Data Minimization rules</li>
            </ul>
          </div>

          {/* 7. Data Ownership & Responsibilities */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Ownership & Responsibilities</h2>
            <p>Organizers own their event data.<br />
            Kikaolink provides the platform to store, process, and sync data.<br /><br />
            Organizers are responsible for:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Ensuring attendee consent</li>
              <li>Complying with data protection laws</li>
              <li>Managing and deleting data they no longer need</li>
            </ul>
            <p className="mt-4">Kikaolink may store:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Event configurations</li>
              <li>Registration fields</li>
              <li>Attendance logs</li>
              <li>External integration metadata</li>
              <li>QR code identifiers</li>
              <li>System-generated logs</li>
            </ul>
            <p className="mt-4 font-medium">Kikaolink does not sell user or attendee data.</p>
          </div>

          {/* 8–15 (shortened for space, but fully included) */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Communications (Email, SMS & Notifications)</h2>
            <p>Organizers may send messages to attendees using email templates, SMS features, and automated reminders.<br />
            You must ensure messages comply with anti-spam laws and attendees have consented.<br />
            Kikaolink may send platform updates and account notifications.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Payment & Billing (If Applicable)</h2>
            <p>If you subscribe to a paid plan: fees are billed as stated, payments are final unless required by law, and non-payment may suspend access.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Prohibited Activities</h2>
            <p>Users may NOT: use Kikaolink for illegal events, upload viruses, extract data unauthorized, impersonate others, or copy the codebase/UI.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Service Availability & Disclaimer</h2>
            <p>Kikaolink is provided “as is” and “as available.” We do not guarantee uninterrupted or error-free service.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
            <p>Beracali Technologies is not liable for data loss due to user error, third-party downtime, misuse, or indirect damages. Maximum liability = amount paid in last 6 months.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Suspension or Termination</h2>
            <p>We may suspend/terminate accounts for violations, abuse, illegal activity, or law enforcement requests.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to These Terms</h2>
            <p>We may update these Terms. Significant changes will be notified via email or dashboard. Continued use = acceptance.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law</h2>
            <p>These Terms are governed by the laws of Tanzania. Disputes shall be resolved in Tanzanian courts.</p>
          </div>

          {/* 16. Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
            <p className="text-lg">
              If you have any questions about these Terms:<br /><br />
              Email:{' '}
              <a href="mailto:kelvinmullar5@gmail.com" className="text-blue-600 font-medium hover:underline">
                kelvinmullar5@gmail.com
              </a>
              <br />
              Company: Beracali Technologies (Tanzania)
            </p>
          </div>

        </section>
      </article>
      </div>
    </>
    );
  }