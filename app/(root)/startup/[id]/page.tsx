import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { startups_query_by_id } from "@/sanity/lib/queries";
import { LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from 'markdown-it'
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
export const experimental_ppr = true;

const md = markdownit();
const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    console.log(id);

    const post = await client.fetch(startups_query_by_id, { id });

    if (!post) return notFound();
    const parsedContent = md.render(post?.pitch || '');
    return (
        <>
            <div className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </div>

            <div className="section_container">
                <div className="flex justify-center items-center">
                <Image src={post.image} width={500} height={500} alt="thumbnail" className=" rounded-xl" />
                </div>
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image 
                                src={post.author?.image} 
                                alt={`${post.author?.name}'s avatar`} 
                                width={64} 
                                height={64} 
                                className="rounded-full shadow-md"
                            />

                            <div >
                                <p className="text-20-medium"> {post.author?.name}</p>
                                <p>{post.author?.username}</p>
                            </div>
                        </Link>
                        <p className="catorgory-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold"> Pitch Details</h3>
                    {
                        parsedContent ?  (
                            <article className="prose max-w-4xl font-work-sant break-all" dangerouslySetInnerHTML={{ __html: parsedContent}}/>
                        ) : (
                            <p className="no-result">No details provided.</p>
                        )
                    }
                </div>
                <hr className="divider" />
                {/* # Editors selected startupup  */}
                <Suspense fallback={<Skeleton className="view_skeleton"/>} >
                <View id={id}/>
                </Suspense>
            </div>
        </>
    );
};

export default Page;
