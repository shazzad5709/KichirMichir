import axio from "axios"

const fetcher = (url: string) => axio.get(url).then((res) => res.data)

export default fetcher