<script setup lang="ts">
const { signOut, data } = useAuth();
const userId = data.value?.user.userId;
const router = useRouter();

definePageMeta({
  title: "Dienst overzicht",
});

const viewDetails = (patientId: string) => {
  return async () => {
    try {
      await navigateTo(`/patients/${patientId}`);
    } catch (error) {
      console.error("Trouble getting patient details:", error);
    }
  };
};

const endShift = async () => {
  const isConfirmed = confirm("Weet u zeker dat u deze dienst wilt beëindigen?");
  if (isConfirmed) {
    try {
      const response = await $fetch(`/api/patients/delete?userId=${userId}`, {
        method: "DELETE",
      });

      if (response?.status === 200) {
        alert("Dienst beëindigd.");
        // when works:
        console.log("shift ended");
        signOut();
      } else {
        alert("Dienst kon niet beëindigd worden.");
      }
    } catch (error) {
      console.error("error ending shift:", error);
    }
  } else {
    console.log("shift not ended");
  }
};

const { data: savedPatients } = await useFetch(`/api/patients/saved?userId=${userId}`); //nu nog hardcoded fleur id
</script>

<template>
  <div class="container py-5 d-flex flex-column" style="min-height: 100vh">
    <!-- <h2 class="text-center mb-4">Overzicht dienst</h2> -->
    <hr />

    <div class="flex-grow-1 overflow-auto">
      <div v-for="patient in savedPatients?.patients" :key="patient.id" class="card p-3 shadow-sm mb-3 bg-white">
        <div class="card-body" @click="() => viewDetails(patient.id)()">
          <div class="row">
            <div class="col-6 d-flex flex-column justify-content-center">
              <p class="mb-1">
                <strong>{{ patient.firstName }} {{ patient.lastName }}</strong>
              </p>
              <p class="text-muted mb-0">{{ new Date(patient.dateOfBirth).toLocaleDateString() }}</p>
            </div>

            <div class="col-6 d-flex align-items-center justify-content-end">
              <p class="me-2 mb-0">kamer: {{ patient.roomNr }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sticky-bottom">
      <button class="btn btn-primary w-100 rounded-pill shadow-lg" @click="endShift">Beëindig dienst</button>
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
  transform: scale(1.03);
}

button:active {
  transform: scale(0.97);
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
  padding-top: 10px;
}
</style>
