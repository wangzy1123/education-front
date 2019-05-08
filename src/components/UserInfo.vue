<template>
    <div v-title data-title="个人信息" style="width: 60%; margin: 20px auto;">
      <Tabs value="name1">
        <TabPane label="个人信息" name="name1">
          <userEdit></userEdit>
        </TabPane>
        <TabPane label="我的教案" name="name2">
          <myTeach></myTeach>
        </TabPane>
        <TabPane label="我的课程" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
</template>

<script>
  import userEdit from './UserEdit.vue'
  import myTeach from './MyTeach.vue'
  export default {
    name: 'UserInfo',
    components: {
      'userEdit': userEdit,
      'myTeach': myTeach,
    }
  }
</script>

<style scoped>

</style>
