<template>
    <div class="users">
      <div class="buttons float-right">
        <input v-show="!isAddEditMode" v-on:click="addEditUser(undefined)" type="button" class="btn btn-info" value="+ Add User">
      </div>
      <br v-show="!isAddEditMode"/>
      <br v-show="!isAddEditMode"/>
      <div class="view-users" v-show="!isAddEditMode">
         <transition-group name="users" enter-active-class="animated flipInX" 
        leave-active-class="animated flipOutX"> 
          <div class="card" v-for="(userData, index) in users" :key="index">
            <div class="card-body">
                <h5 class="card-title">
                    {{ userData.name }}                    
                    <span class="float-right">
                        <a class="fa fa-pencil"></a>
                        <a v-on:click="addEditUser(userData)">&nbsp;Edit</a>
                        &nbsp;&nbsp;
                        <a class="fa fa-trash"></a>
                        <a v-on:click="deleteUser(userData.id)">&nbsp;Delete</a>
                    </span>
                    <hr/>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ userData.username }}</h6>
                <p v-if="userData.company"> <p class="card-text"><b>{{ userData.company.name}}</b>: &nbsp; {{ userData.company.catchPhrase}} </p> </p>
                <i class="fa fa-envelope"></i>&nbsp;&nbsp;<a v-bind:href="'mailto:' + userData.email"  class="card-link">{{ userData.email }}</a> 
                <br />
                <i class="fa fa-phone"></i>&nbsp;&nbsp;<a href="#" class="card-link">{{ userData.phone }}</a>
            </div>
            <br />
          </div>
         </transition-group>
        <br />     
        <transition name="no-users" enter-active-class="animated flipInX" 
        leave-active-class="animated lightSpeedOut"> 
          <div class="card" v-if="users.length === 0">
              <div class="card-body">
                  <h2><i class="fa fa-info"></i>&nbsp;&nbsp; {{ nodatamsg }}</h2> 
              </div>
          </div>
        </transition>
      </div>
      <transition name="addEdit-users" enter-active-class="animated bounceInLeft" 
            leave-active-class="animated bounceOutRight">
             <div class="addEdit-users" v-show="isAddEditMode">
                <h3 class="m-0"> {{ addEditUserHeader }} <a v-on:click="cancelAddEdit" class="cancelLink float-right">X</a></h3>
                <hr />
                <form>
                  <label>Name</label> <br />
                  <input type="text" name="name" v-model="user.name" maxlength="16" placeholder="Name" class="form-control">
                  <br />
                  <label>Username</label> <br />
                  <input type="text" name="username" v-model="user.username" maxlength="16" placeholder="Username" class="form-control">
                  <br />
                  <label>Email</label> <br />
                  <input type="email" name="email" v-model="user.email" maxlength="32" placeholder="Email" class="form-control">
                  <br />
                  <label>Phone</label> <br />
                  <input type="text" name="phone" v-model="user.phone" maxlength="16" placeholder="Phone" class="form-control">
                  <br />
                  <label>About Company</label> <br />
                  <input type="text" name="companyName" v-model="user.company.name" maxlength="16" placeholder="Company name" class="form-control">
                  <br />
                  <textarea name="companyPhrase" v-model="user.company.catchPhrase" maxlength="64" placeholder="Information about the company" class="form-control"></textarea>
                  <br />
                  <transition name="has-errors" enter-active-class="animated flipInX" 
                  leave-active-class="animated flipOutX"> 
                    <div class="card" v-if="hasError">
                        <div class="card-body">
                            <h4><i class="fa fa-info"></i>&nbsp;&nbsp; All fields are required <a v-on:click="closeErrorBox" class="cancelLink float-right">X</a></h4> 
                        </div>
                    </div>
                  </transition>
                  <br v-if="hasError" />
                  <input type="button" v-on:click="addUpdateUser" class="btn btn-primary w100" value="Submit">
                  &nbsp;&nbsp;
                  <input type="button" v-on:click="cancelAddEdit" class="btn btn-default w100" value="Cancel">
                  <br />
                  <br />
                </form>
            </div>
      </transition>     
    </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      users: [],
      user: {
        company: {
          name: "",
          catchPhrase: ""
        }
      },
      dataURI: "https://jsonplaceholder.typicode.com/users",
      nodatamsg: "No users found",
      isAddEditMode: false,
      addEditUserHeader: "Add User",
      hasError: false
    };
  },
  methods: {
    cancelAddEdit() {
      this.isAddEditMode = false;
    },
    addUser() {
      /// check the user object
      if (this.user) {
        /// post the user to add in the server
        fetch(this.dataURI, {
          method: "POST",
          body: JSON.stringify({
            user: {
              name: this.user.name,
              username: this.user.username,
              email: this.user.email,
              phone: this.user.phone,
              company: {
                name: this.user.company.name,
                catchPhrase: this.user.company.catchPhrase
              }
            }
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => response.json())
          .then(response => {
            /// push it in the UI
            this.user.id = this.users.indexOf(
              this.users[this.users.length - 1]
            );
            this.users.push(this.user);
            this.isAddEditMode = false;
          })
          .catch(err => {
            console.error(err);
            this.isAddEditMode = false;
          });
      }
    },
    updateUser() {
      /// check the user object
      if (this.user) {
        /// post the user to update in the server
        fetch(this.dataURI + "/" + this.user.id, {
          method: "POST",
          body: JSON.stringify({
            user: {
              id: this.user.id,
              name: this.user.name,
              username: this.user.username,
              email: this.user.email,
              phone: this.user.phone,
              company: {
                name: this.user.company.name,
                catchPhrase: this.user.company.catchPhrase
              }
            }
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => response.json())
          .then(response => {
            /// update in the UI
            /// get the user info...
            var tempUser = this.users.find(usr => usr.id === this.user.id);

            /// check for undefined...
            if (tempUser) {
              /// update...
              this.users[this.users.indexOf(tempUser)] = this.user;
              this.isAddEditMode = false;
            }
          })
          .catch(err => {
            console.error(err);
            this.isAddEditMode = false;
          });
      }
    },
    deleteUser(userId) {
      /// get the user info...
      var tempUser = this.users.find(usr => usr.id === userId);

      /// check for undefined...
      if (tempUser) {
        /// delete the users on load of the Vue app
        fetch(this.dataURI + "/" + tempUser.id, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(response => {
            /// delete from the UI
            this.users.splice(this.users.indexOf(tempUser), 1);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    addEditUser(userObj) {
      /// check the object
      if (userObj) {
        this.user = userObj;
        this.addEditUserHeader = "Update User";
      } else {
        this.user = {
          id: 0,
          company: {
            name: "",
            catchPhrase: ""
          }
        };
        this.addEditUserHeader = "Add User";
      }

      /// set the mode as ON
      this.isAddEditMode = true;
      this.hasError = false;
    },
    addUpdateUser() {
      /// check the user object
      if (this.user) {
        /// check for the data
        if (
          this.user.name &&
          this.user.username &&
          this.user.phone &&
          this.user.email &&
          this.user.company.name &&
          this.user.company.catchPhrase
        ) {
          this.hasError = false;
          this.user.id === 0 ? this.addUser() : this.updateUser();
        } else this.hasError = true;
      }
    },
    closeErrorBox() {
      /// close the error box...
      this.hasError = false;
    }
  },
  created() {
    /// Set the users on load of the Vue app
    fetch(this.dataURI)
      .then(response => response.json())
      .then(response => {
        this.users = response;
      });
  }
};
</script>

<style scoped>
a {
  font-size: 14px;
}
a.cancelLink {
  font-size: inherit;
}
.card {
  margin: 10px 0;
}
</style>

