import {defineQuery} from "next-sanity";

export const startups_query = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search ] | order(_createdAt desc){
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
export const startups_query_by_id = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bin
  },
    view,
    description,
    category,
    image
}
    `)