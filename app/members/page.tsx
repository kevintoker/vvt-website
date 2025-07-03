"use client";
import { FaYoutube, FaTwitch, FaLocationArrow } from "react-icons/fa";
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
  primary_role: string;
  secondary_role: string;
  username: string;
  email: string;
  graduation_year: string;
  biography: string;
  twitter_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  twitch_url?: string | null;
  profile_picture: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<MemberCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("test")
        .select("*")
        .order("id");
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const mapped: MemberCard[] = (data as any[]).map((row) => ({
        id: row.id,
        team: row.team,
        primary_role: row.primary_role,
        secondary_role: row.secondary_role,
        username: row.username,
        email: row.email,
        graduation_year: row.graduation_year,
        biography: row.biography,
        twitter_url: isTwitter(row.twitter_url)
          ? withProto(row.twitter_url)
          : null,
        instagram_url: isInstagram(row.instagram_url)
          ? withProto(row.instagram_url)
          : null,
        youtube_url: isYoutube(row.youtube_url)
          ? withProto(row.youtube_url)
          : null,
        twitch_url: isTwitch(row.twitch_url) ? withProto(row.twitch_url) : null,
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
                className="bg-black border-2 border-[#861F41] rounded-lg overflow-hidden w-[300px] flex flex-col"
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
                    {member.youtube_url && (
                      <IconLink href={member.youtube_url} hover="red-500">
                        <FaYoutube />
                      </IconLink>
                    )}
                    {member.twitch_url && (
                      <IconLink href={member.twitch_url} hover="purple-500">
                        <FaTwitch />
                      </IconLink>
                    )}
                    {member.instagram_url && (
                      <IconLink href={member.instagram_url} hover="pink-500">
                        <FaInstagram />
                      </IconLink>
                    )}
                    {member.twitter_url && (
                      <IconLink href={member.twitter_url} hover="sky-400">
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
                    {member.primary_role}
                  </span>
                  <h2 className="text-2xl font-bold">{member.username}</h2>
                  <a
                    href={member.profile_picture}
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
const IconLink = ({ href, hover, children }: IconLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`bg-black rounded w-8 h-8 flex items-center justify-center hover:text-${hover}`}
  >
    {children}
  </a>
);

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
