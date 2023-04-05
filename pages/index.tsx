import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"

export const config ={
  unstable_runtimeJS:false
}

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="জীবনে কি ঘটছে?" />
      <PostFeed />
    </>
  )
}
