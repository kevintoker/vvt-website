"use client";
import { FaYoutube, FaTwitch, FaLocationArrow} from "react-icons/fa";
import kev from "../public/kev.jpg";
import will from "../public/will.jpeg";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Hatch } from 'ldrs/react';
import 'ldrs/react/Hatch.css';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyMembers = [
  {
    id: 1,
    name: "kev",
    role: "Premier",
    image_url: kev,
    youtube_url: "https://youtube.com/",
    twitch_url: "https://twitch.tv/",
    profile_url: "#",
  },
  {
    id: 2,
    name: "Dawhn",
    role: "Signature",
    image_url: will,
    youtube_url: "",
    twitch_url: "https://twitch.tv/",
    profile_url: "#",
  },
  {
    id: 3,
    name: "Player 3",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "https://youtube.com/",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 4,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 5,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },{
    id: 6,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 7,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 8,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 9,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
  {
    id: 10,
    name: "Player 4",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "",
    twitch_url: "",
    profile_url: "#",
  },
];

export default function MembersPage() {
  const [loading, setLoading] = useState(true);
  const members = dummyMembers;

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "hsl(var(--background))" }}>
        <Hatch size={48} stroke={4} speed={3.5} color="#861F41" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(var(--background))" }}>
      <main className="flex-1 text-white px-4 py-8 pt-24">
        <AnimatePresence>
          <motion.div
            className="flex flex-wrap gap-8 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {members.map((member) => (
              <motion.div
                key={member.id}
                className="bg-black border-2 border-[#861F41] rounded-lg overflow-hidden w-[300px] flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + member.id * 0.1 }}
              >
                <div className="relative w-full h-72 bg-gray-900 flex items-center justify-center group overflow-hidden"> 
                  <img
                    src={member.image_url.src}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {/* Example for X/Twitter, add if you want */}
                    {/* <div className="bg-black rounded w-8 h-8 flex items-center justify-center">
                      <FaXTwitter className="w-5 h-5 text-white" />
                    </div> */}
                    {member.youtube_url && (
                      <a
                        href={member.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black rounded w-8 h-8 flex items-center justify-center"
                      >
                        <FaYoutube className="w-5 h-5 text-white hover:text-red-500" />
                      </a>
                    )}
                    {member.twitch_url && (
                      <a
                        href={member.twitch_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black rounded w-8 h-8 flex items-center justify-center"
                      >
                        <FaTwitch className="w-5 h-5 text-white hover:text-purple-500" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 text-white" style={{ backgroundColor: "hsl(var(--background))" }}>
                  <span className="bg-[#861F41] text-white text-xs font-bold px-2 py-1 rounded-full w-fit mb-2">
                    {member.role}
                  </span>
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-[#861F41] underline hover:text-white text-sm"
                  >
                    <span>View Profile</span>
                    <FaLocationArrow className="w-3 h-3" />
                  </a>
                </div>
                
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="w-full border-t border-[#861F41] bg-background mt-auto">
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