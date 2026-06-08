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
    compensationOPDClinic: string; // อนามัย 100 บาท
    compensationOPDHospital: string; // OPD 300 บาท
    compensationIPD: string; // IPD 500 บาท
    insurer: string;
    paymentStatus: "ปกติ" | "ค้างชำระ" | "ยกเลิก";
}

export const mockStudents: Student[] = [
    {
        applicationNo: "68000001",
        refNo: "68490001",
        policyNo: "SS-PA-2026-0001",
        schoolName: "โรงเรียนสตรีศรีน่าน",
        schoolSubDistrict: "ในเวียง",
        schoolDistrict: "เมืองน่าน",
        province: "น่าน",
        gradeLevel: "ม.1",
        classroom: "1/1",
        citizenId: "1234567890123",
        title: "เด็กชาย",
        firstName: "ชินดนัย",
        lastName: "ใจเกเร",
        effectiveDate: "01/01/2569",
        expiryDate: "31/12/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ"
    },
    {
        applicationNo: "68000002",
        refNo: "68490002",
        policyNo: "SS-PA-2026-0002",
        schoolName: "โรงเรียนก้อนแก้วพิทยาคม",
        schoolSubDistrict: "ก้อนแก้ว",
        schoolDistrict: "เมืองฉะเชิงเทรา",
        province: "ฉะเชิงเทรา",
        gradeLevel: "ม.3",
        classroom: "3/2",
        citizenId: "1100123456789",
        title: "เด็กหญิง",
        firstName: "กัญญารัตน์",
        lastName: "รักเรียน",
        effectiveDate: "16/05/2569",
        expiryDate: "15/05/2570 เวลา 24.00 น.",
        coverageLimit: "8,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ"
    },
    {
        applicationNo: "68000003",
        refNo: "68490003",
        policyNo: "SS-PA-2026-0003",
        schoolName: "โรงเรียนสีคิ้วสวัสดิ์ผดุงวิทยา",
        schoolSubDistrict: "สีคิ้ว",
        schoolDistrict: "สีคิ้ว",
        province: "นครราชสีมา",
        gradeLevel: "ม.2",
        classroom: "2/4",
        citizenId: "3300567890123",
        title: "นาย",
        firstName: "สมชาย",
        lastName: "สายลุย",
        effectiveDate: "01/06/2569",
        expiryDate: "31/05/2570 เวลา 24.00 น.",
        coverageLimit: "10,000",
        compensationOPDClinic: "150",
        compensationOPDHospital: "350",
        compensationIPD: "600",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ"
    },
    {
        applicationNo: "68000004",
        refNo: "68490004",
        policyNo: "SS-PA-2026-0004",
        schoolName: "โรงเรียนสตรีศรีน่าน",
        schoolSubDistrict: "ในเวียง",
        schoolDistrict: "เมืองน่าน",
        province: "น่าน",
        gradeLevel: "ม.1",
        classroom: "1/2",
        citizenId: "1234567890111",
        title: "เด็กหญิง",
        firstName: "ปิ่นมณี",
        lastName: "ศรีน่าน",
        effectiveDate: "01/01/2569",
        expiryDate: "31/12/2569 เวลา 24.00 น.",
        coverageLimit: "8,000",
        compensationOPDClinic: "100",
        compensationOPDHospital: "300",
        compensationIPD: "500",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ปกติ"
    },
    {
        applicationNo: "68000005",
        refNo: "68490005",
        policyNo: "SS-PA-2026-0005",
        schoolName: "โรงเรียนสีคิ้วสวัสดิ์ผดุงวิทยา",
        schoolSubDistrict: "สีคิ้ว",
        schoolDistrict: "สีคิ้ว",
        province: "นครราชสีมา",
        gradeLevel: "ม.2",
        classroom: "2/4",
        citizenId: "3300567890222",
        title: "นางสาว",
        firstName: "อภิญญา",
        lastName: "ใจดี",
        effectiveDate: "01/06/2569",
        expiryDate: "31/05/2570 เวลา 24.00 น.",
        coverageLimit: "10,000",
        compensationOPDClinic: "150",
        compensationOPDHospital: "350",
        compensationIPD: "600",
        insurer: "บริษัท บางกอกสหประกันภัย จำกัด (มหาชน)",
        paymentStatus: "ค้างชำระ"
    }
];

export const getUniqueSchools = () => {
    return Array.from(new Set(mockStudents.map(s => s.schoolName)));
};

export const getUniqueGrades = (schoolName?: string) => {
    const filtered = schoolName ? mockStudents.filter(s => s.schoolName === schoolName) : mockStudents;
    return Array.from(new Set(filtered.map(s => s.gradeLevel)));
};

export const getUniqueClassrooms = (schoolName?: string, gradeLevel?: string) => {
    let filtered = mockStudents;
    if (schoolName) filtered = filtered.filter(s => s.schoolName === schoolName);
    if (gradeLevel) filtered = filtered.filter(s => s.gradeLevel === gradeLevel);
    return Array.from(new Set(filtered.map(s => s.classroom)));
};

export const searchStudents = (filters: {
    schoolName?: string;
    gradeLevel?: string;
    classroom?: string;
    citizenId?: string;
    searchText?: string;
}) => {
    return mockStudents.filter(student => {
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
