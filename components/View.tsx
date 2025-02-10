import { client } from '@/sanity/lib/client';
import { startup_view_query } from '@/sanity/lib/queries';
import React from 'react';

const View = async ({id}: {id: string}) => {
    const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(startup_view_query, { id });

    return <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
           
        </div>
        <p className='view-text'>
            <span className='font-balck'>
                Views : {totalViews}
            </span>
        </p>
    </div>
};

export default View;