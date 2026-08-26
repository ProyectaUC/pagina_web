import { useState } from "react";
import { assets, content } from "../../styles/theme/brand";

export default function Logo({ imgClassName = "", textClassName = "" }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span
        className={`flex items-center gap-2 font-display text-2xl ${textClassName}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {content.org.name}
      </span>
    );
  }

  return (
    <img
      src={assets.logo}
      alt={content.org.name}
      className={imgClassName}
      onError={() => setImgFailed(true)}
    />
  );
}
