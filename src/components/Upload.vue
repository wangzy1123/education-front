<template>
  <div>
    <Modal :closable="false" :mask-closable="false"  v-model="showModel" >
      <Upload
        multiple
        type="drag"
        :data="formData"
        :on-success="handleSuccess"
        :format="['xls','xlsx']"
        :on-format-error="handleFormatError"
        action="http://localhost:8080/eba/rest/deviceHardware/uploadDevice">

        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传</p>
        </div>
      </Upload>
      <div slot="footer">
        <Button @click="closeModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'uploadFiles',
    props: {
      showModel:false,
    },
    data: function () {
      return {
        // 上传文件附加属性
        formData: {
          'userId':localStorage.userId
        },
      };
    },
    methods:{
      closeModal() {
        this.$emit('closeModal');//调用父类的方法
      },
      handleSuccess (res, file) {
        if (res.status == '200') {
          this.$Message.success({
            content:res.message
          })
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc:  file.name + ' 文件格式不对，请选择 xls or xlxs'
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .uploadFile{
    display: inline-block;
  }
</style>
