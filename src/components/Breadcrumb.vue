<template>
    <div class="example-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item,index) in breadList"
                :key="index"
                :to="{ path: item.path }"
            >{{item.meta.chName}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                breadList: [] // 路由集合
            };
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        },
        methods: {
            isHome(route) {
                return route.name === "home";
            },
            getBreadcrumb() {
                let matched = this.$route.matched;
                //如果不是首页
                // if (!this.isHome(matched[0])) {
                //     matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
                // }
                matched = matched.splice(1)
                let adminRoutes = this.getAdminRoutes()
                let fixBreadList = []
                if (matched.length == 0) {
                    return
                }
                let currentPath = matched[0].path
                currentPath.split("/").forEach((item) => {
                    if (!item) {
                        return;
                    }
                    for (const route of adminRoutes) {
                        if (item == route.name) {
                            if (!route.direct) {
                                route.path = ''
                            }
                            fixBreadList.push(route)
                        }
                    }
                })
                fixBreadList.push(matched[0])
                this.breadList = fixBreadList;
                // console.log('this.currentPath', currentPath, this.$router.options.routes)
            },
            getAdminRoutes() {
                for (const route of this.$router.options.routes) {
                    if (route.name == 'admin') {
                        return route.children
                    }
                }
                return []
            }
        },
        created() {
            this.getBreadcrumb();
        }
    };
</script>