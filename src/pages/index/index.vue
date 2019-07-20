<template>
  <div id="index">
	<section class="blog-post">
		<router-link class="item" v-for="blog in blogs" :to="`/detail/${blog.id}`" :key="blog.id">  <!--这里的blog怎么来的-->
			<figure class="avatar">
				<img :src="blog.user.avatar" :alt="blog.user.username">
				<figcaption>{{blog.user.username}}</figcaption>
			</figure>
			<h3>{{blog.title}}<span>{{blog.createdAt}}</span></h3>
			<p>{{blog.description}}</p>
		</router-link>
	</section>
	<div class="pagination">
	<el-pagination
	layout="prev, pager, next"
	:total="total"
	:current-page = "page"
	@current-change="onPageChange">
	</el-pagination>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style lang="less" src="./style.less" scoped></style>
