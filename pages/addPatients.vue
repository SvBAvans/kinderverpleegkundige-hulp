<template>
  <header>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  </header>
  <div class="container py-5 d-flex flex-column" style="min-height: 100vh;">
    <h2 class="text-center mb-4">Voeg patiënt toe</h2>
    <input
      class="form-control mb-3"
      type="text"
      placeholder="Search..."
    />
    <hr />

    <div class="flex-grow-1 overflow-auto">
      <div v-for="patient in patients" :key="patient.id" class="card p-3 shadow-sm mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <p class="mb-1"><strong>{{ patient.name }}</strong></p>
              <p class="text-muted mb-0">{{ patient.dob }}</p>
            </div>

            <div class="col-6 d-flex align-items-center justify-content-end">
              <p class="me-2 mb-0">kamer: {{ patient.roomNumber }}</p>
              <i
                class="bi bi-plus fs-3"
                style="cursor: pointer;"
                @click="addPatient(patient)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sticky-bottom">
      <button
        class="btn btn-primary w-100 rounded-pill shadow-lg"
        @click="logSelectedPatients"
      >
        Voltooi
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Patient {
  id: number;
  name: string;
  dob: string;
  roomNumber: number;
}

export default defineComponent({
  name: 'PatientSearch',
  setup() {
    const patients = ref<Patient[]>([
      { id: 1, name: 'John Doe', dob: '2016-05-14', roomNumber: 101 },
      { id: 2, name: 'Jane Smith', dob: '2016-09-23', roomNumber: 102 },
      { id: 3, name: 'Alice Johnson', dob: '2008-01-15', roomNumber: 103 },
      { id: 4, name: 'Bob Brown', dob: '2013-06-30', roomNumber: 104 },
      { id: 5, name: 'Ralph van der Neuten', dob: '2012-08-29', roomNumber: 105 },
      { id: 6, name: 'Ben Dover', dob: '2015-04-20', roomNumber: 106 },
      { id: 7, name: 'Akkie Voetbal', dob: '2014-06-09', roomNumber: 107 },
    ]);

    const selectedPatients = ref<Patient[]>([]);

    const addPatient = (patient: Patient) => {
      if (!selectedPatients.value.find((p) => p.id === patient.id)) {
        selectedPatients.value.push(patient);
        console.log(`Patient added:`, patient);
      }
    };

    const logSelectedPatients = () => {
      console.log('Selected patients:', selectedPatients.value);
    };

    return {
      patients,
      selectedPatients,
      addPatient,
      logSelectedPatients,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.card {
  border-radius: 15px;
}

input::placeholder {
  font-style: italic;
}

.bi {
  color: #3b82f6;
}

button {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.75rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #2563eb;
  transform: scale(1.03);
}

button:active {
  transform: scale(0.97);
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
  background: white;
  padding-top: 10px;
}

.bi:hover {
  color: #1d4ed8;
}
</style>
