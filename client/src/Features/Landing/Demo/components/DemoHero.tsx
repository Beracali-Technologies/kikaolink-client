import React from 'react';

const DemoHero: React.FC = () => {
  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  // Floating feature boxes data - spread across the page
  const featureBoxes = [
    { id: 1, title: "Smart Attendance", description: "Fast QR-based check-ins", icon: "📸", position: "top-8 left-1/4", delay: "0s" },
    { id: 2, title: "Real-Time Sync", description: "Instant updates across devices", icon: "⚡", position: "top-8 right-1/4", delay: "1s" },
  
    { id: 3, title: "Automated Reports", description: "Generate analytics effortlessly", icon: "📊", position: "top-1/4 left-[8%]", delay: "2s" },
    { id: 4, title: "Easy Registration", description: "Smooth onboarding for attendees", icon: "📝", position: "top-1/4 right-[8%]", delay: "3s" },
  
    { id: 5, title: "Secure Platform", description: "Trusted, encrypted data handling", icon: "🛡️", position: "bottom-1/4 left-[8%]", delay: "4s" },
    { id: 6, title: "Multi-Event Support", description: "Run unlimited events easily", icon: "🎉", position: "bottom-1/4 right-[8%]", delay: "5s" },
  
    { id: 7, title: "On-Site Badge Printing", description: "Instant attendee badges", icon: "🖨️", position: "bottom-10 left-1/4", delay: "6s" },
    { id: 8, title: "Works Anywhere", description: "Optimized for all devices", icon: "🌍", position: "bottom-10 right-1/4", delay: "7s" }
  ];
  
  
  
  return (
    <div className="min-h-[75vh] bg-gradient-to-br from-primary-blue to-navy-700 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Floating Background Boxes - Spread across the page */}
      {featureBoxes.map((box) => (
        <div
          key={box.id}
          className={`absolute ${box.position} hidden lg:block animate-float-slow`}
          style={{ animationDelay: box.delay }}
        >
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 max-w-xs border border-white border-opacity-25 shadow-2xl transform hover:scale-110 transition-transform duration-300 hover:bg-opacity-20">
            <div className="text-2xl mb-3 text-white">{box.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{box.title}</h3>
            <p className="text-navy-100 text-sm leading-relaxed">{box.description}</p>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main Demo Title */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tight">
          Want A DEMO ?
        </h1>
        
        {/* Subtitle 
        <p className="text-2xl md:text-3xl text-navy-100 mb-8 leading-relaxed max-w-3xl mx-auto">
          Experience the power of our platform firsthand
        </p> */}
        
        {/* Description 
        <p className="text-xl text-navy-200 mb-12 max-w-2xl mx-auto">
          Discover how our solutions can transform your workflow with a personalized demonstration
        </p> */}
        
        {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        {/* <button
                            onClick={handleSignUp}
                            className="bg-accent-red hover:bg-red-600 text-white font-bold py-5 px-12 rounded-xl transition-all duration-200 text-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Start Free Trial
                    </button> */}
          <button className="border-2 border-white border-opacity-50 hover:border-opacity-100 text-white font-bold py-5 px-8 rounded-xl transition-all duration-200 text-xl hover:bg-white hover:bg-opacity-10">
            Watch Demo Video
          </button>
        </div>

        {/* Additional Info 
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white border-opacity-20">
          <p className="text-navy-100 text-lg">
            <span className="font-semibold text-white">No commitment required</span> - Get full platform access for 14 days with expert guidance
          </p>
        </div> */}
        
        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Custom animations for floating boxes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-15px) translateX(10px) rotate(1deg); 
          }
          66% { 
            transform: translateY(10px) translateX(-5px) rotate(-1deg); 
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DemoHero;