import {defineQuery} from "next-sanity";

export const startups_query = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
  _id,
    author -> {
      _id, image, bio, name 
    },
    category,
    title,
    views,
    description,
    image,
    slug,
    _createdAt, 
}
    `)