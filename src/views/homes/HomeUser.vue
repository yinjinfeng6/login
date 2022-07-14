<template>
  <div>
    <button @click="add(342)">添加</button>
    <button @click="sub(432)">减少</button>
    <p>{{ this.$store.state.count }}</p>
  </div>
</template>

<script>
export default {
  name: "HomeUser",
  methods:{
    add(a){
      this.$store.dispatch("asyncincrement",a)
    },
    sub(b){
      this.$store.commit("decrement",b)
    }
  }
};
</script>

<style scoped>
</style>