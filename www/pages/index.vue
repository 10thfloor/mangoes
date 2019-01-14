<template>
  <el-container>
    <el-header>
      <div class="left-links">
        <nuxt-link to="/courses">Courses</nuxt-link>
        <nuxt-link to="/pre-work">Pre-Work</nuxt-link>
        <nuxt-link to="/faq">FAQ</nuxt-link>
      </div>
      <div class="right-links">
        <el-button type="primary" round>Continue Course</el-button>
      </div>
    </el-header>
    <el-main>
      <div class="title">
        <h1>
          <img src="/bclogo.svg">Blockchain School
        </h1>
        <p>Have fun and earn credentials while learning about the most important technology of the 21st century</p>
        <el-button type="primary" @click="login()">Enroll</el-button>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import * as blockstack from 'blockstack'

export default {
  methods: {
    login() {
      blockstack.redirectToSignIn()
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.user) {
      if (blockstack.isUserSignedIn()) {
        this.$store.commit('SET_USER', blockstack.loadUserData())
        redirect('/home')
      } else if (blockstack.isSignInPending()) {
        blockstack.handlePendingSignIn().then(userData => {
          redirect('/home')
        })
      }
    }
  }
}
</script>

<style scoped="true">
.el-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(-20deg, #88d3ce 0%, #6e45e2 100%);
}

.el-main {
  flex: 1;
  display: flex;
  align-items: center;
}

.title {
  color: hsla(176, 46%, 88%, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
}

.title h1 {
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  line-height: 4rem;
  text-align: center;
  font-weight: 600;
  font-style: normal;
  font-family: ibm-plex-sans, sans-serif;
  text-shadow: 2px 2px 0px hsla(176, 46%, 28%, 0.5);
}

.title h1 img {
  display: block;
  margin: 0 auto;
  width: 175px;
}

.title p {
  color: hsla(176, 46%, 78%, 1);
  font-style: normal;
  font-weight: 200;
  font-size: 1.5rem;
}

.title .el-button {
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1rem 4rem;
  width: 100%;
}

.el-header,
.el-footer {
  display: none;
}

@media screen and (min-width: 480px) {
}

@media screen and (min-width: 720px) {
  .el-header {
    display: flex;
    padding: 3rem;
    align-items: center;
    justify-content: space-between;
  }

  .el-header a {
    transition: color 0.3s;
    color: hsla(176, 46%, 88%, 1);
    text-decoration: none;
  }

  .el-header a:hover {
    color: white;
    text-shadow: 1px 1px 10px hsla(176, 46%, 28%, 0.5);
  }

  .left-links a {
    margin-right: 2rem;
  }

  .title {
    margin-left: 15%;
    justify-content: center;
  }

  .title h1 {
    flex-direction: row;
    align-items: center;
    font-size: 4rem;
  }

  .title h1 img {
    width: 75px;
    margin: 0 1rem 0 0;
    position: relative;
    top: 7px;
  }

  .title p {
    max-width: 640px;
    padding: 1rem 0.42rem;
    margin: 0 0 1rem 0;
  }

  .title .el-button {
    width: 50%;
    left: 0.42rem;
  }
}
</style>
