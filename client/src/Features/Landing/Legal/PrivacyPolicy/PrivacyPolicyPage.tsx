// import LegalLayout from '@/components/ui/legal/LegalLayout'; to be used later
import HeroHeader  from "../../components/HeroHeader/HeroHeader";


export default function PrivacyPolicy() {
  return (
    <>

    <HeroHeader />

    <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-14 md:py-20">
      <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          PRIVACY POLICY
        </h1>
        <p className="text-lg text-gray-500 mb-12 font-medium">
          Last Updated: 22/Nov/2025<br />
          Company: Beracali Technologies<br />
          Country: Tanzania
        </p>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Beracali Technologies (“we”, “us”, “our”) operates Kikaolink, an event registration and attendee management platform used for creating forms, processing external data sources, generating QR codes, and managing event attendance.<br /><br />
              This Privacy Policy describes how we collect, use, store, and protect information when you use the Kikaolink platform, website, or related services (“Services”).<br /><br />
              By using Kikaolink, you agree to the practices outlined in this Privacy Policy.<br />
              If you do not agree, please stop using our Services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Information You Provide</h3>
            <p>We collect personal information that you voluntarily provide when using Kikaolink, such as:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Organization or event details</li>
              <li>Registration information</li>
              <li>Profile information</li>
              <li>Form responses</li>
              <li>Attendee check-in data</li>
              <li>Custom fields created by event organizers</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <p>When using our platform, we may automatically collect:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Browser type</li>
              <li>Usage statistics</li>
              <li>Log data</li>
              <li>Date/time of access</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Information from External Integrations</h3>
            <p>If you connect third-party services (such as Google Forms, Google Sheets, or custom CRM APIs), with your permission we may collect:</p>
            <ul className="list-disc pl-8 mt-3 space-y-1">
              <li>Form response data</li>
              <li>Spreadsheet values</li>
              <li>Field mappings</li>
              <li>OAuth tokens</li>
              <li>Integration configuration details</li>
            </ul>
            <p className="mt-4">We only obtain this information with your explicit consent.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>Provide event registration and attendance features</li>
              <li>Sync data between Kikaolink and external sources (e.g., Google Forms, CRM systems)</li>
              <li>Generate QR codes for event attendees</li>
              <li>Improve user experience and platform performance</li>
              <li>Communicate with you regarding updates, support, or important notices</li>
              <li>Enable organizers to manage attendees efficiently</li>
              <li>Ensure platform security and functionality</li>
            </ul>
            <p className="mt-4 font-medium">We do not sell or rent your personal data to third parties.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Use of Google User Data (Google OAuth Compliance)</h2>
            <p>Kikaolink may request access to your Google account through Google OAuth. We only access Google data with your consent.</p>

            <h3 className="text-xl font-semibold mt-5 mb-3">4.1 Google Data We Access</h3>
            <ul className="list-disc pl-8 space-y-1">
              <li>Google Forms metadata</li>
              <li>Google Forms responses</li>
              <li>Google Sheets spreadsheets</li>
              <li>Spreadsheet rows and headers</li>
              <li>OAuth access tokens</li>
            </ul>

            <h3 className="text-xl font-semibold mt-5 mb-3">4.2 How We Use Google Data</h3>
            <p>We use Google data only to:</p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Import form responses into Kikaolink</li>
              <li>Display previews of your Google Sheets or Forms</li>
              <li>Sync attendee information automatically</li>
              <li>Map form fields to Kikaolink fields</li>
              <li>Keep event data up to date</li>
            </ul>

            <h3 className="text-xl font-semibold mt-5 mb-3">4.3 How We Do NOT Use Google Data</h3>
            <p>We do <strong>NOT</strong>:</p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Sell Google data</li>
              <li>Use your Google data for advertising</li>
              <li>Share Google data with unrelated third parties</li>
              <li>Store Google login credentials</li>
              <li>Modify or delete data in your Google account</li>
            </ul>

            <h3 className="text-xl font-semibold mt-5 mb-3">4.4 Revoking Google Permissions</h3>
            <p>
              You may revoke Kikaolink’s access to your Google account at any time:<br />
              Visit: <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://myaccount.google.com/permissions</a><br />
              Once revoked, Kikaolink will stop syncing your Google data.
            </p>
          </div>

          {/* Continue with remaining sections */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
            <p>We may share information only in the following cases:</p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>With event organizers, who manage the event and use attendee data</li>
              <li>With third-party services connected through integrations, only when authorized</li>
              <li>With service providers for hosting or analytics (e.g., cloud servers), under strict confidentiality</li>
              <li>To comply with legal requirements, government requests, or regulatory obligations</li>
            </ul>
            <p className="mt-4">We never share personal data for marketing or advertising purposes.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Storage & Security</h2>
            <p>We take reasonable technical and organizational measures to protect your data, including:</p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>Secure servers</li>
              <li>Encrypted connections (HTTPS/SSL)</li>
              <li>Limited internal access to sensitive data</li>
              <li>Regular security audits</li>
              <li>Token-based access for external integrations</li>
            </ul>
            <p className="mt-4">Despite our efforts, no system is completely secure. Use the platform at your own discretion.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p>We retain personal data only as long as needed for:</p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>Legal obligations</li>
              <li>Active event operations</li>
              <li>Resolving disputes</li>
              <li>Communicating with clients</li>
              <li>Platform functionality</li>
            </ul>
            <p className="mt-4">You may request deletion of your data at any time.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>Request access to your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw Google integration permissions</li>
              <li>Opt out of marketing communications</li>
              <li>Download your data</li>
            </ul>
            <p className="mt-4">You can make all requests via email: <a href="mailto:kikaolink@beracalitechnologies.co.tz" className="text-blue-600 font-medium">kikaolink@beracalitechnologies.co.tz</a></p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children’s Privacy</h2>
            <p>Kikaolink is not intended for use by children under 13.<br />
            We do not knowingly collect data from children.<br />
            If a child’s data is discovered, it will be deleted immediately.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time.<br />
            Changes will become effective when posted on our website with a new “Last Updated” date.<br />
            We encourage you to review the policy periodically.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-lg">
              If you have any questions, concerns, or requests regarding this Privacy Policy, you may contact us at:<br /><br />
              <strong>Beracali Technologies</strong><br />
              Email: <a href="mailto:kikaolink@beracalitechnologies.co.tz" className="text-blue-600 font-medium">kikaolink@beracalitechnologies.co.tz</a><br />
              Country: Tanzania
            </p>
          </div>
        </section>
      </article>
    </div>
  </>
  );
}