<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { boolean, number, object, string } from "zod";
import type { FetchError } from "ofetch";
import type { Patient } from "@prisma/client";

definePageMeta({
  title: "Patient Intake",
});

const errorMessage = ref("");
const error = ref(false);

const diseaseProfiles = [
  "waterpokken",
  "mazelen",
  "rodehond",
  "bof",
  "kinkhoest",
  "scarlatina (rode hond)",
  "RS-virus",
  "longontsteking",
  "griep (influenza)",
  "oorontsteking",
  "bronchiolitis",
  "krentenbaard (impetigo)",
  "middenoorontsteking",
  "meningitis",
  "hand-voet-mondziekte",
  "gastro-enteritis",
  "mononucleosis (ziekte van Pfeiffer)",
];

const schema = toTypedSchema(
  object({
    firstName: string({ required_error: "Voornaam is verplicht" }),
    lastName: string({ required_error: "Achternaam is verplicht" }),
    patientId: string({ required_error: "PatientID is verplicht" }),
    dateOfBirth: string({ required_error: "Geboortedatum is verplicht" }).date(),
    diseaseProfile: string({ required_error: "Ziektebeeld is verplicht " }),
    roomNr: string({ required_error: "Kamer nummer is verplicht " }),
    isBaby: boolean().default(false),
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
const { value: roomNr } = useField<string>("roomNr");
const { value: isBaby } = useField<boolean>("isBaby");

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

const { data: roomData } = await useFetch("/api/availableRooms");

const onSubmit = handleSubmit(async (values) => {
  values.roomNr = values.roomNr.toString() as any;
  createPatient(values);
});
</script>

<template>
  <div class="intake-div d-md-flex justify-content-center align-items-center mt-5 mx-4">
    <form @submit="onSubmit" class="intake-form col-sm-12 col-md-8 pe-0 bg-light shadow rounded pt-1 pb-3">
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
        <div class="form-check form-switch mt-3">
          <label class="form-check-label" for="isBaby">Baby</label>
          <input class="form-check-input" type="checkbox" role="switch" id="isBaby" name="isBaby" v-model="isBaby" />
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
          <select class="form-select" id="diseaseProfile" :class="{ 'is-invalid': errors.diseaseProfile }" v-model="diseaseProfile">
            <option disabled value="">Selecteer een ziektebeeld</option>
            <option v-for="diseaseProfile in diseaseProfiles">{{ diseaseProfile }}</option>
          </select>
          <div v-if="errors.diseaseProfile" class="invalid-feedback">{{ errors.diseaseProfile }}</div>
        </div>
        <div class="mt-3">
          <label>Kamer Nummer:</label>
          <select class="form-select" :class="{ 'is-invalid': errors.diseaseProfile }" v-model="roomNr" id="roomNr">
            <option disabled value="">Selecteer een kamer</option>
            <option v-for="room in isBaby ? roomData?.neoRooms : roomData?.rooms" :key="room" :value="room">
              {{ room }}
            </option>
          </select>
          <div v-if="errors.roomNr" class="invalid-feedback">{{ errors.roomNr }}</div>
        </div>
        <button class="intake-button btn btn-primary btn-lg mt-3 col-12" type="submit">Afronden</button>
      </div>
    </form>
  </div>
</template>
