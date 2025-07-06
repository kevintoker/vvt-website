import React from 'react';
import { Calendar, Users, Trophy, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import Link from 'next/link';

export default function ValorantTryoutPage() {
  return (
    <div className="max-h-screen text-white py-16">
        <div className="flex flex-1 items-center justify-center px-8 py-12 gap-8 relative overflow-hidden bg-vvt-banner">
        
    

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-6xl md:text-7xl font-bold text-white">
            FALL 2025
          </h2>
        </div>

        {/* Membership Info */}
        <div className="bg-background rounded-lg p-8 mb-14 border border-[#861F41]">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold">$5 Membership Fee</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Eligible for phase I and phase II of open tryouts!</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Access to exclusive member only events!</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">No entry fee for our VVT Gauntlet!</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Assist in funding community tournaments and events!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tryout Checklist */}
        <div className="bg-background  rounded-lg p-8 mb-12 border border-[#861F41]">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold">Tryout Checklist</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Phase I registration ends August 14th at 11:59 PM EST!</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">One open tryout phase is required to be eligible for closed trials!</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Phase II registration ends August 29th at 11:59 PM EST!</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">Diamond I minimum rank!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Schedule */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Phase I */}
          <div className="bg-background  rounded-lg p-8 border border-[#861F41] transition-colors">
            <h4 className="text-2xl font-bold mb-6 text-center">Phase I <br></br>Open Tryouts</h4>
            <div className="text-center space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-xl font-semibold">August 16th - 17th</p>
                <p className="text-lg text-gray-300">7:00 PM EST</p>
              </div>
              <div className="flex justify-center">
                <Calendar className="text-[#861F41]" size={48} />
              </div>
            </div>
          </div>

          {/* Phase II */}
          <div className="bg-background  rounded-lg p-8 border border-[#861F41] transition-colors">
            <h4 className="text-2xl font-bold mb-6 text-center">Phase II <br></br>Open Tryouts</h4>
            <div className="text-center space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-xl font-semibold">August 30th - 31st</p>
                <p className="text-lg text-gray-300">7:00 PM EST</p>
              </div>
              <div className="flex justify-center">
                <Calendar className="text-[#861F41]" size={48} />
              </div>
            </div>
          </div>

          {/* Phase III */}
          <div className="bg-background  rounded-lg p-8 border border-[#861F41] transition-colors">
            <h4 className="text-2xl font-bold mb-6 text-center">Phase III <br></br>Closed Trials</h4>
            <div className="text-center space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-xl font-semibold">September 1st</p>
                <p className="text-lg text-gray-300">TBD</p>
              </div>
              <div className="flex justify-center">
                <Calendar className="text-[#861F41]" size={48} />
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-11 p-0 flex justify-center gap-11 max-w-2xl mx-auto">
            <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfTmd0khCWs5AgHOgeUGnD-88fYWVUUuGKWCDaqBKhynXeH6w/viewform?usp=sf_link"
                className="bg-[#861F41] hover:bg-background text-white font-bold py-4 px-2 rounded-lg text-lg transition-colors flex-1 text-center"
            >
                Register for Tryouts!
            </Link>
            <Link
                href="https://forms.gle/5XTWaL6FxLcfAVLUA"
                className="bg-[#861F41] hover:bg-background text-white font-bold py-4 px-2 rounded-lg text-lg transition-colors flex-1 text-center"
            >
                Become a member!
            </Link>
        </div>
        <p className="text-white mt-11 flex justify-center">Join the Valorant at Virginia Tech community today!</p>
      </div>
      </div>
      
      

      {/* Footer */}
      <footer className="w-full border-t border-[#861F41] bg-background">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-16 px-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a href="https://x.com/VirginiaTechVAL" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaXTwitter className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
              <a href="https://www.instagram.com/vt_valorantt/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaInstagram style={{ color: "white" }} className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
            </div>
            <div className="h-6 w-px bg-border mx-4"></div> {/* Optional separator */}
            <p className="text-muted-foreground text-xs !text-white">
              Developed and maintained by{' '}
              <a
                href="https://www.linkedin.com/in/kevin-toker-14272024b/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Kevin Toker</a>,{' '}
              <a
                href="https://www.linkedin.com/in/marcoli1/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Marco Li</a>,{' '}
              and{' '}
              <a
                href="https://www.linkedin.com/in/cody-cockrell/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Cody Cockrell</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}