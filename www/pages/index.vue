<template>
  <div>
    <h1>Vue, Ethereum, Blockstack, IPFS ...</h1>
    <pre>Connection status: {{ ping }}</pre>
  </div>
</template>

<style>
h1 {
  font-family: Arial;
}
</style>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    ping: {
      query: gql`
        {
          contracts: ping(who: "contracts")
          ipfs: ping(who: "ipfs")
          prisma: ping(who: "prisma")
        }
      `,
      update(data) {
        return data
      }
    }
  }
}
</script>