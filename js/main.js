import postApi from './api/postApi'

async function main() {
  try {
    const queryParams = {
      _page: 2,
      _limit: 6,
    }
    const data = await postApi.getAll(queryParams)
    console.log('main.js data', data)
  } catch (error) {
    console.log('get all failed', error)
  }
}

main()
