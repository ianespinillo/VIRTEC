import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
	await db.$connect();
	await db.$executeRaw`TRUNCATE TABLE 
    "Student", 
    "Attendance", 
    "Category", 
    "Course", 
    "withdrawDetail", 
    "School", 
    "Speciallity", 
    "Tool", 
    "Subject", 
    "Grade", 
    "Storeroom", 
    "Storeman", 
    "Preceptor", 
    "Teacher", 
    "Withdraw", 
    "measurementType", 
    "useType", 
    "User", 
    "userDetail", 
    "Roles", 
    "userRole", 
    "studentCourse", 
    "SchoolPeriod", 
    "studentDetail", 
    "studentResponsable", 
    "Permission", 
    "PermissionRole" 
  RESTART IDENTITY CASCADE`;
	await db.$disconnect();
}

main()
	.then(() => console.log('DB Truncated'))
	.catch((err) => console.error(err));
