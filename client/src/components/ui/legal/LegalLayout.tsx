import LegalHeader from './LegalHeader';
import LegalFooter from './LegalFooter';

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LegalHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        {children}
      </main>
      <LegalFooter />
    </div>
  );
}