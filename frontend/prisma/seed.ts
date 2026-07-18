import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding CampusAI database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@campusai.com" },
    update: { password: adminPassword },
    create: {
      email: "admin@campusai.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin created:", admin.email);

  // Create student users
  const studentPassword = await bcrypt.hash("student123", 10);
  const student1 = await prisma.user.upsert({
    where: { email: "student@campusai.com" },
    update: { password: studentPassword },
    create: {
      email: "student@campusai.com",
      password: studentPassword,
      name: "Rahul Kumar",
      role: "STUDENT",
      department: "Computer Science & Engineering",
      semester: 5,
      rollNumber: "CS2023001",
      phone: "+91 9876543210",
    },
  });
  console.log("✅ Student created:", student1.email);

  // Create departments
  const departments = [
    { name: "Computer Science & Engineering", code: "CSE", description: "Department of Computer Science and Engineering", hodName: "Dr. Rajesh Kumar", hodEmail: "rajesh@campus.edu" },
    { name: "Mechanical Engineering", code: "MECH", description: "Department of Mechanical Engineering", hodName: "Dr. Suresh Reddy", hodEmail: "suresh@campus.edu" },
    { name: "Electronics & Communication", code: "ECE", description: "Department of Electronics and Communication Engineering", hodName: "Dr. Priya Sharma", hodEmail: "priya@campus.edu" },
    { name: "Civil Engineering", code: "CE", description: "Department of Civil Engineering", hodName: "Dr. Vikram Singh", hodEmail: "vikram@campus.edu" },
    { name: "Electrical Engineering", code: "EE", description: "Department of Electrical Engineering", hodName: "Dr. Lakshmi Devi", hodEmail: "lakshmi@campus.edu" },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { code: dept.code },
      update: {},
      create: dept,
    });
  }
  console.log("✅ Departments created:", departments.length);

  // Get CSE department for relations
  const cse = await prisma.department.findUnique({ where: { code: "CSE" } });

  // Create faculty
  if (cse) {
    const facultyData = [
      { name: "Dr. Anand Prakash", email: "anand@campus.edu", designation: "Professor", departmentId: cse.id, subjects: "Data Structures, Algorithms", office: "CSE-201", officeHours: "Mon-Fri 10:00-12:00" },
      { name: "Prof. Meena Gupta", email: "meena@campus.edu", designation: "Associate Professor", departmentId: cse.id, subjects: "Database Systems, Software Engineering", office: "CSE-202", officeHours: "Mon-Fri 14:00-16:00" },
      { name: "Dr. Karthik Rajan", email: "karthik@campus.edu", designation: "Assistant Professor", departmentId: cse.id, subjects: "Machine Learning, Artificial Intelligence", office: "CSE-305", officeHours: "Tue-Thu 11:00-13:00" },
    ];

    for (const faculty of facultyData) {
      await prisma.faculty.upsert({
        where: { email: faculty.email },
        update: {},
        create: faculty,
      });
    }
    console.log("✅ Faculty created:", facultyData.length);

    // Create timetable entries
    const timetableData = [
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "MONDAY", startTime: "09:00", endTime: "10:00", subject: "Data Structures", faculty: "Dr. Anand Prakash", room: "CSE-101", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "MONDAY", startTime: "10:00", endTime: "11:00", subject: "Database Systems", faculty: "Prof. Meena Gupta", room: "CSE-102", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "MONDAY", startTime: "11:00", endTime: "12:00", subject: "Machine Learning", faculty: "Dr. Karthik Rajan", room: "CSE-201", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "TUESDAY", startTime: "09:00", endTime: "11:00", subject: "DS Lab", faculty: "Dr. Anand Prakash", room: "CSE-Lab-1", type: "Lab" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "TUESDAY", startTime: "11:00", endTime: "12:00", subject: "Software Engineering", faculty: "Prof. Meena Gupta", room: "CSE-103", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "WEDNESDAY", startTime: "09:00", endTime: "10:00", subject: "Machine Learning", faculty: "Dr. Karthik Rajan", room: "CSE-201", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "WEDNESDAY", startTime: "10:00", endTime: "12:00", subject: "DBMS Lab", faculty: "Prof. Meena Gupta", room: "CSE-Lab-2", type: "Lab" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "THURSDAY", startTime: "09:00", endTime: "10:00", subject: "Data Structures", faculty: "Dr. Anand Prakash", room: "CSE-101", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "THURSDAY", startTime: "10:00", endTime: "11:00", subject: "Artificial Intelligence", faculty: "Dr. Karthik Rajan", room: "CSE-202", type: "Lecture" },
      { departmentId: cse.id, semester: 5, section: "A", dayOfWeek: "FRIDAY", startTime: "09:00", endTime: "11:00", subject: "ML Lab", faculty: "Dr. Karthik Rajan", room: "CSE-Lab-3", type: "Lab" },
    ];

    await prisma.timetable.deleteMany({ where: { departmentId: cse.id, semester: 5 } });
    for (const entry of timetableData) {
      await prisma.timetable.create({ data: entry });
    }
    console.log("✅ Timetable entries created:", timetableData.length);
  }

  // Create academic calendar entries
  const calendarData = [
    { title: "Semester 5 Begins", startDate: new Date("2024-07-15"), eventType: "Semester Start", isImportant: true },
    { title: "Independence Day Holiday", startDate: new Date("2024-08-15"), eventType: "Holiday", isImportant: false },
    { title: "Internal Exam 1", startDate: new Date("2024-08-25"), endDate: new Date("2024-08-30"), eventType: "Exam", isImportant: true },
    { title: "Ganesh Chaturthi Holiday", startDate: new Date("2024-09-07"), eventType: "Holiday" },
    { title: "Internal Exam 2", startDate: new Date("2024-10-10"), endDate: new Date("2024-10-15"), eventType: "Exam", isImportant: true },
    { title: "Dussehra Break", startDate: new Date("2024-10-12"), endDate: new Date("2024-10-14"), eventType: "Holiday" },
    { title: "Diwali Break", startDate: new Date("2024-11-01"), endDate: new Date("2024-11-03"), eventType: "Holiday", isImportant: true },
    { title: "External Exams Begin", startDate: new Date("2024-12-01"), endDate: new Date("2024-12-20"), eventType: "Exam", isImportant: true },
  ];

  await prisma.academicCalendar.deleteMany({});
  for (const event of calendarData) {
    await prisma.academicCalendar.create({ data: event });
  }
  console.log("✅ Calendar events created:", calendarData.length);

  // Create exam schedules
  const examData = [
    { title: "Internal Exam 1 - Data Structures", subject: "Data Structures", department: "CSE", semester: 5, examDate: new Date("2024-08-25"), startTime: "09:00", endTime: "11:00", room: "Exam Hall 1", examType: "Internal" },
    { title: "Internal Exam 1 - Database Systems", subject: "Database Systems", department: "CSE", semester: 5, examDate: new Date("2024-08-26"), startTime: "09:00", endTime: "11:00", room: "Exam Hall 1", examType: "Internal" },
    { title: "Internal Exam 1 - Machine Learning", subject: "Machine Learning", department: "CSE", semester: 5, examDate: new Date("2024-08-27"), startTime: "09:00", endTime: "11:00", room: "Exam Hall 2", examType: "Internal" },
  ];

  await prisma.examSchedule.deleteMany({});
  for (const exam of examData) {
    await prisma.examSchedule.create({ data: exam });
  }
  console.log("✅ Exam schedules created:", examData.length);

  // Create notices
  const noticeData = [
    { title: "Important: Semester Registration Deadline", content: "All students must complete their semester registration by July 20, 2024. Late registrations will not be accepted.", category: "ACADEMIC", priority: "URGENT", isPinned: true, createdBy: admin.id },
    { title: "Placement Drive - TCS", content: "TCS will be conducting a campus placement drive on August 5, 2024. Eligible students must register through the placement portal.", category: "PLACEMENT", priority: "HIGH", createdBy: admin.id },
    { title: "Library Hours Extended", content: "The central library will now be open from 8:00 AM to 10:00 PM during exam season.", category: "LIBRARY", priority: "MEDIUM", createdBy: admin.id },
    { title: "Annual Sports Day", content: "Annual sports day will be held on September 15, 2024. Students interested in participating should contact their department sports coordinator.", category: "SPORTS", priority: "MEDIUM", createdBy: admin.id },
    { title: "Hostel Fee Payment Reminder", content: "Last date for hostel fee payment for the current semester is August 1, 2024. Late fee of Rs. 500 will be charged after the deadline.", category: "HOSTEL", priority: "HIGH", createdBy: admin.id },
  ];

  await prisma.notice.deleteMany({});
  for (const notice of noticeData) {
    await prisma.notice.create({ data: notice });
  }
  console.log("✅ Notices created:", noticeData.length);

  // Create events
  const eventData = [
    { title: "TechFest 2024", description: "Annual technical festival featuring hackathons, workshops, and tech talks.", venue: "Main Auditorium", startDate: new Date("2024-09-20"), endDate: new Date("2024-09-22"), category: "Technical", createdBy: admin.id },
    { title: "Cultural Night", description: "Annual cultural festival with performances, music, and dance.", venue: "Open Air Theatre", startDate: new Date("2024-10-05"), category: "Cultural", createdBy: admin.id },
    { title: "AI/ML Workshop", description: "Hands-on workshop on Machine Learning and AI fundamentals.", venue: "CSE Seminar Hall", startDate: new Date("2024-08-10"), category: "Workshop", department: "CSE", maxParticipants: 100, createdBy: admin.id },
  ];

  await prisma.event.deleteMany({});
  for (const event of eventData) {
    await prisma.event.create({ data: event });
  }
  console.log("✅ Events created:", eventData.length);

  // Create hostel info
  const hostelData = [
    { name: "Boys Hostel - Block A", type: "Boys", warden: "Mr. Ramesh Babu", wardenPhone: "+91 9876543001", wardenEmail: "ramesh@campus.edu", capacity: 200, facilities: "Wi-Fi, Mess, Gym, Reading Room, Laundry", rules: "1. Entry closes at 10 PM\n2. No outside food in rooms\n3. Maintain silence after 11 PM" },
    { name: "Girls Hostel - Block B", type: "Girls", warden: "Mrs. Sunita Rani", wardenPhone: "+91 9876543002", wardenEmail: "sunita@campus.edu", capacity: 150, facilities: "Wi-Fi, Mess, Indoor Games, Reading Room, 24/7 Security", rules: "1. Entry closes at 9 PM\n2. Visitors allowed only in common area\n3. Maintain cleanliness" },
  ];

  await prisma.hostelInfo.deleteMany({});
  for (const hostel of hostelData) {
    await prisma.hostelInfo.create({ data: hostel });
  }
  console.log("✅ Hostel info created:", hostelData.length);

  // Create transport routes
  const transportData = [
    { routeNumber: "R1", routeName: "City Center - Campus", busNumber: "AP-01-1234", driver: "Mr. Raju", driverPhone: "+91 9876543010", departureTime: "07:30", arrivalTime: "08:30", pickupPoints: "City Center, Railway Station, Bus Stand, Medical College, Campus Gate" },
    { routeNumber: "R2", routeName: "Old City - Campus", busNumber: "AP-01-5678", driver: "Mr. Sunil", driverPhone: "+91 9876543011", departureTime: "07:15", arrivalTime: "08:15", pickupPoints: "Old City, Charminar, Nampally, Ameerpet, Campus Gate" },
    { routeNumber: "R3", routeName: "ECIL - Campus", busNumber: "AP-01-9012", driver: "Mr. Venkat", driverPhone: "+91 9876543012", departureTime: "07:00", arrivalTime: "08:00", pickupPoints: "ECIL, Uppal, Habsiguda, Tarnaka, Campus Gate" },
  ];

  await prisma.transportRoute.deleteMany({});
  for (const route of transportData) {
    await prisma.transportRoute.create({ data: route });
  }
  console.log("✅ Transport routes created:", transportData.length);

  // Create campus locations
  const locationData = [
    { name: "Main Building", type: "BUILDING", description: "Administrative block with principal's office", facilities: "Principal Office, Dean Office, Exam Cell, Conference Hall" },
    { name: "CSE Block", type: "BUILDING", description: "Computer Science & Engineering department building", facilities: "Classrooms, Computer Labs, Faculty Offices, Seminar Hall" },
    { name: "Central Library", type: "LIBRARY", description: "Main library with digital and print resources", facilities: "Digital Library, Reading Hall, Journals Section, Book Bank" },
    { name: "CAD Lab", type: "LAB", description: "Computer Aided Design Laboratory", building: "MECH Block", floor: "2nd Floor" },
    { name: "Sports Complex", type: "SPORTS", description: "Indoor and outdoor sports facilities", facilities: "Cricket Ground, Basketball Court, Badminton, Table Tennis, Gym" },
    { name: "Main Canteen", type: "CANTEEN", description: "Central canteen serving breakfast, lunch, and snacks", facilities: "Veg & Non-Veg, South Indian, North Indian, Fast Food" },
  ];

  await prisma.campusLocation.deleteMany({});
  for (const location of locationData) {
    await prisma.campusLocation.create({ data: location });
  }
  console.log("✅ Campus locations created:", locationData.length);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📧 Login Credentials:");
  console.log("   Admin: admin@campusai.com / admin123");
  console.log("   Student: student@campusai.com / student123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
