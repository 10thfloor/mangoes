<template>
  <div>
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  // we use fetch() because we do not need to set data to this component
  fetch({ store, redirect }) {
    if (!store.state.user) {
      // return redirect('/')
    }
  }
}
</script>
