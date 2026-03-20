import Link from "next/link";
import { Heart, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6" aria-labelledby="hero-heading">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50 to-transparent -z-10" aria-hidden="true" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-1.5 rounded-full text-blue-700 font-bold text-sm" role="status">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Live Crisis Response Active</span>
          </div>
          
          <h1 id="hero-heading" className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
            Bridging Help to <br />
            <span className="text-blue-600">Those in Need.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            BridgeLink uses AI to instantly process handwritten donation notes, 
            connecting local donors to emergency camp inventory in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link 
              href="/donor"
              className="w-full sm:w-auto px-10 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-3"
              aria-label="Start donating now"
            >
              <Heart className="w-6 h-6" />
              <span>I want to Donate</span>
            </Link>
            
            <Link 
              href="/manager"
              className="w-full sm:w-auto px-10 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center space-x-3"
              aria-label="Login for camp managers"
            >
              <Shield className="w-6 h-6" />
              <span>Camp Manager Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12" aria-label="Key Features">
        <div className="space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center" aria-hidden="true">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Ultra-Simple</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Designed specifically for elderly users. One button, one photo, no forms required.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center" aria-hidden="true">
            <ArrowRight className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">AI Powered</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Gemini 1.5 Flash reads handwritten notes and categorizes items automatically.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center" aria-hidden="true">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Real-Time</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Camp managers see donations the moment they are scanned, allowing immediate allocation.
          </p>
        </div>
      </section>
    </main>
  );
}
