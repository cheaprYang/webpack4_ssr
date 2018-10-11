<template>
    <div class="login">
        <div class="login-bg">

        </div>
        <div class="login-wrapper">
                <h3 class="login-title">
                     欢迎使用
                    <br/>
                    ICE 内容管理系统登录


                </h3>
               <div class="login-form">
                        <h2 class="login-form-title">登录</h2>
                    <div class="login-form-wrapper">
                        <at-input v-model="inputValue4" size="large" placeholder="请输入内容">
                            <template slot="prepend">
                                <i class="icon  icon-user"></i>
                            </template>
                        </at-input>
                        <at-input v-model="inputValue4" size="large" placeholder="请输入内容">
                            <template slot="prepend">
                                <i class="icon icon-lock"></i>
                            </template>
                        </at-input>
                        <at-checkbox v-model="checkboxValue1" label="深圳">记住账号</at-checkbox>
                        <div class="login-btn">
                            <at-button>登录</at-button>
                        </div>
                        <div class="login-link">
                            <a href="/">立即注册</a>
                            <span>|</span>
                            <a href="/">忘记密码</a>
                        </div>
                    </div>
               </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                inputValue4:'',
                checkboxValue1:''
            }
        }
    }
</script>

<style  lang="scss">
    $backgroundImage:'../../assets/login/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
 .login{
     position: relative;
     height: 100%;
     width: 100%;
     &-bg{
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         height: 100%;
         width: 100%;
         background: url($backgroundImage) no-repeat;
         background-size: 100%;
     }
     &-wrapper{
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         max-width: 1080px;
         margin: 0 auto;
         display: flex;
         justify-content: space-around;
         align-items: center;
     }
     &-title{
         text-align: center;
         color: #fff;
         font-size: 36px;
         letter-spacing: 2px;
         line-height: 48px;
     }
     &-form{
         display: flex;
         justify-content: center;
         flex-direction: column;
         padding: 30px 40px;
         background: rgb(255, 255, 255);
         border-radius: 6px;
         box-shadow: rgb(238, 238, 238) 1px 1px 2px;
         &-title{
             margin: 0px 0px 20px;
             text-align: center;
             color: rgb(48, 128, 254);
             letter-spacing: 12px;
         }
         &-wrapper{
             min-width: 240px;
            .at-input{
                margin-bottom: 15px;
                border-bottom:1px solid #dcdcdc ;
                padding-bottom: 3px;
            }
             .at-input-group__prepend,.at-input__original{
                 border: 0;
             }
             .at-input-group__prepend{
                 font-size: 14px;
                 background-color: transparent;
             }
             .login-btn{
                 margin-top: 15px;
                 &>button{
                     width: 240px;
                     background: rgb(48, 128, 254);
                     border-radius: 28px;
                     color: #fff;
                     border: 0;
                     outline:none;
                 }
                 span{
                     font-size: 16px;
                 }
             }
             .login-link{
                 margin-top: 15px;
                 &>a{
                     color: rgb(153, 153, 153);
                     text-decoration: none;
                     font-size: 13px;
                 }
                 &>span{
                     color: rgb(220, 214, 214);
                     margin: 0px 8px;
                 }
             }
         }
     }
 }
</style>
