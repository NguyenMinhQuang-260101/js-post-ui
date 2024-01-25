import postApi from './api/postApi'
import { initPostForm } from './utils'

async function handlePostFormSubmit(formValues) {
  try {
    // check add/edit
    // S1: base on search params (check id)
    // S2: check id in formValues
    // call API
    const savePost = formValues.id
      ? await postApi.update(formValues)
      : await postApi.add(formValues)

    // show success message
    // redirect to detail page
    window.location.assign(`/post-detail.html?id=${savePost.id}`)
    // console.log('redirect to', savePost.id)
  } catch (error) {
    console.log('failed to save post', error)
  }
}

// MAIN
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    let defaultValues = Boolean(postId)
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }

    initPostForm({
      formId: 'postForm',
      defaultValues: defaultValues,
      onSubmit: handlePostFormSubmit,
    })
  } catch (error) {
    console.log('failed to fetch post details: ', error)
  }
})()
