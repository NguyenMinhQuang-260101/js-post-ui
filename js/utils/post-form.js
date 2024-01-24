import { setBackgroundImage, setFieldValues, setTextContent } from './common'

function setFormValues(form, formValues) {
  setFieldValues(form, '[name="title"]', formValues?.title)
  setFieldValues(form, '[name="author"]', formValues?.author)
  setFieldValues(form, '[name="description"]', formValues?.description)

  setFieldValues(form, '[name="imageUrl"]', formValues?.imageUrl) // hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

function getFormValues(form) {
  const formValues = {}

  // S1: query each input and add to value object
  // ;['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`)
  //   if (field) formValues[name] = field.value
  // })

  // S2: using form data
  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }

  return formValues
}

function getTitleError(form) {
  const titleElement = form.querySelector('[name="title"]')
  if (!titleElement) return

  // required
  if (titleElement.validity.valueMissing) return 'Please enter title.'

  // at least two words
  if (titleElement.value.split(' ').filter((x) => !!x && x.length >= 3).length < 2) {
    return 'please enter at least two words of 3 characters'
  }
  return ''
}

function validationPostForm(form, formValues) {
  // get errors
  const errors = {
    title: getTitleError(form),
    // author: getAuthorError(form)
    // ...
  }

  // set errors
  for (const key in errors) {
    const element = form.querySelector(`[name="${key}"]`)
    if (element) {
      element.setCustomValidity(errors[key])
      setTextContent(element.parentElement, '.invalid-feedback', errors[key])
    }
  }

  // add was-validated class to form element
  const isValid = form.checkValidity()
  if (!isValid) form.classList.add('was-validated')
  return false
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return

  setFormValues(form, defaultValues)

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    // get form values
    const formValues = getFormValues(form)
    console.log(formValues)

    // validation
    // if valid trigger submit callback
    // otherwise, show validation errors

    if (!validationPostForm(form, formValues)) return
  })
}
