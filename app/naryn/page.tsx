import { CampusNewsPage, campusMetadata } from "@/app/components/CampusNewsPage";

export const revalidate = 60;

export const metadata = campusMetadata("Naryn");

export default function NarynPage() {
  return <CampusNewsPage campus="Naryn" />;
}
