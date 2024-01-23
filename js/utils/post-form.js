import { setBackgroundImage, setFieldValues } from './common'

function setFormValues(form, formValues) {
  setFieldValues(form, '[name="title"]', formValues?.title)
  setFieldValues(form, '[name="author"]', formValues?.author)
  setFieldValues(form, '[name="description"]', formValues?.description)

  setFieldValues(form, '[name="imageUrl"]', formValues?.imageUrl) // hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return

  console.log('form:', form)
  setFormValues(form, defaultValues)
}
