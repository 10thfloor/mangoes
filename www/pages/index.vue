<template>
  <pre>{{ ping }}</pre>
</template>

<script>
import gql from "graphql-tag";

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
        return data;
      }
    }
  }
};
</script>