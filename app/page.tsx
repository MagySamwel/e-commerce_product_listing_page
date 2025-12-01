import BrandBar from "@/components/filters/brandBar";
import Page from "./products/page";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  
  return (
    <main>
      <Page searchParams={searchParams} />
    </main>
  );
}
