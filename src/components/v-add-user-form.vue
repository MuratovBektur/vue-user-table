<template>
  <div
    class="v-add-form mt-4 px-4"
    data-aos="fade-down"
    data-aos-duration="200"
  >
    <div class="row">
      <div class="mb-3 col-lg-3">
        <label for="exampleInputId1" class="form-label">Id</label>
        <input
          type="number"
          class="form-control"
          id="exampleInputId1"
          aria-describedby="idHelp"
          v-model.number="form.id"
          @input="formValidate('id')"
          @blur="formValidate('id')"
        />
        <div v-if="errors.id.active" id="idHelp" class="form-text text-danger">
          {{ errors.id.text }}
        </div>
      </div>

      <div class="mb-3 col-lg-3">
        <label for="exampleInputFirstName1" class="form-label"
          >First Name</label
        >
        <input
          class="form-control"
          id="exampleInputFirstName1"
          aria-describedby="firstNameHelp"
          v-model="form.firstName"
          @input="formValidate('firstName')"
          @blur="formValidate('firstName')"
        />
        <div
          v-if="errors.firstName.active"
          id="firstNameHelp"
          class="form-text  text-danger"
        >
          {{ errors.firstName.text }}
        </div>
      </div>

      <div class="mb-3 col-lg-3">
        <label for="exampleInputLastName1" class="form-label">Last Name</label>
        <input
          class="form-control"
          id="exampleInputLastName1"
          aria-describedby="lastNameHelp"
          v-model="form.lastName"
          @input="formValidate('lastName')"
          @blur="formValidate('lastName')"
        />
        <div
          v-if="errors.lastName.active"
          id="lastNameHelp"
          class="form-text  text-danger"
        >
          {{ errors.lastName.text }}
        </div>
      </div>

      <div class="mb-3 col-lg-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="form.email"
          @input="formValidate('email')"
          @blur="formValidate('email')"
        />

        <div
          v-if="errors.email.active"
          id="emailHelp"
          class="form-text  text-danger"
        >
          {{ errors.email.text }}
        </div>
      </div>

      <div class="mb-3 col-lg-3">
        <label for="exampleInputPhone1" class="form-label">Phone</label>
        <input
          v-mask="'(999)999-9999'"
          class="form-control"
          id="exampleInputPhone1"
          aria-describedby="phoneHelp"
          v-model="form.phone"
          @input="formValidate('phone')"
          @blur="formValidate('phone')"
        />

        <div
          v-if="errors.phone.active"
          id="phoneHelp"
          class="form-text  text-danger"
        >
          {{ errors.phone.text }}
        </div>
      </div>

      <div class="d-flex justify-content-center ">
        <button
          @click="submit"
          :disabled="!canSubmit"
          :class="['btn', canSubmit ? 'btn-primary' : 'btn-secondary']"
        >
          Добавить в таблицу
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      },
      errors: {
        id: {
          text: null,
          active: false,
        },
        firstName: {
          text: null,
          active: false,
        },
        lastName: {
          text: null,
          active: false,
        },
        email: {
          text: null,
          active: false,
        },
        phone: {
          text: null,
          active: false,
        },
      },
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    formValidate(prop) {
      if (prop === "id") {
        switch (this.form.id) {
          case null:
          case undefined:
          case "":
            this.errors.id.active = true;
            this.errors.id.text = "Поле айди не может быть пустым";
            break;
          case "e":
            this.errors.id.active = true;
            this.errors.id.text = "123";
            break;
          default:
            this.errors.id = {
              text: null,
              active: false,
            };
            break;
        }
      } else if (prop === "firstName") {
        const firstName = this.form.firstName;
        if (firstName == null || firstName === "") {
          this.errors.firstName.active = true;
          this.errors.firstName.text = "Поле имени не может быть пустым";
          return;
        }
        if (firstName.length < 3) {
          this.errors.firstName.active = true;
          this.errors.firstName.text = "Поле имени не может короче 3 букв";
          return;
        }

        this.errors.firstName = {
          text: null,
          active: false,
        };
      } else if (prop === "lastName") {
        const lastName = this.form.lastName;
        if (lastName == null || lastName === "") {
          this.errors.lastName.active = true;
          this.errors.lastName.text = "Поле фамилии не может быть пустым";
          return;
        }
        if (lastName.length < 3) {
          this.errors.lastName.active = true;
          this.errors.lastName.text = "Поле фамилии не может короче 3 букв";
          return;
        }

        this.errors.lastName = {
          text: null,
          active: false,
        };
      } else if (prop === "email") {
        const email = this.form.email;
        console.log(email);
        if (email == null || email === "") {
          this.errors.email.active = true;
          this.errors.email.text =
            "Поле электронной почты не может быть пустым";
          return;
        }
        if (!this.validateEmail(email)) {
          this.errors.email.active = true;
          this.errors.email.text =
            "Поле электронной почты должен быть валидным";
          return;
        }

        this.errors.email = {
          text: null,
          active: false,
        };
      } else if (prop === "phone") {
        const phone = this.form.phone;
        console.log("phone", phone);
        if (phone == null || phone === "") {
          this.errors.phone.active = true;
          this.errors.phone.text = "Поле телефона не может быть пустым";
          return;
        }
        if (phone[12] === "_") {
          this.errors.phone.active = true;
          this.errors.phone.text = "Поле телефона должен быть валидным";
          return;
        }

        this.errors.phone = {
          text: null,
          active: false,
        };
      }
    },
    submit() {
      this.$emit("add-user", this.form);
    },
  },
  computed: {
    canSubmit() {
      return (
        Object.values(this.form).every((v) => v != null && v !== "") &&
        Object.values(this.errors).every((v) => v.active == false)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-add-form {
}
</style>
