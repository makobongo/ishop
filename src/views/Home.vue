<template>
  <div>
    <Navbar />
    <b-container>
      <b-row class="mt-4">
        <b-col sm="12">
          <Hero />
        </b-col>
      </b-row>
    </b-container>
    <Product />
    <About />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Product from '@/components/sections/Products.vue'
import About from '@/components/sections/About.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Hero,
    Product,
    About,
    Login
  }
}
</script>
