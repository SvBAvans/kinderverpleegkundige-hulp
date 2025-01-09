const medicines = [
    { name: "Paracetamol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/21/paracetamol" },
    { name: "Ibuprofen", formularium_url: "https://example.com/ibuprofen" },
    { name: "Diclofenac", formularium_url: "https://example.com/diclofenac" },
    { name: "Amoxicilline", formularium_url: "https://example.com/amoxicilline" },
    { name: "Metformine", formularium_url: "https://example.com/metformine" },
    { name: "Atorvastatine", formularium_url: "https://example.com/atorvastatine" },
    { name: "Omeprazol", formularium_url: "https://example.com/omeprazol" },
    { name: "Pantoprazol", formularium_url: "https://example.com/pantoprazol" },
    { name: "Simvastatine", formularium_url: "https://example.com/simvastatine" },
    { name: "Losartan", formularium_url: "https://example.com/losartan" },
    { name: "Metoprolol", formularium_url: "https://example.com/metoprolol" },
    { name: "Salbutamol", formularium_url: "https://example.com/salbutamol" },
    { name: "Prednison", formularium_url: "https://example.com/prednison" },
    { name: "Levothyroxine", formularium_url: "https://example.com/levothyroxine" },
    { name: "Clopidogrel", formularium_url: "https://example.com/clopidogrel" },
    { name: "Citalopram", formularium_url: "https://example.com/citalopram" },
    { name: "Diazepam", formularium_url: "https://example.com/diazepam" },
    { name: "Risperidon", formularium_url: "https://example.com/risperidon" },
    { name: "Oxycodon", formularium_url: "https://example.com/oxycodon" },
    { name: "Tramadol", formularium_url: "https://example.com/tramadol" }
];

export const getMedcine = () => {
    return medicines;
}

export const getFormulariumUrl = (medicine: string) => {
    return medicines.find(med => med.name == medicine)?.formularium_url;
}