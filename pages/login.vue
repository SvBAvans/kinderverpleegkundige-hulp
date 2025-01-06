<script setup lang="ts">
    const user = ref({
        userName: "",
        password: ""
    });

    const touched = ref({
        userName: false,
        password: false
    });

    const errors = computed(() => ({
        userName: touched.value.userName && user.value.userName.trim() === "",
        password: touched.value.password && user.value.password.trim() === "",
    }));

    const isFormValid = computed(() => {
        return !errors.value.userName && !errors.value.password;
    });

    const handleFocus = (field: keyof typeof touched.value) => {
        touched.value[field] = true;
    };

</script>

<template>
    <div class="d-flex vh-100 justify-content-center align-items-center">
        <form class="was-validated ms-4 me-4 bg-light shadow p-3 rounded" style="width: 100%; max-width: 400px;" novalidate>
            <div>
                <input class="form-control input-lg col-12 border border-secondary" id="userName" type="text" v-model="user.userName" placeholder="Gebruikersnaam" @focus="handleFocus('userName')" @blur="handleFocus('userName')" :class="{ 'is-invalid': errors.userName }"/>
                <div v-if="errors.userName" class="invalid-feedback">
                    Gebruikersnaam is verplicht
                </div>
            </div>
            <div class="mt-3">
                <input class="form-control input-lg col-12 border border-secondary" id="password" type="password" v-model="user.password" placeholder="Wachtwoord" required />
                <div class="invalid-feedback">
                    Wachtwoord is verplicht
                </div>
            </div>
            <button class="btn btn-secondary btn-lg mt-3 col-12" type="submit" :disabled="!isFormValid">Login</button>
    </form>
    </div>
</template>