import dayjs from 'dayjs'
import postApi from './api/postApi'
import { registerLightbox, setTextContent } from './utils'

function renderPostDetail(post) {
  if (!post) return

  // render title
  // render description
  // render author
  // render updateAt
  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm')
  )

  // render hero image (imageUrl)
  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`

    heroImage.addEventListener('error', () => {
      heroImage.src = 'https://placehold.co/1368x400?text=thumbnail'
    })
  }
  // render edit page link
  const editPageLink = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    // editPageLink.textContent = 'Edit Post'
    editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit Post'
    editPageLink.style.color = `#dc1b1b`
  }
}

;(async () => {
  registerLightbox()
  // get post id form URL
  // fetch post detail API
  // render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')
    if (!postId) {
      console.log('Post not found')
      return
    }

    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('failed to fetch post detail', error)
  }
})()
