<script setup lang="ts">

    const user = ref({
        userName: "",
        password: ""
    });
    
</script>

<template>
    <div class="d-flex vh-100 justify-content-center align-items-center">
        <form class="login-form was-validated ms-4 me-4 bg-light shadow p-3 rounded" novalidate>
            <div>
                <input class="form-control input-lg col-12 border border-secondary" id="email" name="email" type="text" v-model="user.userName" placeholder="Gebruikersnaam" required />
                <div class="invalid-feedback">
                    Gebruikersnaam is verplicht
                </div>
            </div>
            <div class="mt-3">
                <input class="form-control input-lg col-12 border border-secondary" id="password" name="password" type="password" v-model="user.password" placeholder="Wachtwoord" required />
                <div class="invalid-feedback">
                    Wachtwoord is verplicht
                </div>
            </div>
            <button class="login-button btn btn-secondary btn-lg mt-3 col-12" type="submit">Login</button>
        </form>
    </div>
</template>

<style>
    .login-form {
        width: 100%;
        max-width: 400px;
    }

    @media screen and (min-width: 768px) {
        .login-form {
            width: 100%;
            max-width: 600px;
            font-size: 25px;
        }

        input.form-control {
            font-size: 20px;
            padding: 15px;
        }

        button.login-button {
            padding: 15px;
            font-size: 25px;
        }
    }
</style>

