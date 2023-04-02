import { defineStore } from 'pinia'
import { usePostStore } from './post'
import {computed, ref} from "vue";

export const useAuthorStore1 = defineStore({
    id: 'author',
    state: () => ({
        authors: []
    }),
    getters: {
        getPostAuthor: (state) => {
            const postStore = usePostStore()
            return state.authors.find((author) => author.id === postStore.post.userId)
        }
    },
    actions: {
        async fetchAuthors() {
            this.authors = await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
        }
    }
})

export const useAuthorStore = defineStore('author2',()=>{
    const authors = ref([])
    
    const getPostAuthor = computed(()=>{
        const postStore = usePostStore()
        return authors.value.find((author) => author.id === postStore.post.userId)
    })
    async function fetchAuthors(){
        this.authors = await fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
    }
    
    return {authors,getPostAuthor, fetchAuthors}
})