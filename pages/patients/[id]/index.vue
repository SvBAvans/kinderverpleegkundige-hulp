<script setup>
const route = useRoute();
const patientId = route.params.id

const { data: patient } = await useFetch(`/api/patients/${patientId}`);
</script>

<template>
  <div class="page-container mt-5">
    <div class="patient-header mb-3">
      <div class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style="width: 60px; height: 60px">{{ patient.firstName?.charAt(0) }}{{ patient.lastName?.charAt(0) }}</div>
      <div>
        <h2 class="h5 mb-1">{{ patient.firstName }} {{ patient.lastName }}</h2>
        <p class="text-muted mb-0">Geboortedatum: {{ new Date(patient.dateOfBirth).toISOString().split("T")[0] }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <section class="mb-3">
      <h3 class="h6">Ziektebeeld:</h3>
      <p>{{ patient.diseaseProfile }}</p>
    </section>

    <div class="divider"></div>

    <section class="mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="h6">Medicatie</h3>
        <NuxtLink :to="`/patients/${patientId}/addMedicine`">         
          <Icon name="material-symbols:add-2"></Icon>
        </NuxtLink>
      </div>
      <div class="accordion" id="medicationAccordion">
        <div v-for="perscription in patient.persciptions" class="accordion-item">
          <h2 class="accordion-header" :id="'heading-' + perscription.id">
            <button class="accordion-button collapsed" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse-' + perscription.id" aria-expanded="false" :aria-controls="'collapse-' + perscription.id">{{ perscription.name }}</button>
          </h2>
          <div :id="'collapse-' + perscription.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + perscription.id" data-bs-parent="#medicationAccordion">
            <div class="accordion-body"><strong>Dosering:</strong> {{ perscription.dosage }}</div>
            <div class="accordion-body"><strong>Herhaling:</strong> {{ perscription.recurrance }}</div>
            <div class="accordion-body"><strong>Aantekeningen:</strong><br> {{ perscription.notes }}</div>
            <div class="accordion-body"><strong>Link kinderformularium:</strong><br> {{ getFormulariumUrl( perscription.name ) }} </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="mb-3">
      <h3 class="h6">Behandelingen</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum..
      </p>
    </section>

    <div class="divider"></div>

    <section class="mb-3">
      <h3 class="h6">Afspraken en psychologische zorg</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum..
      </p>
    </section>
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
}
.accordion-body {
  font-size: 0.9rem;
  padding: 5px 10px;
  margin: 0;
  word-break: break-word;
}
</style>
