import { useState } from "react"
import { parseJwt, token } from "../service"

export const usePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState(parseJwt(token)?.user_id)
    const [category, setCategory] = useState('')
    const [slug, setSlug] = useState('')
    const [image, setImage] = useState('')
    const [timestamp, setTimestamp] = useState('')

    return [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage, timestamp, setTimestamp]
}