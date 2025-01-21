<script setup lang="ts">
import type { MedicalCheckup } from '@prisma/client';
import type { FetchError } from "ofetch";
import { object, string } from 'zod';

    const router = useRouter();

    const goBack = () => {
        router.go(-1);
    }

    const route = useRoute();
    const patientId = route.params.id

    const errorMessage = ref("");
    const error = ref(false);

    const schema = toTypedSchema(
        object({
            notes: string().min(1, { message: "Aantekeningen zijn verplicht" }),
        })
    );

    const { handleSubmit, errors } = useForm({
        validationSchema: schema,
    });

    const { value: notes } = useField<string>("notes");

    async function createMedicalCheckup(values: any) {
        const response = await $fetch<MedicalCheckup>(`/api/patients/${patientId}/medicalCheckup`, { method: "post", body: values }).catch((e: FetchError) => {
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

        // navigateTo(`patients/${patientId}/medicalLogbook`);
        goBack();
    }

    const onSubmit = handleSubmit(async (values) => {
        createMedicalCheckup(values);
    })
</script>

<template>
    <div class="d-md-flex vh-100 justify-content-center align-items-center mt-5">
        <div class="col-sm-12 col-md-8 pe-0 ms-4 me-4">
            <button class="btn btn-secondary mb-2" @click="goBack">Back</button>
            <form @submit="onSubmit" class="medical-checkup-form bg-light shadow rounded pt-1 pb-3">
                <h2 class="text-center mt-2">Medische controle</h2>
                <div class="ms-4 me-4">
                    <div class="mt-2">
                        <label for="notes"><strong>Aantekeningen:</strong></label>
                        <textarea class="col-12" rows="10" id="notes" v-model="notes" placeholder="Aantekeningen..."></textarea>
                        <div v-if="errors.notes" class="invalid-feedback">{{ errors.notes }}</div>
                    </div>
                    <button class="medical-checkup-button btn btn-secondary btn-lg mt-3 col-12" type="submit">Opslaan</button>
                </div>
            </form>
        </div>
    </div>
</template>