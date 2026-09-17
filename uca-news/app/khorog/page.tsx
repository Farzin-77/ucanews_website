import { CampusNewsPage, campusMetadata } from "@/app/components/CampusNewsPage";

export const revalidate = 60;

export const metadata = campusMetadata("Khorog");

export default function KhorogPage() {
  return <CampusNewsPage campus="Khorog" />;
}
