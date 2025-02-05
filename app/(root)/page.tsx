import Image from "next/image";
import SearchForm from '@/app/components/SearchForm'
export default async function Home({searchParams} : {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query
  return (
    <>
    <div className="pink_container">
    <div>
    <h1 className="heading">Pitch Your Startup, <br />
    Connect With Entrepreneurs</h1>
   

    <span className="sub-heading !max-w-3xl">Submit Ideas, Vote On Pitches, and Get Noticed in competitions</span>
    <SearchForm query={query} />
    </div>
    </div>
    </>
  );
}

