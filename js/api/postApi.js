import axiosClient from './axiosClient'

// import: default import, name import
// export: default import, name import
// default: can use your name --> have one default export ONLY
// named export: use exactly name --> have multiple exports

// name import
// export function getAll(params) {
//   const url = '/posts'
//   return axiosClient.get(url, { params })
// }

// export function getById(id) {
//   const url = `/posts/${id}`
//   return axiosClient.get(url)
// }

// Default import
const postApi = {
  getAll(params) {
    const url = '/posts'
    return axiosClient.get(url, { params })
  },

  getById(id) {
    const url = `/posts/${id}`
    return axiosClient.get(url)
  },

  add(data) {
    const url = `/posts`
    return axiosClient.post(url, data)
  },

  update(data) {
    const url = `/posts/${data.id}`
    return axiosClient.patch(url, data)
  },

  remove(id) {
    const url = `/posts/${id}`
    return axiosClient.delete(url, data)
  },
}

export default postApi
