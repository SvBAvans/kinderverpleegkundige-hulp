<script setup lang="ts">
const patient = ref({
  firstName: "",
  lastName: "",
  patientId: "",
  dateOfBirth: null,
  diseaseProfile: ""
});

const isFormValid = computed(() => {
  return (
    patient.value.firstName.trim() !== "" &&
    patient.value.lastName.trim() !== "" &&
    patient.value.patientId.trim() !== "" &&
    patient.value.dateOfBirth !== null &&
    patient.value.diseaseProfile.trim() !== ""
  );
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
// onMounted(() => {
//   'use strict';

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.needs-validation') as NodeListOf<HTMLFormElement>;

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       }

//       form.classList.add('was-validated');
//     }, false);
//   });
// });

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

    <form class="was-validated" novalidate>
        <div class="ms-4 me-4 mt-4">
            <div class="mt-3">
                <label for="firstName" class="form-label">Voornaam:</label>
                <input class="form-control input-lg col-12 border border-secondary" id="firstName" type="text" v-model="patient.firstName" placeholder="Voornaam" required  />
                <div class="invalid-feedback">
                    Voornaam is verplicht
                </div>
            </div>
            <div class="mt-3">
                <label for="lastName">Achternaam:</label>
                <input class="form-control input-lg col-12 border border-secondary" id="lastName" type="text" v-model="patient.lastName" placeholder="Achternaam" required  />
                <div class="invalid-feedback">
                    Achternaam is verplicht
                </div>
            </div>    
            <div class="mt-3">
                <label for="patientID">Patient-ID:</label>
                <input class="form-control input-lg col-12 border border-secondary" id="patientID" type="text" v-model="patient.patientId" placeholder="Patient-ID" required  />
                <div class="invalid-feedback">
                    Patient ID is verplicht
                </div>
            </div>
            <div class="mt-3">
                <label for="dateOfBirth">Geboortedatum:</label>
                <input class="form-control input-lg col-12 border border-secondary" id="dateOfBirth" type="date" v-model="patient.dateOfBirth" placeholder="Geboortedatum" required  />
                <div class="invalid-feedback">
                    Geboortedatum is verplicht
                </div>
            </div>
            <div class="mt-3">
                <label>Ziektebeeld:</label>
                <textarea class="col-12" rows="5" v-model="patient.diseaseProfile" placeholder="Ziektebeeld" required></textarea>
                <div class="invalid-feedback">
                    Ziektebeeld is verplicht
                </div>
            </div>
            <button class="btn btn-secondary btn-lg mt-3 col-12" type="submit" :disabled="!isFormValid">Afronden</button>
        </div>
    </form>
</template>
  
