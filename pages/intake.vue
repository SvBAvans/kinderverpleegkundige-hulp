<script setup lang="ts">
const patient = ref({
  firstName: "",
  lastName: "",
  patientId: "",
  dateOfBirth: null,
  diseaseProfile: ""
});
</script>

<template>
    <!-- <div class="ms-2 mt-2 d-flex flex-row">
        <Icon name="charm:menu-hamburger" size="50px" />
        <h1 class="nav col-12 justify-content-center mt-2">Intake Patient</h1>
    </div> -->

    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
        <div class="col-md-3 mb-2 mb-md-0">
            <Icon class="d-inline-flex link-body-emphasis text-decoration-none" name="charm:menu-hamburger" size="50px" />
        </div>
        <h1 class="col-32 col-md-auto mb-2 justify-content-center mb-md-0">Intake</h1>
    </header>

    <hr />

    <div class="ms-4 me-4 mt-4">
        <div class="mt-3">
            <label for="inputlg">Voornaam:</label>
            <input class="form-control input-lg col-12 border border-secondary" id="inputlg" type="text" v-model="patient.firstName" placeholder="Voornaam"  />
        </div>
        <div class="mt-3">
            <label for="inputlg">Achternaam:</label>
            <input class="form-control input-lg col-12 border border-secondary" id="inputlg" type="text" v-model="patient.lastName" placeholder="Achternaam"  />
        </div>    
        <div class="mt-3">
            <label for="inputlg">Patient-ID:</label>
            <input class="form-control input-lg col-12 border border-secondary" id="inputlg" type="text" v-model="patient.patientId" placeholder="Patient-ID"  />
        </div>
        <div class="mt-3">
            <label for="inputlg">Geboortedatum:</label>
            <input class="form-control input-lg col-12 border border-secondary" id="inputlg" type="date" v-model="patient.dateOfBirth" placeholder="Geboortedatum"  />
        </div>
        <div class="mt-3">
            <label>Ziektebeeld:</label>
            <textarea class="col-12" rows="5" v-model="patient.diseaseProfile" placeholder="Ziektebeeld"></textarea>
        </div>
        <button class="btn btn-secondary btn-lg mt-3 col-12">Afronden</button>
    </div>
</template>
  
