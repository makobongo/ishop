<template>
  <div class="products">
    <b-container>
      <p>product template</p>
      <hr />
      <b-button variant="primary" class="float-right" @click="modalShow" size="sm">Add product</b-button>
      <br />
    </b-container>
    <b-container class="mt-3">
       <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <th scope="row">1</th>
      <td>{{item.name}}</td>
      <td>{{item.price}}</td>
      <td>
        <!-- <b-button @click="editProduct(prod)" variant="danger" size="sm">edit</b-button>&nbsp; -->
        <b-button @click="editProduct(item)" variant="danger" size="sm">edit</b-button>&nbsp;
        <b-button @click="deleteProduct(item)" variant="primary" size="sm">delete</b-button>
      </td>
    </tr>
  </tbody>
</table>
  <b-modal ref="my-modal" hide-footer>
    <b-form-input v-model="product.name" type="text" placeholder="Enter product"></b-form-input>
        <br />
        <b-form-input v-model="product.price" type="text" placeholder="Enter price"></b-form-input>
        <br />
        <vue-editor v-model="product.description"></vue-editor>
        <!-- <b-form-textarea
          id="textarea-rows"
          placeholder="Tall textarea"
          rows="8"
          v-model="product.description"
        ></b-form-textarea> -->
        <br />
        <b-form-input @keyup.188="addTag" v-model="tag" type="text" placeholder="Enter tags"></b-form-input>
        <br />
        <b-form-file
          @change="uploadImage"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        <br />
        <div width="80px" v-for="image in product.image" :key="image.id">
        </div>
        <br />
        <b-button variant="primary" size="sm" class="float-right" v-if="modal === 'new'" @click="addProduct">Add</b-button>
        <b-button variant="primary" size="sm" class="float-right" v-if="modal ==='edit'" @click="updateProduct">Apply changes</b-button>
  </b-modal>
    </b-container>
  </div>
</template>

<script>
import {fb, db} from "../firebase"
import { VueEditor } from "vue2-editor";
export default {
  name: 'products',
  data() {
    return{
      product: {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: []
      },
        tag: null,
        items: [],
        show: false,
        modal: null
    }
  },
  firestore() {
    return {
      items: db.collection('Products')
    }
  },
  methods: {
    uploadImage(e) {
      // console.log(e.target.files[0]);
      let file = e.target.files[0];
      var storageRef = fb.storage().ref('Products/'+ file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on('state_changed', (snapshot) => {
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // this.product.image = downloadURL;
          this.product.images.push(downloadURL);
          console.log('File available at', downloadURL);
        });
      });
    },
    updateProduct(){
      // console.log(this.product.id);
      this.$firestore.items.doc(this.product.id).update(this.product)
      this.$refs['my-modal'].hide()
      Toast.fire({
            type: 'success',
            title: 'successfully updated'
          })
    },
    editProduct(item){
      this.modal= "edit"
      this.product = item;
      this.$refs['my-modal'].show()
    },
    deleteProduct(item){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          // console.log(item.id);
          this.$firestore.items.doc(item.id).delete()
          Toast.fire({
            type: 'success',
            title: 'successfully deleted'
          })
        }
      })
    },
    modalShow(){
      this.modal = "new";
      this.$refs['my-modal'].show()
    },
    addProduct() {
      this.$firestore.items.add(this.product)
      this.$refs['my-modal'].hide()
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    }
  },
  components: {
    VueEditor
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
