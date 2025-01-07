<script setup>
 const route = useRoute();
    const { data: patient } = await useFetch(`/api/patients/${route.params.id}`)
</script>

<template>
    <div class="page-container">
        <header class="mb-4">
            <h1 class="h4">Patient details</h1>
        </header>

        <div class="patient-header mb-3">
            <div class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style="width: 60px; height: 60px;">
                {{ patient.firstName?.charAt(0) }}{{ patient.lastName?.charAt(0) }}
            </div>
            <div>
                <h2 class="h5 mb-1">{{ patient.firstName }} {{ patient.lastName }}</h2>
                <p class="text-muted mb-0">Geboortedatum: {{ new Date(patient.dateOfBirth).toISOString().split('T')[0] }}</p>
            </div>
        </div>
 
        <!-- <div class="mb-3">
            <p><strong>Isolatietype:</strong> Contactisolatie</p>
            <p><strong>Voedingswijze:</strong> Sonde</p>
        </div> -->

        <div class="divider"></div>

        <section class="mb-3">
            <h3 class="h6">Ziektebeeld:</h3>
            <p>{{ patient.diseaseProfile }}</p>
        </section>

        <div class="divider"></div>

        <section class="mb-3">
            <h3 class="h6">Medicatie</h3>
            <div class="accordion" id="medicationAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                        >
                            Ibuprofen (1)
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#medicationAccordion"
                    >
                        <div class="accordion-body">
                            <strong>Details:</strong> Take one tablet after meals as needed. Do not exceed the prescribed dose.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Ibuprofen (2)
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#medicationAccordion"
                    >
                        <div class="accordion-body">
                            <strong>Details:</strong> Use as directed for pain relief. Consult your doctor for further instructions.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Ibuprofen (3)
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#medicationAccordion"
                    >
                        <div class="accordion-body">
                            <strong>Details:</strong> Take with a full glass of water. Monitor for any side effects.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="divider"></div>

        <section class="mb-3">
            <h3 class="h6">Behandelingen</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
        </section>

        <div class="divider"></div>

        <section class="mb-3">
            <h3 class="h6">Afspraken en psychologische zorg</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
        </section>
    </div>
</template>

<style scoped>
.page-container {
    padding: 20px;
}
.patient-header {
    display: flex;
    align-items: center;
    gap: 15px;
}
.divider {
    border-top: 1px solid #ccc;
    margin: 15px 0;
}
.accordion {
    margin: 0;
}
.accordion-button {
    font-size: 1rem;
}
.accordion-body {
    font-size: 0.9rem;
}
</style>
