"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Hatch } from "ldrs/react";
import "ldrs/react/Hatch.css";
import { FaXTwitter, FaInstagram, FaTwitch } from "react-icons/fa6";

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
import { InfoIcon, Upload, X, Camera, CheckCircle, XCircle, AlertCircle, Crown } from "lucide-react";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  
  // Add verification state
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  
  // Add membership state
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [membershipLoading, setMembershipLoading] = useState(false);

  const [graduationYear, setGraduationYear] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitch, setTwitch] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");
  const [secondaryRole, setSecondaryRole] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    twitter: "",
    instagram: "",
    youtube: "",
    twitch: "",
    graduationYear: "",
    primaryRole: "",
    secondaryRole: "",
    image: ""
  });
  const [showImageStatus, setShowImageStatus] = useState(false);

  // Biography character limit
  const BIO_MAX_LENGTH = 135;

  // Image upload constraints
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

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

  // Solution 2: If you need to join based on email matching
const checkTryoutVerification = async (userEmail: string) => {
  setVerificationLoading(true);
  try {
    // First check if user exists in sheets table
    const { data: sheetData, error: sheetError } = await supabase
      .from("sheets")
      .select("school_email")
      .eq("school_email", userEmail)
      .maybeSingle();

    if (sheetError) {
      console.error("Sheet check error:", sheetError);
      setIsVerified(false);
      return;
    }

    if (!sheetData) {
      setIsVerified(false);
      return;
    }

    // Then check if the same email has paid in player table
    const { data: playerData, error: playerError } = await supabase
      .from("player")
      .select("paid")
      .eq("email", userEmail)
      .eq("paid", true)
      .maybeSingle();

    if (playerError) {
      console.error("Player check error:", playerError);
      setIsVerified(false);
      return;
    }

    setIsVerified(!!playerData);
  } catch (error) {
    console.error("Verification check failed:", error);
    setIsVerified(false);
  } finally {
    setVerificationLoading(false);
  }
};

  // Function to check membership status
  const checkMembershipStatus = async (userEmail: string) => {
    setMembershipLoading(true);
    try {
      // Check if user has paid in the player table
      const { data: playerData, error } = await supabase
        .from("player")
        .select("paid")
        .eq("email", userEmail) // adjust field name as needed
        .eq("paid", true)
        .maybeSingle();

      if (error) {
        console.error("Membership check error:", error);
        setIsMember(false);
        return;
      }

      // If we found a record with paid = true, user is a member
      setIsMember(!!playerData);
    } catch (error) {
      console.error("Membership check failed:", error);
      setIsMember(false);
    } finally {
      setMembershipLoading(false);
    }
  };

  // Verification indicator component
  const VerificationBadge = () => {
    if (verificationLoading) {
      return (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (isVerified === null) return null;

    return (
      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
        isVerified ? 'bg-green-500' : 'bg-red-500'
      }`}>
        {isVerified ? (
          <CheckCircle className="w-4 h-4 text-white" />
        ) : (
          <XCircle className="w-4 h-4 text-white" />
        )}
      </div>
    );
  };

  // Membership indicator component
  const MembershipBadge = () => {
    if (membershipLoading) {
      return (
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (isMember === null) return null;

    return (
      <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
        isMember ? 'bg-yellow-500' : 'bg-gray-400'
      }`}>
        {isMember ? (
          <Crown className="w-4 h-4 text-white" />
        ) : (
          <X className="w-3 h-3 text-white" />
        )}
      </div>
    );
  };

  // Verification status text
  const VerificationStatus = () => {
    if (verificationLoading) {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          <span>Checking tryout registration...</span>
        </div>
      );
    }

    if (isVerified === null) return null;

    return (
      <div className={`flex items-center gap-1 text-sm ${
        isVerified ? 'text-green-600' : 'text-red-600'
      }`}>
        {isVerified ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>You are registered for tryouts!</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4" />
            <span>You are not registered for tryouts.</span>
          </>
        )}
      </div>
    );
  };

  // Membership status text
  const MembershipStatus = () => {
    if (membershipLoading) {
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          <span>Checking membership status...</span>
        </div>
      );
    }

    if (isMember === null) return null;

    return (
      <div className={`flex items-center gap-1 text-sm ${
        isMember ? 'text-yellow-600' : 'text-red-600'
      }`}>
        {isMember ? (
          <>
            <Crown className="w-4 h-4" />
            <span>You are a member!</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4" />
            <span>You are not a member.</span>
          </>
        )}
      </div>
    );
  };

  // Function to calculate precise textarea height
  const calculateTextareaHeight = (text: string | any[], baseHeight = 60) => {
    if (!text) return baseHeight;
    
    const avgCharsPerLine = 50;
    const lines = Math.ceil(text.length / avgCharsPerLine);
    const lineHeight = 20;
    
    return Math.max(baseHeight, (lines + 1) * lineHeight + 20);
  };

  // URL validation functions
  const isValidURL = (string: string) => {
    if (!string.trim()) return true;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidSocialMediaLink = (url: string, platform: string) => {
    if (!url.trim()) return { isValid: true, error: "" };
    
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
      
      case 'twitch':
        if (lowerUrl.includes('twitch.tv')) {
          return { isValid: true, error: "" };
        }
        return { isValid: false, error: "Please enter a valid Twitch URL" };
      
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

    if (!graduationYear || graduationYear === "none") {
      newErrors.graduationYear = "Graduation year is required";
      isValid = false;
    } else {
      newErrors.graduationYear = "";
    }

    if (!primaryRole || primaryRole === "none") {
      newErrors.primaryRole = "Primary role is required";
      isValid = false;
    } else {
      newErrors.primaryRole = "";
    }

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

  const validateImage = (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { isValid: false, error: "Please upload a JPG, PNG, or WebP image" };
    }
    
    if (file.size > MAX_IMAGE_SIZE) {
      return { isValid: false, error: "Image must be smaller than 5 MB" };
    }
    
    return { isValid: true, error: "" };
  };

  const clearImageError = () => {
    setErrors(prev => ({ ...prev, image: "" }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setErrors(prev => ({ ...prev, image: "" }));

    const validation = validateImage(file);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, image: validation.error }));
      if (e.target) {
        e.target.value = '';
      }
      return;
    }

    setImageUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-picture.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      if (profilePicture) {
        try {
          const urlParts = profilePicture.split('/');
          const oldFilePath = urlParts.slice(-2).join('/');
          
          await supabase.storage
            .from('profile-pictures')
            .remove([oldFilePath]);
        } catch (deleteError) {
          console.warn('Failed to delete old image:', deleteError);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error('Failed to get image URL');
      }

      const cacheBustedUrl = `${publicUrl}?v=${Date.now()}`;

      const { error: updateError } = await supabase
        .from('player')
        .update({ profile_picture: cacheBustedUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      setProfilePicture(cacheBustedUrl);
      setErrors(prev => ({ ...prev, image: "" }));
      setStatus("Profile picture updated successfully!");
      setTimeout(() => setStatus(""), 3000);

    } catch (error) {
      console.error('Image upload error:', error);
      
      let errorMessage = 'Failed to upload image';
      
      if (error instanceof Error) {
        if (error.message.includes('Upload failed')) {
          errorMessage = 'Upload failed. Please check your internet connection and try again.';
        } else if (error.message.includes('Failed to update profile')) {
          errorMessage = 'Image uploaded but failed to update profile. Please refresh and try again.';
        } else if (error.message.includes('Failed to get image URL')) {
          errorMessage = 'Image uploaded but failed to generate URL. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrors(prev => ({ 
        ...prev, 
        image: errorMessage
      }));
      
      setStatus("Upload failed. Please try again.");
      setTimeout(() => setStatus(""), 3000);
      setShowImageStatus(true);
      setTimeout(() => setShowImageStatus(false), 3000);
      
    } finally {
      setImageUploading(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!user || !profilePicture) return;

    setImageUploading(true);
    setStatus("Removing image...");
    setErrors(prev => ({ ...prev, image: "" }));

    try {
      const urlParts = profilePicture.split('/');
      const filePath = urlParts.slice(-2).join('/');

      const { error: deleteError } = await supabase.storage
        .from('profile-pictures')
        .remove([filePath]);

      if (deleteError) {
        console.warn('Failed to delete from storage:', deleteError);
      }

      const { error: updateError } = await supabase
        .from('player')
        .update({ profile_picture: null })
        .eq('id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      setProfilePicture(null);
      setStatus("Profile picture removed successfully!");
      setTimeout(() => setStatus(""), 3000);
      setShowImageStatus(true);
      setTimeout(() => setShowImageStatus(false), 3000);

    } catch (error) {
      console.error('Image removal error:', error);
      
      let errorMessage = 'Failed to remove image';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setErrors(prev => ({ 
        ...prev, 
        image: errorMessage
      }));
      
      setStatus("Removal failed. Please try again.");
      setTimeout(() => setStatus(""), 3000);
      
    } finally {
      setImageUploading(false);
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

      // Check tryout verification
      await checkTryoutVerification(user.email || '');
      
      // Check membership status
      await checkMembershipStatus(user.email || '');

      const { data: profile, error: profileError } = await supabase
        .from("player")
        .select(
          "graduation_year, biography, twitter_link, instagram_link, youtube_link, twitch_link, primary_role, secondary_role, profile_picture"
        )
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      }

      if (profile) {
        console.log("Profile data:", profile);
        setGraduationYear(profile.graduation_year || "");
        setBio(profile.biography || "");
        setTwitter(profile.twitter_link || "");
        setInstagram(profile.instagram_link || "");
        setYoutube(profile.youtube_link || "");
        setTwitch(profile.twitch_link || "");
        setPrimaryRole(profile.primary_role || "");
        setSecondaryRole(profile.secondary_role || "");
        setProfilePicture(profile.profile_picture || null);
        console.log("Profile picture URL:", profile.profile_picture);
      }

      setLoading(false);
    };

    getUserData();
  }, [supabase]);

  const handleSave = async () => {
    if (!user) return;

    const requiredFieldsValid = validateRequiredFields();

    const twitterValid = validateField(twitter, 'twitter');
    const instagramValid = validateField(instagram, 'instagram');
    const youtubeValid = validateField(youtube, 'youtube');
    const twitchValid = validateField(twitch, 'twitch');

    if (!requiredFieldsValid || !twitterValid || !instagramValid || !youtubeValid || !twitchValid) {
      setStatus("Update failed, please fix the errors above.");
      return;
    }

    setStatus("Saving...");

    const updateData: Record<string, string> = {
      graduation_year: graduationYear.trim(),
      biography: bio.trim(),
      twitter_link: twitter.trim(),
      instagram_link: instagram.trim(),
      youtube_link: youtube.trim(),
      twitch_link: twitch.trim(),
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
      setStatus("Profile updated successfully!");
    }

    setTimeout(() => setStatus(""), 3000);
  };

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
    <div className="max-w-2xl mx-auto p-6 w-full mt-9 pt-[55px]">
      <Card>  
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your information below. Fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Picture Section with Verification and Membership Indicators */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                {profilePicture && (
                  <button
                    onClick={handleRemoveImage}
                    disabled={imageUploading}
                    className="absolute bottom-20 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-50 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Label htmlFor="profilePicture" className="cursor-pointer" onClick={clearImageError}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Upload className="w-4 h-4" />
                      {imageUploading ? "Uploading..." : "Upload Photo"}
                    </div>
                  </Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="hidden"
                  />
                </div>

                {/* Status Messages - Member status above tryout status */}
                <div className="mt-2 space-y-1">
                  <MembershipStatus />
                  <VerificationStatus />
                </div>

                {(imageUploading || errors.image || (status && (status.includes("Profile picture updated") || status.includes("Profile picture removed")))) && (
                  <div className={`mt-1 flex items-center gap-1 rounded-md text-sm font-medium w-fit
                    ${
                      errors.image
                        ? "bg-card text-red-600"
                        : (status && (status.includes("Profile picture updated") || status.includes("Profile picture removed")))
                        ? "bg-card text-green-600"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {imageUploading && (
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                    {errors.image && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {(status && (status.includes("Profile picture updated") || status.includes("Profile picture removed"))) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span>
                      {errors.image || 
                        (status && (status.includes("Profile picture updated") || status.includes("Profile picture removed")) ? status : null) || 
                        "Uploading..."}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  className="min-h-[60px] resize-none"
                  placeholder="Tell us about yourself!"
                  style={{ 
                    height: `${calculateTextareaHeight(bio)}px`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Max 135 characters</span>
                  <span className={bio.length > BIO_MAX_LENGTH * 0.9 ? "text-orange-500" : ""}>
                    {bio.length}/{BIO_MAX_LENGTH}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Roles Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Preferred Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Social Media</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <InfoIcon size={16} />
              <span>Social media links must include the full URL (e.g., https://x.com/username)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <div className="space-y-2">
                <Label htmlFor="twitch">Twitch</Label>
                <Input
                  id="twitch"
                  value={twitch}
                  onChange={(e) => setTwitch(e.target.value)}
                  onBlur={() => validateField(twitch, 'twitch')}
                  className={errors.twitch ? "border-red-500" : ""}
                />
                {errors.twitch && (
                  <p className="text-sm text-red-500">{errors.twitch}</p>
                )}
              </div>
            </div>
          </div>


          {/* Save Section with Enhanced Status Display */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex-1">
              {status && !(status.includes("Profile picture updated") || status.includes("Profile picture removed")) && (
                <div className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                  status.includes("successfully") 
                    ? "bg-card text-green-600" 
                    : status.includes("failed") || status.includes("Error") || status.includes("not")
                    ? "bg-card text-red-600"
                    : "bg-card text-muted-foreground"
                }`}>
                  {status.includes("successfully") && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {(status.includes("failed") || status.includes("Error")) && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {(status.includes("Uploading") || status.includes("Removing") || status.includes("Saving")) && (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  <span>{status}</span>
                </div>
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