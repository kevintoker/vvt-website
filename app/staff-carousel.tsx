"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card2";
import kev from "./public/kev.jpg";
import skyler from "./public/skyler.png";
import ari from "./public/ari.png";
import ame from "./public/seven.jpg";
import maddie from "./public/maddie.png";
import tatum from "./public/tatum.png";
import will from "./public/will.jpeg";
import joe from "./public/joe.png";
import nishil from "./public/nishil.png";

// import { createClient } from "@/lib/supabase/server";

// const supabase = await createClient();


// const { data, error } = await supabase.storage
//   .from("profiles") // ← your bucket name
//   .list(""); // ← folder path (or "" for root)

export default function StaffCarousel() {
  // Sample staff data - replace with your actual data
  const staffMembers = [
    { title: "President", name: "Kevin", imageUrl: kev },
    { title: "Vice President", name: "Skyler", imageUrl: skyler },
    { title: "Secretary", name: "Ari", imageUrl: ari },
    { title: "Treasurer", name: "Ame", imageUrl: ame },
    { title: "Team Manager", name: "Maddie", imageUrl: maddie },
    { title: "Graphics Chair", name: "Tatum", imageUrl: tatum },
    { title: "Media Chair", name: "Will", imageUrl: will },
    { title: "Premier Coach", name: "Joe", imageUrl: joe },
    { title: "Signature Coach", name: "Nishil", imageUrl: nishil },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(staffMembers.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= staffMembers.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, staffMembers.length - itemsPerPage) : prevIndex - itemsPerPage
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {getCurrentItems().map((member, index) => (
              <div key={currentIndex + index} className="flex justify-center">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">{member.title}</CardTitle>
                    <CardDescription imageUrl={member.imageUrl} className="text-white">
                      {member.name}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
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
                ? 'bg-primary'
                : 'bg-muted hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}