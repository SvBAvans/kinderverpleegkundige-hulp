<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import type { FetchError } from "ofetch";
import type { Patient } from "@prisma/client";

// definePageMeta({
//   middleware: "sidebase-auth",
// });

const errorMessage = ref("");
const error = ref(false);

const schema = toTypedSchema(
  object({
    firstName: string().min(1, { message: "Voornaam is verplicht" }),
    lastName: string().min(1, { message: "Achternaam is verplicht" }),
    patientId: string().min(1, { message: "PatientID is verplicht" }),
    dateOfBirth: string({ required_error: "Geboortedatum is verplicht" }).date(),
    diseaseProfile: string().min(1, { message: "Ziektebeeld is verplicht " }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField("firstName");
const { value: lastName } = useField("lastName");
const { value: patientId } = useField("patientId");
const { value: dateOfBirth } = useField("dateOfBirth");
const { value: diseaseProfile } = useField<string>("diseaseProfile");

async function createPatient(values: any) {
  values.dateOfBirth = new Date(values.dateOfBirth);
  const response = await $fetch<Patient>("/api/patients", { method: "post", body: values }).catch((e: FetchError) => {
    errorMessage.value = e.data.message;
    error.value = true;
  });

  if (error.value) {
    return;
  }

  if (!response) {
    errorMessage.value = "An error occurred";
    error.value = true;
    return;
  }

  navigateTo(`patients/${response.id}`);
}

const onSubmit = handleSubmit(async (values) => {
  createPatient(values);
});
</script>

<template>
  <div class="d-md-flex vh-100 justify-content-center align-items-center">
    <form @submit="onSubmit" class="intake-form col-sm-12 col-md-8 pe-0 ms-4 me-4 bg-light shadow rounded pt-1 pb-3">
      <div class="ms-4 me-4">
        <div class="mt-2">
          <label for="firstName" class="form-label">Voornaam:</label>
          <input class="form-control input-lg border border-secondary" :class="{ 'is-invalid': errors.firstName }" id="firstName" type="text" v-model="firstName" placeholder="Voornaam" />
          <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="mt-3">
          <label for="lastName">Achternaam:</label>
          <input class="form-control input-lg border border-secondary" :class="{ 'is-invalid': errors.lastName }" id="lastName" type="text" v-model="lastName" placeholder="Achternaam" />
          <div v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
        <div class="mt-3">
          <label for="patientID">Patient-ID:</label>
          <input class="form-control input-lg border border-secondary" :class="{ 'is-invalid': errors.patientId }" id="patientID" type="text" v-model="patientId" placeholder="Patient-ID" />
          <div v-if="errors.patientId" class="invalid-feedback">{{ errors.patientId }}</div>
        </div>
        <div class="mt-3">
          <label for="dateOfBirth">Geboortedatum:</label>
          <input class="form-control input-lg border border-secondary" :class="{ 'is-invalid': errors.dateOfBirth }" id="dateOfBirth" type="date" v-model="dateOfBirth" placeholder="Geboortedatum" />
          <div v-if="errors.dateOfBirth" class="invalid-feedback">{{ errors.dateOfBirth }}</div>
        </div>
        <div class="mt-3">
          <label>Ziektebeeld:</label>
          <textarea class="col-12" rows="5" :class="{ 'is-invalid': errors.diseaseProfile }" v-model="diseaseProfile" placeholder="Ziektebeeld"></textarea>
          <div v-if="errors.diseaseProfile" class="invalid-feedback">{{ errors.diseaseProfile }}</div>
        </div>
        <button class="intake-button btn btn-secondary btn-lg mt-3 col-12" type="submit">Afronden</button>
      </div>
    </form>
  </div>
</template>

<style>
@media screen and (min-width: 768px) {
  .intake-form {
    font-size: 25px;
  }

  input.form-control {
    font-size: 22px;
    padding: 15px;
  }

  button.intake-button {
    font-size: 25px;
  }
}
</style>
