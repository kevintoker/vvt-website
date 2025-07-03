"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [graduationYear, setGraduationYear] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");
  const [secondaryRole, setSecondaryRole] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    twitter: "",
    instagram: "",
    youtube: "",
    graduationYear: "",
    primaryRole: "",
    secondaryRole: ""
  });

  // Biography character limit
  const BIO_MAX_LENGTH = 150;

  // Generate graduation years from current year to 2040
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from(
    { length: 2035 - currentYear + 1 },
    (_, i) => (currentYear + i).toString()
  );

  // Role options for Valorant
  const roleOptions = [
    "Duelist",
    "Controller", 
    "Sentinel",
    "Info Initiator",
    "Flash Initiator"
  ];

  // URL validation functions
  const isValidURL = (string: string) => {
    if (!string.trim()) return true; // Empty is allowed
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidSocialMediaLink = (url: string, platform: string) => {
    if (!url.trim()) return { isValid: true, error: "" };
    
    // Check if it's a valid URL first
    if (!isValidURL(url)) {
      return { isValid: false, error: "Please enter a valid URL" };
    }

    const lowerUrl = url.toLowerCase();
    
    switch (platform) {
      case 'twitter':
        if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
          return { isValid: true, error: "" };
        }
        return { isValid: false, error: "Please enter a valid Twitter/X URL" };
      
      case 'instagram':
        if (lowerUrl.includes('instagram.com')) {
          return { isValid: true, error: "" };
        }
        return { isValid: false, error: "Please enter a valid Instagram URL" };
      
      case 'youtube':
        if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
          return { isValid: true, error: "" };
        }
        return { isValid: false, error: "Please enter a valid YouTube URL" };
      
      default:
        return { isValid: true, error: "" };
    }
  };

  const validateField = (value: string, platform: string) => {
    const validation = isValidSocialMediaLink(value, platform);
    setErrors(prev => ({
      ...prev,
      [platform]: validation.error
    }));
    return validation.isValid;
  };

  const validateRequiredFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Check graduation year
    if (!graduationYear || graduationYear === "none") {
      newErrors.graduationYear = "Graduation year is required";
      isValid = false;
    } else {
      newErrors.graduationYear = "";
    }

    // Check primary role
    if (!primaryRole || primaryRole === "none") {
      newErrors.primaryRole = "Primary role is required";
      isValid = false;
    } else {
      newErrors.primaryRole = "";
    }

    // Check secondary role
    if (!secondaryRole || secondaryRole === "none") {
      newErrors.secondaryRole = "Secondary role is required";
      isValid = false;
    } else {
      newErrors.secondaryRole = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= BIO_MAX_LENGTH) {
      setBio(newValue);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        redirect("/auth/login");
        return;
      }

      setUser(user);

      const { data: profile } = await supabase
        .from("player")
        .select(
          "graduation_year, biography, twitter_link, instagram_link, youtube_link, primary_role, secondary_role"
        )
        .eq("id", user.id)
        .single();

      if (profile) {
        setGraduationYear(profile.graduation_year || "");
        setBio(profile.biography || "");
        setTwitter(profile.twitter_link || "");
        setInstagram(profile.instagram_link || "");
        setYoutube(profile.youtube_link || "");
        setPrimaryRole(profile.primary_role || "");
        setSecondaryRole(profile.secondary_role || "");
      }

      setLoading(false);
    };

    getUserData();
  }, [supabase]);

  const handleSave = async () => {
    if (!user) return;

    // Validate required fields first
    const requiredFieldsValid = validateRequiredFields();

    // Validate all social media links
    const twitterValid = validateField(twitter, 'twitter');
    const instagramValid = validateField(instagram, 'instagram');
    const youtubeValid = validateField(youtube, 'youtube');

    if (!requiredFieldsValid || !twitterValid || !instagramValid || !youtubeValid) {
      setStatus("Please fix the errors above before saving");
      return;
    }

    setStatus("Saving...");

    // Build update data - only convert empty strings for optional fields
    const updateData: Record<string, string> = {
      graduation_year: graduationYear.trim(),
      biography: bio.trim(),
      twitter_link: twitter.trim(),
      instagram_link: instagram.trim(),
      youtube_link: youtube.trim(),
      primary_role: primaryRole.trim(),
      secondary_role: secondaryRole.trim(),
    };

    const { error } = await supabase
      .from("player")
      .update(updateData)
      .eq("id", user.id);

    if (error) {
      console.error("Profile update error:", error);
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus("Profile updated!");
    }

    // Clear status after 3 seconds
    setTimeout(() => setStatus(""), 3000);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 w-full pt-[122px]">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your information below. Fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradYear">Graduation Year *</Label>
                <Select value={graduationYear} onValueChange={setGraduationYear}>
                  <SelectTrigger className={errors.graduationYear ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your graduation year!" />
                  </SelectTrigger>
                  <SelectContent> 
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.graduationYear && (
                  <p className="text-sm text-red-500">{errors.graduationYear}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={handleBioChange}
                  className="min-h-[80px] resize-none"
                  placeholder="Tell us about yourself!"
                  style={{ 
                    height: Math.max(80, Math.min(150, Math.ceil(bio.length / 50) * 20 + 80)) + 'px' 
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Max 150 characters</span>
                  <span className={bio.length > BIO_MAX_LENGTH * 0.9 ? "text-orange-500" : ""}>
                    {bio.length}/{BIO_MAX_LENGTH}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Roles Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Gaming Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryRole">Primary Role *</Label>
                <Select value={primaryRole} onValueChange={setPrimaryRole}>
                  <SelectTrigger className={errors.primaryRole ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your primary role!" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem 
                        key={role} 
                        value={role}
                        disabled={role === secondaryRole && secondaryRole !== ""}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={role === secondaryRole && secondaryRole !== "" ? "text-muted-foreground" : ""}>
                            {role}
                          </span>
                          {role === secondaryRole && secondaryRole !== "" && (
                            <span className="text-s text-muted-foreground ml-1">
                              (Used as secondary)
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.primaryRole && (
                  <p className="text-sm text-red-500">{errors.primaryRole}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryRole">Secondary Role *</Label>
                <Select value={secondaryRole} onValueChange={setSecondaryRole}>
                  <SelectTrigger className={errors.secondaryRole ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your secondary role!" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem 
                        key={role} 
                        value={role}
                        disabled={role === primaryRole && primaryRole !== ""}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={role === primaryRole && primaryRole !== "" ? "text-muted-foreground" : ""}>
                            {role}
                          </span>
                          {role === primaryRole && primaryRole !== "" && (
                            <span className="text-s text-muted-foreground ml-1">
                              (Used as primary)
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.secondaryRole && (
                  <p className="text-sm text-red-500">{errors.secondaryRole}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Media</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <InfoIcon size={16} />
              <span>Social media links must include the full URL (e.g., https://x.com/username)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  onBlur={() => validateField(twitter, 'twitter')}
                  className={errors.twitter ? "border-red-500" : ""}
                />
                {errors.twitter && (
                  <p className="text-sm text-red-500">{errors.twitter}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  onBlur={() => validateField(instagram, 'instagram')}
                  className={errors.instagram ? "border-red-500" : ""}
                />
                {errors.instagram && (
                  <p className="text-sm text-red-500">{errors.instagram}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  onBlur={() => validateField(youtube, 'youtube')}
                  className={errors.youtube ? "border-red-500" : ""}
                />
                {errors.youtube && (
                  <p className="text-sm text-red-500">{errors.youtube}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Section */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              {status && (
                <p className="text-sm text-muted-foreground">{status}</p>
              )}
            </div>
            <Button onClick={handleSave} className="min-w-[120px]">
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}