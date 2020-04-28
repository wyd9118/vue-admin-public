<template>
    <el-form class="login-container" :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username"></el-input>    
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password"  v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click.native.prevent="handlerLogin">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:'login',
    data(){
        const checkUsername = (rule,val,callback)=>{
            if(val){
                callback();
            }else{
                callback(new Error('请输入用户名'));
            }
        };
        const checkPassword = (rule,val,callback)=>{
            if(val){
                callback();
            }else{
                callback(new Error('请输入密码'));
            }
        };
        return {
            loginForm:{
                username:'wangyd',
                password:'123456'
            },
            rules:{
                username:[{validator:checkUsername,trigger:blur}],
                password:[{validator:checkPassword,trigger:blur}]
            },
            redirect:'',
            newQuery:{}
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(o){
                if(o&&o.query){ 
                    let query = o.query; 
                    this.redirect = o.query.redirect;
                    Object.keys(query).filter((v)=>{
                        return v!=='redirect';
                    }).forEach(v=>{
                        this.newQuery[v] = query[v];
                    }); 
                } 
            }    
        }
    },
    methods:{
        handlerLogin(){
            this.$refs.loginForm.validate((valid)=>{
                if(valid){
                    this.$store.dispatch('user/login',this.loginForm).then((res)=>{ 
                        if(!res){  
                            this.$router.push({path:this.redirect||'/',query:this.newQuery});
                        }else{
                            this.$alert(res);
                        }
                    }).catch((error)=>{
                        console.log(22,error);
                    });
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login-container{
        width:200px;
        margin:30px auto 0;
    }
</style>