import blog from '@/api/blog'

export default {
  data () {
    return {
    	blogs:[],
    	user:{},
    	page:1,
    	total:0
    }
  },

  created(){
  	this.userId = this.$route.params.userId
    this.page = this.$route.query.page || 1
  	blog.getBlogsByUserId(this.userId, {page:this.page})
  	  .then(res=>{
  	  	console.log(res)
  	  	this.page = res.page
  	  	this.total = res.total
  	  	this.blogs = res.data
  	  	if (res.data.length > 0) {
  	  		this.user = res.data[0].user
  	  	}
  	  })     
  },

  methods:{
    splitDate(dataStr){
      let dateObj = typeof dateStr === 'object'?dateStr:new Date(dataStr)
      return{
        date: dateObj.getDate(),
        month:dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    },

    onPageChange(clickedPage){
      blog.getBlogsByUserId(this.userId,{page:clickedPage}).then(res=>{
      console.log(res.page)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
      this.$router.push({path:`/user/${this.userId}`, query:{page:clickedPage}})
    })
    }
  }
}