import { defineStore } from 'pinia'
import { usePostStore } from './post'
import {computed, ref} from "vue";

export const useCommentStore = defineStore('comment',()=>{
    const comments = ref([])
    
    const getPostComments = computed(()=>{
        const postStore = usePostStore()
        return comments.value.filter((comment) => comment.postId === postStore.post.id)
    })
    
    async function fetchComments(){
        this.comments = await fetch('https://jsonplaceholder.typicode.com/comments')
            .then((response) => response.json())
    }
    
    return {comments, getPostComments, fetchComments}
})

export const useCommentStore1 = defineStore({
    id: 'comment1',
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

