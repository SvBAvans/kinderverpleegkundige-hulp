<script setup lang="ts">
    import type { Patient } from '@prisma/client';

    const router = useRouter();
    const route = useRoute();
    const patientId = route.params.id;

    const goBack = () => {
        router.go(-1);
    }

    const { data: patient } = await useFetch<any>(`/api/patients/${patientId}`);
</script>

<template>
    <div class="mt-5 ms-4">
        <div class="d-flex justify-content-between align-items-center mt-3 me-5">
            <button class="btn btn-secondary" @click="goBack">Back</button>
            <NuxtLink :to="`/patients/${patientId}/createMedicalCheckup`">         
                <Icon name="material-symbols:add-2" size="36px"></Icon>
            </NuxtLink>
        </div>
        <div class="accordion mt-3" id="medicalCheckupAccordion">
            <div v-for="medicalCheckup in patient?.medicalCheckups" class="accordion-item">
                <h2 class="accordion-header" :id="'heading-' + medicalCheckup.id">
                    <button class="accordion-button collapsed" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse-' + medicalCheckup.id" aria-expanded="false" :aria-controls="'collapse-' + medicalCheckup.id">{{ medicalCheckup.timestamp }}</button>
                </h2>
                <div :id="'collapse-' + medicalCheckup.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + medicalCheckup.id" data-bs-parent="#medicalCheckupAccordion">
                    <div class="accordion-body"><strong>Aantekeningen:</strong><br> {{ medicalCheckup.notes }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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