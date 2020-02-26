<template>
<el-collapse-item :title="info.UserName" :name="info.UserID">
  <TeammateBase :teammate="info"></TeammateBase>
</el-collapse-item>
</template>

<script>
import TeammateBase from '@/components/Team/TeammateBase.vue'

export default {
  props: {
    info: Object
  },
  components: {
    TeammateBase
  }
}
</script>
