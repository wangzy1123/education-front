<template>
    <div>
        <div style="width: 30%; margin: 200px auto;">
            <Form :model="formItem" :label-width="80">
                <FormItem label="昵称">
                    <Input v-model="formItem.userName" placeholder="请输入昵称"></Input>
                </FormItem>
                <FormItem label="账号">
                    <Input v-model="formItem.userAccount" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="formItem.pwd" type="password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码">
                    <Input v-model="formItem.pwd2" type="password" placeholder="请输入确认密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" long @click="registUser">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import {regist} from '../server/server.js';
    export default {
        data () {
            return {
                formItem: {
                    userName: '',
                    userAccount: '',
                    pwd: '',
                    pwd2: ''
                }
            }
        },
        methods: {
            registUser() {
                if(this.formItem.userName == ''){
                    this.$Message.error({
                        content: "请输入昵称"
                    });
                    return;
                }
                if(this.formItem.userAccount == ''){
                    this.$Message.error({
                        content: "请输入账号"
                    });
                    return;
                }
                if(this.formItem.pwd == ''){
                    this.$Message.error({
                        content: "请输入密码"
                    });
                    return;
                }
                if(this.formItem.pwd2 == ''){
                    this.$Message.error({
                        content: "请输入确认密码"
                    });
                    return;
                }
                if(this.formItem.pwd !== this.formItem.pwd2){
                    this.$Message.error({
                        content: "密码和确认密码必须相同"
                    });
                    return;
                }

                regist(this.formItem).then(res => {
                    if(res.errorCode == 0){
                        this.$Message.success({
                            content: res.errorMessage
                        });
                        localStorage.setItem('loginUser', JSON.stringify(res.data));
                    }else{
                        this.$Message.error({
                            content: res.errorMessage
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
