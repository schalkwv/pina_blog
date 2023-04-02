import { defineStore } from 'pinia'
import { usePostStore } from './post'

export const useCommentStore = defineStore({
    id: 'comment',
    state: () => ({
        comments: []
    }),
    getters: {
        getPostComments: (state) => {
            const postStore = usePostStore()
            return state.comments.filter((comment) => comment.postId === postStore.post.id)
        }
    },
    actions: {
        async fetchComments() {
            this.comments = await fetch('https://jsonplaceholder.typicode.com/comments')
                .then((response) => response.json())
        }
    }
})