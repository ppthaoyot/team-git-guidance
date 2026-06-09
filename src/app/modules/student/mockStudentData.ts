export interface Student {
    applicationNo: string;
    refNo: string;
    policyNo: string;
    schoolName: string;
    schoolSubDistrict: string;
    schoolDistrict: string;
    province: string;
    gradeLevel: string;
    classroom: string;
    citizenId: string;
    firstName: string;
    lastName: string;
    title: string; // เด็กชาย, เด็กหญิง, นาย, นางสาว
    effectiveDate: string;
    expiryDate: string;
    coverageLimit: string;
    planName: string;
    planType: string;
    coverageTotal: string;
    deathGeneral: string;
    murderOrAssault: string;
    vehicleAccident: string;
    illnessDeath: string;
    compensationOPDClinic: string; // อนามัย 100 บาท
    compensationOPDHospital: string; // OPD 300 บาท
    compensationIPD: string; // IPD 500 บาท
    insurer: string;
    paymentStatus: "ปกติ" | "ค้างชำระ" | "ยกเลิก";
}

export const mockStudents: Student[] = [
    {
        applicationNo: "690300001",
        refNo: "68230001",
        policyNo: "230001/P001005314",
        schoolName: "โรงเรียนก้อนแก้วพิทยาคม",
        schoolSubDistrict: "ก้อนแก้ว",
        schoolDistrict: "คลองเขื่อน",
        province: "ฉะเชิงเทรา",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 1",
        classroom: "1/1",
        citizenId: "7640543275347",
        title: "เด็กชาย",
        firstName: "ธรณ์วัฒน์",
        lastName: "แสนคำ",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        planName: "แผนชดเชย+สุขภาพ",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300002",
        refNo: "68230002",
        policyNo: "230001/P001005315",
        schoolName: "โรงเรียนประทีปพัฒนาศึกษา",
        schoolSubDistrict: "เมืองนครราชสีมา",
        schoolDistrict: "เมืองนครราชสีมา",
        province: "นครราชสีมา",
        gradeLevel: "ชั้นประถมศึกษาปีที่ 6",
        classroom: "3/2",
        citizenId: "1100123456789",
        title: "เด็กหญิง",
        firstName: "กัญญารัตน์",
        lastName: "รักเรียน",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        planName: "แผนชดเชย",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300003",
        refNo: "68230003",
        policyNo: "230001/P001005316",
        schoolName: "โรงเรียนอัสสัมชัญ",
        schoolSubDistrict: "บางรัก",
        schoolDistrict: "บางรัก",
        province: "กรุงเทพมหานคร",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 2",
        classroom: "2/4",
        citizenId: "3300567890123",
        title: "นาย",
        firstName: "สมชาย",
        lastName: "สายลุย",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "10,000",
        planName: "แผนเลือกสิทธิ์",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "150",
        compensationOPDHospital: "350",
        compensationIPD: "600",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300004",
        refNo: "68230004",
        policyNo: "230001/P001005317",
        schoolName: "โรงเรียนบดินทรเดชา (สิงห์ สิงหเสนี)",
        schoolSubDistrict: "บึงกุ่ม",
        schoolDistrict: "บึงกุ่ม",
        province: "กรุงเทพมหานคร",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 1",
        classroom: "1/2",
        citizenId: "1234567890111",
        title: "เด็กหญิง",
        firstName: "ปิ่นมณี",
        lastName: "ศรีน่าน",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        planName: "แผนรักษา",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300005",
        refNo: "68230005",
        policyNo: "230001/P001005318",
        schoolName: "โรงเรียนหอวัง",
        schoolSubDistrict: "จตุจักร",
        schoolDistrict: "จตุจักร",
        province: "กรุงเทพมหานคร",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 2",
        classroom: "2/4",
        citizenId: "3300567890222",
        title: "นางสาว",
        firstName: "อภิญญา",
        lastName: "ใจดี",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        planName: "แผนชดเชย+สุขภาพ",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "150",
        compensationOPDHospital: "350",
        compensationIPD: "600",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300006",
        refNo: "68230006",
        policyNo: "230001/P001005319",
        schoolName: "โรงเรียนสตรีวิทยา",
        schoolSubDistrict: "ปทุมวัน",
        schoolDistrict: "ปทุมวัน",
        province: "กรุงเทพมหานคร",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 3",
        classroom: "3/1",
        citizenId: "1200456789012",
        title: "เด็กหญิง",
        firstName: "พิมพ์ชนก",
        lastName: "สตรีวิทย์",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        planName: "แผนชดเชย+สุขภาพ",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
    {
        applicationNo: "690300007",
        refNo: "68230007",
        policyNo: "230001/P001005320",
        schoolName: "โรงเรียนสตรีวิทยา",
        schoolSubDistrict: "ปทุมวัน",
        schoolDistrict: "ปทุมวัน",
        province: "กรุงเทพมหานคร",
        gradeLevel: "ชั้นมัธยมศึกษาปีที่ 3",
        classroom: "3/1",
        citizenId: "AA1234567",
        title: "เด็กชาย",
        firstName: "ปีเตอร์",
        lastName: "ปาร์คเกอร์",
        effectiveDate: "01/09/2568",
        expiryDate: "31/08/2569 เวลา 24.00 น.",
        coverageLimit: "10,000",
        planName: "แผนชดเชย+สุขภาพ",
        planType: "Dead Only",
        coverageTotal: "10,000",
        deathGeneral: "40,000",
        murderOrAssault: "40,000",
        vehicleAccident: "40,000",
        illnessDeath: "10,000",
        compensationOPDClinic: "150",
        compensationOPDHospital: "350",
        compensationIPD: "600",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ",
    },
];

export const getUniqueSchools = () => {
    return Array.from(new Set(mockStudents.map((s) => s.schoolName)));
};

export const getUniqueGrades = (schoolName?: string) => {
    const filtered = schoolName ? mockStudents.filter((s) => s.schoolName === schoolName) : mockStudents;
    return Array.from(new Set(filtered.map((s) => s.gradeLevel)));
};

export const getUniqueClassrooms = (schoolName?: string, gradeLevel?: string) => {
    let filtered = mockStudents;
    if (schoolName) filtered = filtered.filter((s) => s.schoolName === schoolName);
    if (gradeLevel) filtered = filtered.filter((s) => s.gradeLevel === gradeLevel);
    return Array.from(new Set(filtered.map((s) => s.classroom)));
};

export const searchStudents = (filters: {
    schoolName?: string;
    gradeLevel?: string;
    classroom?: string;
    citizenId?: string;
    searchText?: string;
}) => {
    return mockStudents.filter((student) => {
        if (filters.schoolName && student.schoolName !== filters.schoolName) return false;
        if (filters.gradeLevel && student.gradeLevel !== filters.gradeLevel) return false;
        if (filters.classroom && student.classroom !== filters.classroom) return false;
        if (filters.citizenId && student.citizenId !== filters.citizenId) return false;
        if (filters.searchText) {
            const search = filters.searchText.toLowerCase().trim();
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const matchesName = fullName.includes(search);
            const matchesCitizenId = student.citizenId.includes(search);
            const matchesRef = student.refNo.includes(search);
            if (!matchesName && !matchesCitizenId && !matchesRef) return false;
        }
        return true;
    });
};
