<template>
  <div class="mt-5">
    <div class="main-container">
      <header v-if="showHeader">
        <BHeader/>
      </header>

      <main v-if="showHeader" class="main-box mt-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <!-- <LibraryRegistrationForm /> -->
              <!-- <JSONLab /> -->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </main>

      <main v-else>
        <router-view />
      </main>

    </div>
  </div>

</template>

<script>
import BHeader from './components/BHeader.vue';

export default {
  name: 'App',
  components: { BHeader },
  computed: {
    showHeader() {
      const noHeader = ['CountBookAPI', 'GetAllBookAPI']
      return !noHeader.includes(this.$route.name)
    }
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
