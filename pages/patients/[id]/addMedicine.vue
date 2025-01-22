<script setup lang="ts">
import type { Perscription } from "@prisma/client";
import type { FetchError } from "ofetch";
import { object, string } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

definePageMeta({
  title: "Medicijn Formulier",
});

const errorMessage = ref("");
const error = ref(false);
const router = useRouter();
const route = useRoute();
const patientId = route.params.id;

const goBack = () => {
  router.go(-1);
};

const medicines = getMedcine();

const selectedMedicineLink = ref("");

function updateSelectedMedicineLink(event: Event) {
  const selectedOption = (event.target as HTMLSelectElement).selectedOptions[0];
  selectedMedicineLink.value = selectedOption.getAttribute("data-link") || "";
}

const schema = toTypedSchema(
  object({
    name: string({ required_error: "Medicijn is verplicht" }),
    dosage: string({ required_error: "Dosering is verplicht " }),
    recurrance: string({ required_error: "Herhaling is verplicht " }),
    notes: string().default(""),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: name } = useField("name");
const { value: dosage } = useField("dosage");
const { value: recurrance } = useField<string>("recurrance");
const { value: notes } = useField<string>("notes");

async function createPrescription(values: any) {
  const response = await $fetch<Perscription>(`/api/patients/${patientId}/medicine`, { method: "post", body: values }).catch((e: FetchError) => {
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

  console.log("Form submitted with values: ", values);

  goBack();
}

const onSubmit = handleSubmit(async (values) => {
  console.log("button clicked");
  await createPrescription(values);
});
</script>

<template>
  <div class="d-md-flex flex-column vh-100 justify-content-center align-items-center mt-5 mx-4">
    <div class="col-sm-12 col-md-8 pe-0">
      <div class="text-start mb-3">
        <button class="btn btn-primary mt-3" @click="goBack">Back</button>
      </div>

      <form @submit="onSubmit" class="medicine-form bg-light shadow rounded pt-1 pb-3">
        <h4 class="text-center mt-2">Voeg medicijn toe</h4>
        <div class="mx-4">
          <div class="mt-2">
            <label for="name">Medicijn</label>
            <select class="form-select" id="name" v-model="name" @change="updateSelectedMedicineLink">
              <option disabled value="">Selecteer een medicijn</option>
              <option v-for="medicine in medicines" :key="medicine.name" :value="medicine.name" :data-link="medicine.formularium_url">
                {{ medicine.name }}
              </option>
            </select>
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div>
            <p v-if="selectedMedicineLink" class="mt-1">
              <strong>Link kinderformularium:</strong><br />
              <a :href="selectedMedicineLink" target="_blank" class="text-primary">
                {{ selectedMedicineLink }}
              </a>
            </p>
          </div>
          <div class="mt-3">
            <label for="dosage">Dosering</label>
            <input class="form-control input-lg" id="dosage" type="text" v-model="dosage" placeholder="Dosering" />
            <div v-if="errors.dosage" class="invalid-feedback">{{ errors.dosage }}</div>
          </div>
          <div class="mt-3">
            <label for="recurrance">Herhaling</label>
            <textarea class="form-control" rows="3" id="recurrance" v-model="recurrance" placeholder="Herhaling"></textarea>
            <div v-if="errors.recurrance" class="invalid-feedback">{{ errors.recurrance }}</div>
          </div>
          <div class="mt-3">
            <label for="notes">Aantekeningen</label>
            <textarea class="form-control" rows="5" id="notes" v-model="notes" placeholder="Aantekeningen"></textarea>
            <div v-if="errors.notes" class="invalid-feedback">{{ errors.notes }}</div>
          </div>
          <button class="medicine-button btn btn-primary btn-lg mt-3 col-12" type="submit">Voeg medicijn toe</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.text-primary {
  word-break: break-word;
}
</style>
