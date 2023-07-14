<template>
	<el-container class="height-all">
  		<el-header>
			<div class='sys-title'>后台管理系统</div>
			<!-- <div class='header-right'>
				<span>网站首页</span>
				<span>头像</span>
				<span>admin</span>
				<span>退出</span>
			</div> -->
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :router='true' active-text-color='#ffd04b' class="height-all">
					<el-submenu index='/goods'>
						<template slot='title'>
							<span>商品管理</span>
						</template>
						<el-menu-item index='/goods/category'>品类管理</el-menu-item>
						<el-menu-item index='/goods/manage'>商品列表</el-menu-item>
					</el-submenu>
					<el-menu-item index="/admin/comment">
						<template slot='title'>
							<span>评论管理</span>
						</template>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<v-bread></v-bread>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<style>

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
    
    .el-aside {
      color: #333;
	  background-color: #333744;
    }

	.height-all {
		height: 100%;
	}

	.el-main {
		background-color: #eaedf1;
	}

    .header-right {
      margin-right: 26px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  </style>
  
  <script>
	import Breadcrumb from '@/components/Breadcrumb.vue';
    export default {
		components: {
			'v-bread' : Breadcrumb
		},
		data() {
			return {
			
			}
		},
		methods:{      
			  
		}
    };
  </script>
  
  