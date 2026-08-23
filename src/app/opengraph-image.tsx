import { ogImage, OG_SIZE } from "@/lib/og-image";

export const alt = "Car key replacement in Kent — mobile auto locksmith";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Car Key Replacement in Kent" });
}
