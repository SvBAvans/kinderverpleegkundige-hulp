<script setup lang="ts">
import type { FetchError } from "ofetch";
import type { Patient } from "@prisma/client";

definePageMeta({
  title: "Patient Details",
});

const errorMessage = ref("");
const error = ref(false);
const route = useRoute();

const patientId = route.params.id;

const { data: patient } = await useFetch<Patient>(`/api/patients/${patientId}`);

async function deletePatient() {
  const response = await $fetch<Patient>(`/api/patients/${patientId}`, { method: "delete" }).catch((e: FetchError) => {
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

  navigateTo(`/addPatients`);
}

async function confirmDelete() {
  const userConfirmed = confirm("Weet je zeker dat je deze patient wilt ontslaan?");

  if (userConfirmed) {
    await deletePatient();
  }
}
</script>

<template>
  <div class="page-container mt-5">
    <div class="patient-header mb-3">
      <div class="user-profile rounded-circle text-white d-flex justify-content-center align-items-center" style="width: 60px; height: 60px">{{ patient?.firstName.charAt(0) }}{{ patient?.lastName.charAt(0) }}</div>
      <div>
        <h2 class="h5 mb-1">{{ patient.firstName }} {{ patient.lastName }}</h2>
        <p>Kamernummer: {{ patient.roomNr }}</p>
        <p class="mb-0">Geboortedatum: {{ new Date(patient.dateOfBirth).toLocaleDateString() }}</p>
      </div>
    </div>

    <div class="divider"></div>
    <div>
      <NuxtLink :to="`/patients/${patientId}/medicalLogbook`" class="btn btn-primary mb-3 col-12">Medisch logbook</NuxtLink>
    </div>
    <section class="mb-3">
      <h3 class="h6">Ziektebeeld:</h3>
      <p>{{ patient.diseaseProfile }}</p>
    </section>

    <div class="divider"></div>

    <section class="mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="h6">Medicatie</h3>
        <NuxtLink class="plus-icon" :to="`/patients/${patientId}/addMedicine`">
          <Icon name="material-symbols:add-2"></Icon>
        </NuxtLink>
      </div>
      <div class="accordion" id="medicationAccordion">
        <div v-for="perscription in patient.persciptions" class="accordion-item">
          <h2 class="accordion-header" :id="'heading-' + perscription.id">
            <button class="accordion-button collapsed" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse-' + perscription.id" aria-expanded="false" :aria-controls="'collapse-' + perscription.id">
              {{ perscription.name }}
            </button>
          </h2>
          <div :id="'collapse-' + perscription.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + perscription.id" data-bs-parent="#medicationAccordion">
            <div class="accordion-body"><strong>Dosering:</strong> {{ perscription.dosage }}</div>
            <div class="accordion-body"><strong>Herhaling:</strong> {{ perscription.recurrance }}</div>
            <div class="accordion-body">
              <strong>Aantekeningen:</strong><br />
              {{ perscription.notes }}
            </div>
            <div class="accordion-body">
              <strong>Link kinderformularium:</strong><br />
              <a :href="getFormulariumUrl(perscription.name)" target="_blank" class="text-white">
                {{ getFormulariumUrl(perscription.name) }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <button @click="confirmDelete" class="btn btn-primary w-100 mt-4">Ontsla patient</button>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}
.patient-header {
  display: flex;
  align-items: center;
  gap: 15px;
}
.divider {
  border-top: 1px solid #ccc;
  margin: 15px 0;
}
.accordion {
  margin: 0;
}
.accordion-button {
  font-size: 1rem;
  background-color: #50a399;
  color: #fff;
}
.accordion-button:focus {
  border-color: #50a399 !important;
  box-shadow: 0 0 0 0.25rem rgba(80, 163, 153, 0.5);
  outline: none;
}
.accordion-body {
  font-size: 0.9rem;
  padding: 5px 10px;
  margin: 0;
  word-break: break-word;
}

.accordion-collapse {
  background-color: #108173;
  color: white;
}

.user-profile {
  background-color: #f4a261;
}

.plus-icon {
  color: #50a399;
}

.text-white {
  color: white;
}
</style>
