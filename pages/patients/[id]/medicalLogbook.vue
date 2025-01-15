<script setup lang="ts">
    import type { Patient } from '@prisma/client';

    const router = useRouter();
    const route = useRoute();
    const patientId = route.params.id;

    const goBack = () => {
        router.go(-1);
    }

    const { data: patient } = await useFetch<any>(`/api/patients/${patientId}`);

    if (patient.value?.medicalCheckups) {
        patient.value.medicalCheckups.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
</script>

<template>
    <div class="page-container">
        <div class="d-flex justify-content-between align-items-center me-5">
            <button class="btn btn-secondary ms-4" @click="goBack">Back</button>
            <NuxtLink :to="`/patients/${patientId}/createMedicalCheckup`">         
                <Icon class="plus-icon" name="material-symbols:add-2" size="36px"></Icon>
            </NuxtLink>
        </div>
        <hr/>
        <div class="accordion mt-3 mx-4" id="medicalCheckupAccordion">
            <div class="text-center" v-if="!patient?.medicalCheckups || patient.medicalCheckups.length === 0">
                Geen medische controles voor deze patient
            </div>
            <div v-else>
                <div v-for="medicalCheckup in patient.medicalCheckups" :key="medicalCheckup.id" class="accordion-item">
                    <h2 class="accordion-header" :id="'heading-' + medicalCheckup.id">
                        <button class="accordion-button collapsed" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse-' + medicalCheckup.id" aria-expanded="false" :aria-controls="'collapse-' + medicalCheckup.id">
                            {{ new Date(medicalCheckup.timestamp).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}
                        </button>
                    </h2>
                    <div :id="'collapse-' + medicalCheckup.id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + medicalCheckup.id" data-bs-parent="#medicalCheckupAccordion">
                        <div class="accordion-body"><strong>Aantekeningen:</strong><br> {{ medicalCheckup.notes }}</div>
                    </div>
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

    .page-container {
        margin-top: 70px;
    }

    .plus-icon {
        color: #50a399;
    }
</style>