"use client";
import { FaYoutube, FaTwitch, FaLocationArrow} from "react-icons/fa";
import kev from "../public/kev.jpg";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Hatch } from 'ldrs/react';
import 'ldrs/react/Hatch.css';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyMembers = [
  {
    id: 1,
    name: "Player 1",
    role: "VALORANT",
    image_url: kev,
    youtube_url: "https://youtube.com/",
    twitch_url: "https://twitch.tv/",
    profile_url: "#",
  },
  {
    id: 2,
    name: "Player 2",
    role: "VALORANT",
    image_url: kev,
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Hatch size={48} stroke={4} speed={3.5} color="#861F41" />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white text-white px-4 py-8">
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
                <div className="relative w-full h-72 bg-gray-900 flex items-center justify-center">
                  <img
                    src={kev.src}
                    alt={member.name}
                    className="object-cover w-full h-full"
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
                <div className="p-4 flex flex-col gap-2 bg-white text-black">
                  <span className="bg-[#861F41] text-white text-xs font-bold px-2 py-1 rounded-full w-fit mb-2">
                    {member.role}
                  </span>
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-[#861F41] underline hover:text-gray-700 text-sm"
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
      <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center gap-4 py-8">
        <div className="flex gap-4">
          <a href="https://x.com/VirginiaTechVAL" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="w-10 h-10">
              <FaXTwitter className="!w-8 !h-8 !text-black" />
            </Button>
          </a>
          <a href="https://www.instagram.com/vt_valorantt/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="w-10 h-10">
              <FaInstagram style={{ color: "black" }} className="!w-8 !h-8 !text-black" />
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground text-xs !text-black">
          Developed and maintained by{' '}
          <a
            href="https://www.linkedin.com/in/kevin-toker-14272024b/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >Kevin Toker</a>,{' '}
          <a
            href="https://www.linkedin.com/in/marcoli1/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >Marco Li</a>,{' '}
          and <a
            href="https://www.linkedin.com/in/cody-cockrell/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >Cody Cockrell</a>
        </p>
      </footer>
    </>
  );
}
