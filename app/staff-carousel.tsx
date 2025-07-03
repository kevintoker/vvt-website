"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card2";
import { motion, AnimatePresence } from "framer-motion";
import ImageGenerator, { ImageSourceType } from "@/components/ImageGenerator";

// import { createClient } from "@/lib/supabase/server";

// const supabase = await createClient();

// const { data, error } = await supabase.storage
//   .from("profiles") // ← your bucket name
//   .list(""); // ← folder path (or "" for root)

export default function StaffCarousel() {
  // Sample staff data - replace with your actual data
  const staffMembers = [
    { title: "President", name: "Kevin", imageUrl: "/kev.jpg" },
    { title: "Vice President", name: "Skyler", imageUrl: "/skyler.png" },
    { title: "Secretary", name: "Ari", imageUrl: "/ari.png" },
    { title: "Treasurer", name: "Ame", imageUrl: "/seven.jpg" },
    { title: "Team Manager", name: "Maddie", imageUrl: "/maddie.png" },
    { title: "Graphics Chair", name: "Tatum", imageUrl: "/tatum.png" },
    { title: "Media Chair", name: "Will", imageUrl: "/will.png" },
    { title: "Premier Coach", name: "Joe", imageUrl: "/joe.png" },
    { title: "Signature Coach", name: "Nishil", imageUrl: "nishil.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(staffMembers.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= staffMembers.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, staffMembers.length - itemsPerPage)
        : prevIndex - itemsPerPage
    );
  };

  const getCurrentItems = () => {
    return staffMembers.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <div className="relative w-full px-4">
      <div className="flex items-center justify-center gap-4">
        {/* Previous Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="flex-shrink-0"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Staff Cards Container */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }} // <-- horizontal slide in
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} // <-- horizontal slide out
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {getCurrentItems().map((member, index) => (
                <div key={currentIndex + index} className="flex justify-center">
                  <Card className="border border-[#861F41]">
                    <CardHeader className="flex flex-col items-center">
                      <div className="w-20 h-20 mb-2 flex items-center justify-center">
                        <ImageGenerator
                          path={member.imageUrl}
                          sourceType={ImageSourceType.URL}
                          className="w-full h-full object-cover rounded-full shadow"
                        />
                      </div>
                      <CardTitle className="text-2xl text-center">
                        {member.title}
                      </CardTitle>
                      <CardDescription className="text-white text-center font-bold">
                        {member.name}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="flex-shrink-0"
          disabled={currentIndex + itemsPerPage >= staffMembers.length}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`w-3 h-3 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerPage) === index
                ? "bg-primary"
                : "bg-muted hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
