<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  </head>
  <div class="container py-5 d-flex flex-column justify-content-between" style="height: 100vh;">
    <h2 class="text-center mb-4">Voeg patiënt toe</h2>
    <input class="form-control mb-3" type="text" placeholder="Search.." />
    <hr />

    <div class="card p-3 shadow-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-6 d-flex flex-column justify-content-center">
            <p class="mb-1"><strong>[name]</strong></p>
            <p class="text-muted mb-0">[dob]</p>
          </div>

          <div class="col-6 d-flex align-items-center justify-content-end">
            <p class="me-2 mb-0">kamer: [nr]</p>
            <i class="bi bi-plus" style="font-size: 2rem; color: #3b82f6;"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-3 shadow-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-6 d-flex flex-column justify-content-center">
            <p class="mb-1"><strong>[name]</strong></p>
            <p class="text-muted mb-0">[dob]</p>
          </div>

          <div class="col-6 d-flex align-items-center justify-content-end">
            <p class="me-2 mb-0">kamer: [nr]</p>
            <i class="bi bi-trash-fill" style="font-size: 2rem; color: #3b82f6;"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto">
      <button class="btn btn-primary w-100 rounded-pill shadow-lg">Voltooi</button>
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
  color: #3b82f6;
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
</style>
