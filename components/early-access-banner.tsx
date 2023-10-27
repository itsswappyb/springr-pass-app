import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";

const EarlyAccessBanner: FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(true);

  return (
    <div
      className={cn(
        !showBanner && "hidden",
        "bg-orangePrimary absolute top-0 w-full h-[30px] flex items-center justify-center"
      )}
    >
      <p>
        Congratulations on getting early access membership to Springr -
        co-living spaces for creators and crypto nomads.
      </p>
    </div>
  );
};

export default EarlyAccessBanner;
