<script setup lang="ts">
import { object, string } from "zod";

const schema = toTypedSchema(
  object({
    email: string().min(1, { message: "Email is verplicht" }).email({ message: "Ongeldig email" }),
    password: string().min(1, { message: "Wachtwoord is verplicht" }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const onSubmit = handleSubmit((values) => {
  alert("Submitted");
  console.log(values);
});
</script>

<template>
  <div class="d-flex vh-100 justify-content-center align-items-center">
    <form @submit="onSubmit" class="login-form ms-4 me-4 bg-light shadow p-3 rounded">
      <div>
        <input class="form-control input-lg col-12 border border-secondary" :class="{ 'is-invalid': errors.email }" name="email" type="email" v-model="email" placeholder="Email" />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="mt-3">
        <input class="form-control input-lg col-12 border border-secondary" :class="{ 'is-invalid': errors.password }" name="password" type="password" v-model="password" placeholder="Wachtwoord" />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <button class="login-button btn btn-secondary btn-lg mt-3 col-12" type="submit">Login</button>
    </form>
  </div>
</template>

<style>
.login-form {
  width: 100%;
  max-width: 400px;
}

@media screen and (min-width: 768px) {
  .login-form {
    width: 100%;
    max-width: 600px;
    font-size: 25px;
  }

  input.form-control {
    font-size: 20px;
    padding: 15px;
  }

  button.login-button {
    padding: 15px;
    font-size: 25px;
  }
}
</style>
