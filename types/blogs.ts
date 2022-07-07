export interface BlogsProps {
    blogsData: {
        total_pages?:number
        count?: number
        current?: number
        next?: number
        previous: number
        page_size?: number
        result: BlogsResult[]
    }
    
}

export interface BlogsResult {
    id:number
    likes:number
    views:number
    created_at: string
    author:AuthorResult[]
    updated_at:string
    deleted_at:string
    status:string
    is_deleted:boolean
    title: string
    slug:string
    content: string
    image: string
    comment:boolean
    is_active: boolean
    category: string
    published_status:string
    tags:string
}

export interface AuthorResult{
    first_name:string
    last_name:string
    profile_image:string
}

export interface BlogDetailProps {
    blog: { 
        data: {
            id:number
            category: string
            content: string
            image: string
            is_active: boolean
            title: string
            created_at: string
            author: number
            likes: number
            views: number
            slug:string
        }
        is_liked: boolean
    }
}