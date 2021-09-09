<template>
   <v-app>
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Форма регистрации</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="form" v-model="valid" @submit.prevent="registration">
                           <v-text-field
                              v-model="lastname"
                              :counter="20"
                              :rules="nameRules"
                              name="lastname"
                              label="Фамилия"
                              type="text"
                              required
                           ></v-text-field>
                           <v-text-field
                              v-model="firstname"
                              :counter="20"
                              :rules="nameRules"
                              name="firstname"
                              label="Имя"
                              type="text"
                              required
                           ></v-text-field>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                name="email"
                                label="Email"
                                type="text"
                                required
                            ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          :disabled="!valid"
                          color="success"
                          class="mr-4"
                          v-on:click="registration()"
                        >Регистрация</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
      <v-alert
         class="alert"
         :value="alertFlag"
         border="top"
         :color="alertColor"
         style="position: absolute; top: 0; right: 0; max-width: 300px; margin: 20px;"
      >{{ alertMessage }}</v-alert>
   </v-app>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Заполните поле',
        v => (v && v.length <= 10) || 'Размер поля не должен превышать 20 символов',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Введите Email',
        v => /.+@.+\..+/.test(v) || 'Неверный Email',
      ],
      alertFlag: false,
      alertColor: 'red',
      alertMessage: 'Произошла ошибка',
    }),

    methods: {
      registration () {
         let data = { firstname: this.firstname, lastname: this.lastname, email: this.email }
         fetch('/registration', {
            method: 'POST',
            body:JSON.stringify(data)
         })
         .then((response) => {
            if (!response.ok) {
               this.showErrorAlert();
            }
   
            if (response.status == 400) {
               return response.json().then((data) => {
                  let message = data.message;
                  this.showErrorAlert(message);
               });
            }

            if (response.ok) {
               return response.json().then((data) => {
                  let message = data.message;
                  this.showSuccesAlert(message);
               });
            }
         })
         .catch(function (error) {
            console.log(error);
         });
      
      },
      showSuccesAlert (message) {
         this.showAlert(message, 'green');
      },
      showErrorAlert (message) {
         if (!message) {
            message = 'Произошла ошибка';
         }
         this.showAlert(message, 'red');
      },
      showAlert(message, color) {
         this.alertMessage = message;
         this.alertColor = color;
         this.alertFlag = true;
         setTimeout(() => {
            this.alertFlag = false
         }, 5000)
      }
    }
  }
</script>