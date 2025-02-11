import { client } from '@/sanity/lib/client';
import { startup_view_query } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import React from 'react';

const View = async ({ id }: { id: string }) => {
    // Fetch current views
    const { views: totalViews = 0 } = await client
        .withConfig({ useCdn: false })
        .fetch(startup_view_query, { id });

    // Increment views count
    try {
        await writeClient
            .patch(id)
            .set({ views: totalViews + 1 })
            .commit();
    } catch (error) {
        console.error("Failed to update views:", error);
    }

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2"></div>
            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    );
};

export default View;
