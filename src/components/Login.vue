<template>
  <div class="login">
    <div>
        <b-modal id="modal-center" centered title="BootstrapVue" hide-footer hide-header>
            <b-container>
                <b-tabs content-class="mt-3">
                <b-tab title="Login" active>
                    <b-form-input v-model="email" type="text" placeholder="Enter your email"></b-form-input>
                    <br />
                    <b-form-input v-model="password" @keyup.enter="login" type="password" placeholder="Enter your password"></b-form-input>
                    <br />
                    <b-button variant="primary" @click="login" block size="sm">login</b-button>
                </b-tab>
                <b-tab title="Register">
                    <br />
                    <b-form-input type="text" v-model="username" placeholder="Enter your username"></b-form-input>
                    <br />
                    <b-form-input type="text" v-model="phone" placeholder="Enter your phone number"></b-form-input>
                    <br />
                    <b-form-input type="text" v-model="email" placeholder="Enter your email"></b-form-input>
                    <br />
                    <b-form-input type="password" v-model="password" placeholder="Enter your password"></b-form-input>
                    <br />
                    <b-button variant="dark" @click="register" block size="sm">Register</b-button>
                </b-tab>
            </b-tabs>
            </b-container>
        </b-modal>
    </div>
  </div>
</template>

<script>
import {fb} from '../firebase'
export default {
  name: 'login',
  data() {
      return {
          username: null,
          phone: null,
          email: null,
          password: null
      }
  },
  methods: {
      login() {
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
              this.$router.replace('admin');
          })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
      },
      register(){
              fb.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then((user) => {
                  this.$router.replace('admin');
              })
              .catch(function(error) {
            // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
                } else {
                alert(errorMessage);
                }
                console.log(error);
            // [END_EXCLUDE]
         });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
