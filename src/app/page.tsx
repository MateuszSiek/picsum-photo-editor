"use client";

import { PicsumImageCard } from "@/components/picsumImageCard";
import { loadPicsumImages } from "@/lib/picsumApi";
import { PicsumImage } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState<PicsumImage[]>([]);

  useEffect(() => {
    loadPicsumImages().then((data) => setImages(data));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
      {images.map((image) => (
        <PicsumImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
