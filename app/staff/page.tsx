"use client";
import { FaYoutube, FaTwitch, FaLocationArrow, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Hatch } from "ldrs/react";
import "ldrs/react/Hatch.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGenerator, { ImageSourceType } from "@/components/ImageGenerator";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const FALLBACK_IMG =
  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

const withProto = (s: string) =>
  /^(https?:)?\/\//i.test(s) ? s : `https://${s}`;

const isValidUrl = (s?: string): s is string => {
  if (!s) return false;
  try {
    new URL(withProto(s));
    return true;
  } catch {
    return false;
  }
};

const isTwitter = (s?: string) =>
  isValidUrl(s) &&
  ["x.com", "twitter.com", "www.twitter.com"].some((d) =>
    new URL(withProto(s!)).hostname.endsWith(d)
  );

const isInstagram = (s?: string) =>
  isValidUrl(s) && new URL(withProto(s!)).hostname.endsWith("instagram.com");

const isYoutube = (s?: string) =>
  isValidUrl(s) &&
  ["youtube.com", "www.youtube.com", "youtu.be"].some((d) =>
    new URL(withProto(s!)).hostname.endsWith(d)
  );

const isTwitch = (s?: string) =>
  isValidUrl(s) && new URL(withProto(s!)).hostname.endsWith("twitch.tv");

const toPublicUrl = (path?: string) => {
  if (!path) return FALLBACK_IMG;
  if (path.startsWith("http")) return path;
  return supabase.storage.from("member-avatars").getPublicUrl(path).data
    .publicUrl;
};

interface MemberCard {
  id: number | string;
  team?: string | "N/A";
  admin_role?: string | "N/A";
  primary_role: string;
  secondary_role: string;
  username: string;
  email: string;
  graduation_year: string;
  biography: string;
  twitter_link?: string | null;
  instagram_link?: string | null;
  youtube_link ?: string | null;
  twitch_link?: string | null;
  profile_picture: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<MemberCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMember, setExpandedMember] = useState<MemberCard | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("player")
        .select("*")
        .eq("admin", true)
        .order("id");
        
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const mapped: MemberCard[] = (data as any[]).map((row) => ({
        id: row.id,
        team: row.team,
        admin_role: row.admin_role,
        primary_role: row.primary_role,
        secondary_role: row.secondary_role,
        username: row.username,
        email: row.email,
        graduation_year: row.graduation_year,
        biography: row.biography,
        twitter_link: isTwitter(row.twitter_link)
          ? withProto(row.twitter_link)
          : null,
        instagram_link: isInstagram(row.instagram_link)
          ? withProto(row.instagram_link)
          : null,
        youtube_link: isYoutube(row.youtube_link)
          ? withProto(row.youtube_link)
          : null,
        twitch_link: isTwitch(row.twitch_link) ? withProto(row.twitch_link) : null,
        profile_picture: toPublicUrl(row.profile_picture),
      }));

      setMembers(mapped);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <Hatch size={48} stroke={4} speed={3.5} color="#861F41" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <main className="flex-1 text-white px-4 py-8 pt-24">
        <AnimatePresence>
          <motion.div
            className="flex flex-wrap gap-8 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                className="bg-black border-2 border-[#861F41] overflow-hidden w-[300px] flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="relative w-full h-72 bg-gray-900 flex items-center justify-center group overflow-hidden">
                  <ImageGenerator
                    path={member.profile_picture}
                    sourceType={ImageSourceType.URL}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                    alt={member.username}
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {member.youtube_link && (
                      <IconLink href={member.youtube_link} hover="red-500">
                        <FaYoutube />
                      </IconLink>
                    )}
                    {member.twitch_link && (
                      <IconLink href={member.twitch_link} hover="purple-500">
                        <FaTwitch />
                      </IconLink>
                    )}
                    {member.instagram_link && (
                      <IconLink href={member.instagram_link} hover="pink-500">
                        <FaInstagram />
                      </IconLink>
                    )}
                    {member.twitter_link && (
                      <IconLink href={member.twitter_link} hover="sky-400">
                        <FaXTwitter />
                      </IconLink>
                    )}
                  </div>
                </div>
                <div
                  className="p-4 flex flex-col gap-2 text-white"
                  style={{ backgroundColor: "hsl(var(--background))" }}
                >
                  <span className="bg-[#861F41] text-white text-xs font-bold px-2 py-1 rounded-full w-fit mb-2">
                    {member.admin_role || "Member"}
                  </span>
                  <h2 className="text-4xl font-bold">{member.username}</h2>
                  <button
                    onClick={() => setExpandedMember(member)}
                    className="flex items-center gap-2 mt-2 text-[#861F41] underline hover:text-white text-sm cursor-pointer"
                  >
                    <span>View Profile</span>
                    <FaLocationArrow className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Expanded Profile Modal */}
      <AnimatePresence>
        {expandedMember && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedMember(null)}
          >
            <motion.div
              className="border-2 border-[#861F41] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "hsl(var(--background))" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setExpandedMember(null)}
                  className="absolute top-4 right-4 text-white hover:text-[#861F41] z-10"
                >
                  <FaTimes size={24} />
                </button>
                
                <div className="flex flex-col md:flex-row min-h-[250px]">
                  <div className="relative w-full md:w-80 md:h-auto h-80 bg-gray-900 overflow-hidden">
                    <ImageGenerator
                      path={expandedMember.profile_picture}
                      sourceType={ImageSourceType.URL}
                      className="object-cover w-full h-full scale-101"
                      alt={expandedMember.username}
                    />
                  </div>
                  
                  <div className="p-6 flex-1 text-white flex flex-col justify-between">
                    {/* Top Section - Header Info */}
                    <div className="space-y-2 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#861F41] text-white text-xs font-bold px-2 py-1 rounded-full">
                          {expandedMember.admin_role || "Member"}
                        </span>
                        <span className="text-sm text-white">
                          Class of {expandedMember.graduation_year || "Unknown"}
                        </span>
                      </div>
                      
                      <h1 className="text-4xl font-bold">{expandedMember.username}</h1>
                    </div>
                    
                    {/* Middle Section - Role and Contact Info */}
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div>
                        <h3 className="text-sm font-semibold text-[#861F41] mb-1">PRIMARY ROLE</h3>
                        <p className="text-white">{expandedMember.primary_role || "Unknown"}</p>
                      </div>
                      
                      {expandedMember.secondary_role && (
                        <div>
                          <h3 className="text-sm font-semibold text-[#861F41] mb-1">SECONDARY ROLE</h3>
                          <p className="text-white">{expandedMember.secondary_role || "Unknown"}</p>
                        </div>
                      )}
                      
                      {expandedMember.biography && (
                        <div>
                          <h3 className="text-sm font-semibold text-[#861F41] mb-2">BIOGRAPHY</h3>
                          <p className="text-white leading-relaxed">{expandedMember.biography || "Unknown"}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom Section - Social Links */}
                    <div className="pt-4">
                      <div className="flex gap-3">
                        {expandedMember.youtube_link && (
                          <IconLink href={expandedMember.youtube_link} hover="red-500">
                            <FaYoutube size={20} />
                          </IconLink>
                        )}
                        {expandedMember.twitch_link && (
                          <IconLink href={expandedMember.twitch_link} hover="purple-500">
                            <FaTwitch size={20} />
                          </IconLink>
                        )}
                        {expandedMember.instagram_link && (
                          <IconLink href={expandedMember.instagram_link} hover="pink-500">
                            <FaInstagram size={20} />
                          </IconLink>
                        )}
                        {expandedMember.twitter_link && (
                          <IconLink href={expandedMember.twitter_link} hover="sky-400">
                            <FaXTwitter size={20} />
                          </IconLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="w-full border-t border-[#861F41] bg-background mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-16 px-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <ExternalButton href="https://x.com/VirginiaTechVAL">
                <FaXTwitter className="!w-8 !h-8 !text-white" />
              </ExternalButton>
              <ExternalButton href="https://www.instagram.com/vt_valorantt/">
                <FaInstagram className="!w-8 !h-8 !text-white" />
              </ExternalButton>
            </div>
            <div className="h-6 w-px bg-border mx-4" />
            <p className="text-muted-foreground text-xs !text-white">
              Developed and maintained by{" "}
              <FooterLink href="https://www.linkedin.com/in/kevin-toker-14272024b/">
                Kevin Toker
              </FooterLink>
              ,{" "}
              <FooterLink href="https://www.linkedin.com/in/marcoli1/">
                Marco Li
              </FooterLink>
              , and{" "}
              <FooterLink href="https://www.linkedin.com/in/cody-cockrell/">
                Cody Cockrell
              </FooterLink>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface IconLinkProps {
  href: string;
  hover: string;
  children: React.ReactNode;
}

const IconLink = ({ href, hover, children }: IconLinkProps) => {
  // Map hover colors to specific classes
  const hoverColors: Record<string, string> = {
    "red-500": "hover:text-red-500",
    "purple-500": "hover:text-purple-500", 
    "pink-500": "hover:text-pink-500",
    "sky-400": "hover:text-sky-400"
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded w-10 h-10 flex items-center justify-center ${hoverColors[hover]} transition-colors duration-200 text-white`}
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      {children}
    </a>
  );
};

const ExternalButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Button variant="ghost" className="w-10 h-10">
      {children}
    </Button>
  </a>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-neutral-400"
  >
    {children}
  </a>
);