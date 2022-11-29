const BASE_URL = process.env.NEXT_PUBLIC_WP_URL

const post_url = BASE_URL + '/wp-json/wp/v2/posts'
const media_url = BASE_URL + '/wp-json/wp/v2/media'

export const getPosts = async () => {
  const response = await fetch(post_url)

  //? console.log(response)

  const result = await response.json()

  //? console.log(result)

  return result
}

export const getMedia = async (id) => {
  const response = await fetch(`${media_url}/${id}`)

  //? console.log(response)

  const result = await response.json()

  //? console.log(result)

  return result

}

export const getPostsWImg = async () => {

  const posts_fetch = await getPosts()

  const posts = posts_fetch.map(async (post) => {
    const {
      featured_media
    } = post
    const preview_img_response = await getMedia(featured_media)
    const preview_img = preview_img_response["source_url"]
    const result = {
      ...post,
      preview_img
    }
    return result
  })
  return Promise.all(posts)

}

export const getPostBySlug = async (slug) => {
  const response = await fetch(`${post_url}?slug=${slug}`)
  const result = await response.json()

  const {
    featured_media
  } = result[0]
  const preview_img_response = await getMedia(featured_media)
  const preview_img = preview_img_response["source_url"]

  return {
    ...result[0],
    preview_img
  }
}