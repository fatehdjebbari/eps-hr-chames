import { Personnel } from '@/types/hr';

const firstNames = [
    'Ahmed', 'Fatima', 'Mohamed', 'Amina', 'Karim', 'Leila', 'Yacine', 'Soraya',
    'Omar', 'Nadia', 'Rachid', 'Zineb', 'Bilal', 'Sihem', 'Hamza', 'Assia',
    'Malik', 'Houria', 'Tarek', 'Nesrine', 'Sofiane', 'Imane', 'Kamel', 'Samira',
    'Youssef', 'Khadija', 'Mehdi', 'Salma', 'Amine', 'Meriem', 'Walid', 'Rania',
];

const lastNames = [
    'Benali', 'Zeroual', 'Hadj', 'Boudiaf', 'Slimani', 'Khelifa', 'Messaoudi', 'Brahimi',
    'Amrani', 'Cherif', 'Bensalem', 'Hamidi', 'Touati', 'Mansouri', 'Belkacem', 'Rahmani',
    'Khaled', 'Bouazza', 'Saidi', 'Meziane', 'Bouzid', 'Larbi', 'Djamel', 'Ferhat',
    'Brahim', 'Taleb', 'Hamdani', 'Boukhari', 'Medjdoub', 'Ouali', 'Seddik', 'Yahiaoui',
];

const cities = ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Tlemcen', 'Batna', 'Sétif'];
const streets = [
    'Rue des Martyrs', 'Boulevard de la République', 'Avenue de l\'Indépendance',
    'Rue Didouche Mourad', 'Avenue Pasteur', 'Rue Larbi Ben M\'hidi',
    'Boulevard Mohamed V', 'Rue Emir Abdelkader', 'Avenue de l\'ALN',
];

const specialties = {
    specialist_doctor: ['Cardiologist', 'Pediatrician', 'Emergency Medicine', 'General Practitioner', 'Neurologist', 'Dermatologist'],
    paramedical: ['Nurse', 'Emergency Nurse', 'Laboratory Technician', 'Radiology Technician', 'Physiotherapist'],
    pharmacist: ['Clinical Pharmacist', 'Hospital Pharmacist', 'Industrial Pharmacist'],
    dentist: ['General Dentist', 'Orthodontist', 'Periodontist', 'Endodontist'],
};

const ranks = {
    specialist_doctor: ['Médecin Résident', 'Médecin Spécialiste', 'Médecin Chef', 'Professeur'],
    paramedical: ['Infirmier', 'Infirmier Principal', 'Infirmier Chef'],
    pharmacist: ['Pharmacien', 'Pharmacien Principal', 'Pharmacien Spécialiste'],
    dentist: ['Dentiste', 'Dentiste Spécialiste', 'Dentiste Chef'],
};

function generatePersonnel(count: number): Personnel[] {
    const personnel: Personnel[] = [];
    const departments = ['1', '2', '3', '4', '5', '6'];
    const categories: Array<'specialist_doctor' | 'paramedical' | 'pharmacist' | 'dentist'> =
        ['specialist_doctor', 'paramedical', 'pharmacist', 'dentist'];
    const statuses: Array<'active' | 'retired' | 'transferred'> = ['active', 'retired', 'transferred'];

    for (let i = 1; i <= count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const departmentId = departments[Math.floor(Math.random() * departments.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const specialty = specialties[category][Math.floor(Math.random() * specialties[category].length)];
        const rankList = ranks[category];
        const currentRank = rankList[Math.floor(Math.random() * rankList.length)];
        const originalRank = rankList[0];

        // 85% active, 10% retired, 5% transferred
        const rand = Math.random();
        const status = rand < 0.85 ? 'active' : rand < 0.95 ? 'retired' : 'transferred';

        const year = 2000 + Math.floor(Math.random() * 24);
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

        const birthYear = 1970 + Math.floor(Math.random() * 30);
        const street = streets[Math.floor(Math.random() * streets.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const number = Math.floor(Math.random() * 100) + 1;

        personnel.push({
            id: String(i),
            firstName,
            lastName,
            dateOfBirth: `${birthYear}-${month}-${day}`,
            address: `${number} ${street}, ${city}`,
            originalRank,
            currentRank,
            reference: `${category.substring(0, 4).toUpperCase()}-${year}-${String(i).padStart(4, '0')}`,
            step: Math.floor(Math.random() * 10) + 1,
            category,
            departmentId,
            specialty,
            hireDate: `${year}-${month}-${day}`,
            status,
        });
    }

    return personnel;
}

// Generate 200 personnel
const generatedPersonnel = generatePersonnel(200);

// Output as TypeScript array
console.log('export const mockPersonnel: Personnel[] = [');
generatedPersonnel.forEach((person, index) => {
    console.log('  {');
    console.log(`    id: "${person.id}",`);
    console.log(`    firstName: "${person.firstName}",`);
    console.log(`    lastName: "${person.lastName}",`);
    console.log(`    dateOfBirth: "${person.dateOfBirth}",`);
    console.log(`    address: "${person.address}",`);
    console.log(`    originalRank: "${person.originalRank}",`);
    console.log(`    currentRank: "${person.currentRank}",`);
    console.log(`    reference: "${person.reference}",`);
    console.log(`    step: ${person.step},`);
    console.log(`    category: "${person.category}",`);
    console.log(`    departmentId: "${person.departmentId}",`);
    console.log(`    specialty: "${person.specialty}",`);
    console.log(`    hireDate: "${person.hireDate}",`);
    console.log(`    status: "${person.status}",`);
    console.log(`  }${index < generatedPersonnel.length - 1 ? ',' : ''}`);
});
console.log('];');
