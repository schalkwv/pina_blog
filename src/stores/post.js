import { defineStore } from 'pinia'
import {computed, ref} from "vue";


export const usePostStore = defineStore("post", ()=>{
  const posts = ref([])
  const post = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const getPostsPerAuthor = computed(()=>{
    return (authorId) => posts.value.filter((post) => post.userId === authorId)
  })
  async function fetchPosts(){
    this.posts = []
    this.loading = true
    try {
      posts.value = await fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  async function fetchPost(id) {
    post.value = null
    loading.value = true
    try {
      post.value = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((response) => response.json())
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  return ({posts, post, loading, error, fetchPosts, fetchPost, getPostsPerAuthor})
})

export const usePostStore1 = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    post: null,
    loading: false,
    error: null
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId) => state.posts.filter((post) => post.userId === authorId)
    }
  },
  actions: {
    async fetchPosts() {
      this.posts = []
      this.loading = true
      try {
        this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchPost(id) {
      this.post = null
      this.loading = true
      try {
        this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})