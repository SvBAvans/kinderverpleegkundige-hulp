<script setup lang="ts">
import { array } from 'zod';

    const router = useRouter();

    const goBack = () => {
        router.go(-1);
    }

    const medicines = getMedcine(); 

    const selectedMedicineLink = ref("");

</script>

<template>
    <div class="d-md-flex vh-100 justify-content-center align-items-center mt-5">
        <button class="btn btn-secondary" @click="goBack">Back</button>
        <form class="medicine-form col-sm-12 col-md-8 pe-0 ms-4 me-4 bg-light shadow rounded pt-1 pb-3">
            <h4 class="text-center mt-2">Voeg medicijn toe</h4>
            <div class="ms-4 me-4">
                <div class="mt-2">
                <label for="medicine">Medicijn</label>
                <select class="form-select" id="medicine" v-model="selectedMedicineLink">
                    <option disabled value="">Selecteer een medicijn</option>
                    <option 
                        v-for="medicine in medicines" 
                        :key="medicine.name" 
                        :value="medicine.formularium_url"
                    >
                        {{ medicine.name }}
                    </option>
                </select>
                </div>
                <div>
                    <p>Controleer de dosering op het kinderformularium</p>
                    <p v-if="selectedMedicineLink">
                    <a :href="selectedMedicineLink" target="_blank" class="text-primary">
                        {{ selectedMedicineLink }}
                    </a>
                    </p>
                </div>
                <div class="mt-2">
                    <label class="form-label">Dosering</label>
                    <input class="form-control input-lg border border-secondary" type="text" placeholder="Dosering" />
                </div>
                <div class="mt-2">
                    <label>Herhaling</label>
                    <textarea class="col-12" rows="3"></textarea>
                </div>
                <div>
                    <label>Aantekeningen</label>
                    <textarea class="col-12" rows="5"></textarea>
                </div>
                <button class="medicine-button btn btn-secondary btn-lg mt-3 col-12" type="submit">Voeg medicijn toe</button>
            </div>
        </form>
        <div class="mt-3 ms-4">
            <h3 class="col-12">Toegevoegde medicijnen</h3>
        </div>
    </div>
</template>