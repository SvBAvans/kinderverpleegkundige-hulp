const medicines = [
    { name: "Paracetamol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/21/paracetamol" },
    { name: "Ibuprofen", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/18/ibuprofen" },
    { name: "Diclofenac", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/17/diclofenac" },
    { name: "Amoxicilline", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/7/amoxicilline" },
    { name: "Metformine", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/575/metformine" },
    { name: "Atorvastatine", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/576/atorvastatine" },
    { name: "Omeprazol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/56/omeprazol" },
    { name: "Pantoprazol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/542/pantoprazol" },
    { name: "Simvastatine", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/592/simvastatine" },
    { name: "Losartan", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/414/losartan" },
    { name: "Metoprolol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/426/metoprolol" },
    { name: "Salbutamol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/154/salbutamol" },
    { name: "Levothyroxine", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/198/levothyroxine" },
    { name: "Clopidogrel", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/29061/clopidogrel" },
    { name: "Citalopram", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/228/citalopram" },
    { name: "Diazepam", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/205/diazepam" },
    { name: "Risperidon", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/220/risperidon" },
    { name: "Oxycodon", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/603/oxycodon" },
    { name: "Tramadol", formularium_url: "https://www.kinderformularium.nl/geneesmiddel/12/tramadol" }
];

export const getMedcine = () => {
    return medicines;
}

export const getFormulariumUrl = (medicine: string) => {
    return medicines.find(med => med.name == medicine)?.formularium_url;
}