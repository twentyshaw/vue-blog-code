import auth from '@/api/auth'

const state = { //数据有什么？ 用户信息： 用户名 密码等,考虑不全没关系 可以用的时候再来修改与补充
	user: null,
	isLogin: false
}

const getters = {
	user: state => state.user,
	isLogin: state => state.isLogin
}

const mutations = { //操作同步状态，就是对当前的状态进行修改
	setUser(state, payload){  // state是存放数据的盒子，payload是我们想往里放的数据
		state.user = payload.user
	},

	setLogin(state, payload){
		state.isLogin = payload.isLogin
	}
}

const actions = { 
	login({commit}, {username, password}){ //commit是调用mutation时会用到的方法（是必须的）。后面的大括号里面是我们要传给action的参数，相当于username：'username'
		return auth.login({username, password})
		  .then(res => {
		  	commit('setUser', {user:res.data})
		  	commit('setLogin', {isLogin: true})
		  })
	},

	async register({commit}, {username, password}){
		let res = await auth.register({username, password}) //异步的写法，和上面意思相同。 res就是auth.register这个promise执行之后then的结果
		commit('setUser', {user: res.data})
		commit('setLogin', {isLogin: true})
		return res.data // 为什么这里要返回res.data？？ 
	},

	async getInfo({commit, state}){
		if (state.isLogin) return true
		let res = await auth.getInfo() //如果 state.isLogin 为 false 才执行这行代码
		commit('setLogin', {isLogin: res.isLogin})
		if (!res.isLogin) return false
		commit('setUser', {user: res.data})
		return true
	},

	async logout({commit, state}){
		await auth.logout()
		commit('setUser', {user: null})
		commit('isLogin', {isLogin: false})
	}

}

export default{
	state,
	getters,
	mutations,
	actions
}