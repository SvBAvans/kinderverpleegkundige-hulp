<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app";

const addedPatients = ref<Set<string>>(new Set());
const search = ref<string>("");
const router = useRouter();

const { data: patient } = await useFetch(`/api/patients`);

// delete/add patient to list
const togglePatient = (id: string) => {
  if (addedPatients.value.has(id)) {
    addedPatients.value.delete(id);
  } else {
    addedPatients.value.add(id);
  }
};

const savePatients = async () => {
  const patientIds = Array.from(addedPatients.value);

  if (patientIds.length === 0) {
    alert("Nog geen patiënten geselecteerd.");
    return;
  }

  try {
    const userId = "fjahdfjklashdfkhasdfklh";
    await $fetch("/api/patients/save", {
      method: "POST",
      body: { userId, patientIds },
    });

    alert("Patiënten opgeslagen");
    router.push("/overview");
  } catch (error: any) {
    alert(`error: ${error.data.message}`);
    console.error(error);
  }
};

const filteredPatients = computed(() => {
  return patient.value?.filter((patient: any) => {
    const query = search.value.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query)
    );
  });
});
</script>

<template>
  <div class="container py-5 d-flex flex-column" style="min-height: 100vh">
    <h2 class="text-center mb-4">Voeg patiënt toe</h2>
    <input class="form-control mb-3" type="text" v-model="search" placeholder="Search..." />
    <hr />

    <div class="flex-grow-1 overflow-auto">
      <div
        v-for="patient in filteredPatients"
        :key="patient.id"
        class="card p-3 shadow-sm mb-3"
      >
        <div class="card-body">
          <div class="row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <p class="mb-1">
                <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
              </p>
              <p class="text-muted mb-0">{{ patient.dateOfBirth }}</p>
            </div>

            <div class="col-6 d-flex align-items-center justify-content-end">
              <p class="me-2 mb-0">kamer: {{patient.roomNr}}</p>
              <Icon
                :name="addedPatients.has(patient.id) ? 'bi:check-circle' : 'bi:plus'"
                class="fs-3 bi"
                :style="{ color: addedPatients.has(patient.id) ? '#10b981' : '#3b82f6' }"
                @click="togglePatient(patient.id)"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sticky-bottom">
      <button class="btn btn-primary w-100 rounded-pill shadow-lg" @click="savePatients">
        Voltooi
      </button>
    </div>
  </div>
</template>


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
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}

.bi:hover {
  transform: scale(1.2);
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
</style>
