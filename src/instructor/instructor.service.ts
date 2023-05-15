import * as bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, Repository } from "typeorm";
import { Course, EditInfo, FileUpload, ForgetPin, InstructorEdit, InstructorLogin, InstructorReg, ResetPassword, VerifyPin } from "./instructor.dto";
import { InstructorEntity } from "./instructor.entity";
import { Subject } from "rxjs";
import { MailerService } from "@nestjs-modules/mailer/dist";
import { CourseContentEntity } from "src/Entities/Course/content.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { StudentEntity } from "src/student/student.entity";
import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { resolve } from "path";
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import moment from "moment";
import { AdminEntity } from "src/admin/admin.entity";

@Injectable()
export class InstructorService {

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(InstructorEntity) private instructorRepo: Repository<InstructorEntity>,
        @InjectRepository(CourseContentEntity) private contentRepo: Repository<CourseContentEntity>,
        @InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
        @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
        @InjectRepository(CourseStudentEntity) private coursestudentRepo: Repository<CourseStudentEntity>,
        @InjectRepository(CatagoryEntity) private catagoryRepo: Repository<CatagoryEntity>,
        private readonly mailerService: MailerService
    ) { }

    private id: number;
    private pin: number;
    private name: any;

    //----------Instructor----------//

    //-----Instructor Registration-----//
    async registration(instructor: InstructorReg): Promise<any> {
        const today = new Date();
        const instructoraccount = new InstructorEntity();
        instructoraccount.instructor_name = instructor.instructor_name;
        instructoraccount.phonenumber = instructor.phonenumber;
        instructoraccount.email = instructor.email;
        instructoraccount.dob = instructor.dob;
        instructoraccount.joined_at = today;
        instructoraccount.status = false;

        const passhash = await bcrypt.genSalt();
        instructoraccount.password = await bcrypt.hash(instructor.password, passhash);

        const isValidName = await this.instructorRepo.findOneBy({ instructor_name: instructor.instructor_name });
        const isValidEmail = await this.instructorRepo.findOneBy({ email: instructor.email });

        if (!isValidName && !isValidEmail) {
            await this.instructorRepo.save(instructoraccount);
            return "Instructor Name : " + instructoraccount.instructor_name + " Successfully Added!!"
        }

        else {
            if (isValidName) {
                return instructoraccount.instructor_name + " Instructor Name Already Registered!"
            }
            if (isValidEmail) {
                return instructoraccount.email + " Email Already Registered!"
            }
        }
    }

    //-----Instructor Forget Pin-----//
    async forgetpin(instructor: ForgetPin) {
        let user = await this.instructorRepo.findOneBy({ email: instructor.email });

        if (user) {
            this.id = user.id;
            this.name = user.instructor_name;
            this.pin = Math.floor(Math.random() * 100000);

            await this.mailerService.sendMail({
                to: instructor.email,
                subject: `Forget Password Confirmation from GraspWay`,
                text: `Dear ["${this.name}"],
                Your verification PIN is: [G- ${this.pin}]             
                Please enter this PIN to complete your account setup.                
                Thank you,
                [GraspWay]`,
            });

            return "Varification Code Sent to this " + instructor.email + " Email!"
        }

        else {
            return instructor.email + " Email Not Found!"
        }
    }

    //-----Instructor Verify Pin-----//
    async verifypin(instructor: VerifyPin) {
        let isValid = false;
        if (instructor.pin == this.pin) {
            isValid = true;
        }

        if (isValid) {
            const passhash = await bcrypt.genSalt();
            instructor.password = await bcrypt.hash(instructor.password, passhash);
            this.instructorRepo.update(this.id, { password: instructor.password });
            this.pin = null;
            return "Password Successfully Changed!"
        }

        else {
            return "Invalid Pin Entered!"
        }
    }

    //-----Instructor Dashboard-----//
    async getDashboard(): Promise<any> {
        const instructorcount = await this.instructorRepo.count({});
        const studentcount = await this.studentRepo.count({});
        return { instructorcount, studentcount };
    }

    async getProfile(id: any) {
        const instruct = await this.instructorRepo
            .createQueryBuilder('ins')
            .where('id = :insid', { insid: id })
            .getOne();

        return instruct;
    }

    //-----Instructor Edit Partial Information-----//
    async editInfoByID(instructordto: EditInfo, id: number): Promise<any> {
        const { email, phonenumber } = instructordto;

        const updateResult = await this.instructorRepo.update({ id }, { email, phonenumber });

        if (updateResult.affected > 0) {
            return `Instructor Information Updated:
            Email: [${instructordto.email}]
            PhoneNumber: [${instructordto.phonenumber}]`;
        }
        else {
            return `Instructor Information Didn't Updated.`
        }
    }

    //-----Instructor Profile Update-----//
    async updateInstructorByID(instructordto: InstructorEdit, id: number): Promise<any> {
        let isVliad = false;
        if (isVliad == false) {
            const passhash = await bcrypt.genSalt();
            instructordto.password = await bcrypt.hash(instructordto.password, passhash);
            isVliad = true;

            if (isVliad == true) {
                this.instructorRepo.update(id, instructordto);
                return this.instructorRepo.findOneBy({ id: id });
            }
        }

        else {
            return `Instructor Information Didn't Updated.`;
        }
    }

    //-----Instructor Password Reset-----//
    async resetPasswordByID(instructordto: ResetPassword, id: number): Promise<any> {
        let isVliad = false;

        if (isVliad == false) {
            const passhash = await bcrypt.genSalt();
            instructordto.password = await bcrypt.hash(instructordto.password, passhash);
            isVliad = true;

            if (isVliad == true) {
                this.instructorRepo.update(id, { password: instructordto.password });
                return `Instructor Password Successflly Changed!`;
            }
        }

        else {
            return `Instructor Password Didn't Changed.`;
        }
    }

    //-----Instructor Search By ID-----//
    async searchInstructorByID(id): Promise<any> {
        const data = this.instructorRepo.findOneBy({ id });
        return data;
    }



    //-----Show Al Student-----//
    getStudents() {
        return this.studentRepo.find();
    }

    //-----Approve Student Request for Purchese Course-----//
    approveStudentinCourse(id: any): any {
        return this.coursestudentRepo.update(id, { status: true });
    }

    //-----Reject Student Request for Purchese Course-----//
    async rejectStudentByInstructor(id: any): Promise<any> {
        const user = await this.coursestudentRepo.findOne({
            where: {
                status: false,
                id: id
            }
        })
        if (user) {
            return this.coursestudentRepo.delete(id);
        }
        else {
            return "Student Not Found!"
        }
    }

    //-----Search Student By ID-----//
    async getStudentByID(id: any) {
        const data = await this.studentRepo.findOne({ where: { id: id } });
        if (data) {
            return data;
        }
        else {
            return "Student Not Found!"
        }
    }


    //-----Find Student By Course ID-----//
    async getStudentsByCourseID(id: any) {
        // select studentname from student 
        //     where id in 
        //         (select studentid from coursestudent 
        //             where courseid in 
        //                 (select courseid from coursestudent group by courseid 
        //                     having courseid = 4))

        const student = await this.studentRepo
            .createQueryBuilder('s')
            .select('s.studentname')
            .where((sid) => {
                const subqury0 = sid
                    .subQuery()
                    .select('cs.studentId')
                    .from(CourseStudentEntity, 'cs')
                    .where((course) => {
                        const subqury1 = course
                            .subQuery()
                            .select('cs.courseId')
                            .from(CourseStudentEntity, 'cs')
                            .groupBy('cs.courseId')
                            .having('cs.courseId = :id', { id: id })
                            .getQuery();
                        return 'cs.courseId IN ' + subqury1;
                    })
                    .getQuery();
                return 's.id IN ' + subqury0;
            })
            .getRawMany();

        return student;
    }

    //-----Delete Instructor-----//
    async deleteInstructorByID(id: any): Promise<any> {
        const user = await this.instructorRepo.findOne({
            where: { id: id }
        })
        if (user) {
            this.instructorRepo.delete(id);
            return user.instructor_name + " Instructor Deleted Successfuly!";
        }
        else {
            throw new UnauthorizedException({ message: "Instrutor Not Found!" })
        }
    }




    //-----Instructor Insert Course-----//
    async insertCourse(instructordto: Course): Promise<any> {
        const today = new Date();
        const course = new CourseEntity();
        course.coursename = instructordto.coursename;

        //course.catagory.id = instructordto.catagoryID;

        const instructor = await this.instructorRepo.findOne({
            select: {
                id: true
            },
            where: {
                id: instructordto.instructorID
            }
        })
        const catagory = await this.catagoryRepo.findOne({
            select: {
                id: true
            },
            where: {
                id: instructordto.catagoryID
            }
        })

        course.instructor = instructor;
        course.catagory = catagory;
        course.created_at = today;
        course.status = false;

        const isValid = await this.courseRepo.findOne({
            where: {
                coursename: course.coursename
            }
        })
        if (!isValid) {
            return await this.courseRepo.save(course);
        }
        else {
            throw new UnauthorizedException({ message: "Course Already Exist!" });
        }
    }

    //-----Instructor File Upload-----//
    async FileUpload(fileuploaddto: FileUpload) {
        const filename = new CourseContentEntity();
        filename.name = fileuploaddto.filename;
        filename.status = false;
        const course = await this.courseRepo.findOne({
            select: {
                id: true
            },
            where: {
                id: fileuploaddto.id
            }
        });
        if (!course) {
            throw new UnauthorizedException(`Could not find course with id ${fileuploaddto.id}`);
        }
        else {
            filename.course = course;
            return await this.contentRepo.save(filename);
        }

    }

    //-----Delete Course Content-----//
    async deletecoursecontent(id: number): Promise<any> {
        const user = await this.contentRepo.findOne({
            where: { id: id }
        })

        if (user) {
            const data = this.contentRepo.delete(id);
            return "Course Content Deleted!";
        }
        else {
            throw new UnauthorizedException({ message: "Content Not Found!" });
        }

    }

    //-----Instructor Provide Certificate-----//
    async getCertificateByID(id: any, course: any): Promise<any> {
        const data = await this.studentRepo.findOne({ where: { id: id } });
        const courseName = await this.courseRepo.findOne({
            where: {
                coursename: course,
                instructor: id
            }
        })

        if (data && courseName) {
            try {
                return new Promise<string>((resolve, reject) => {
                    const doc = new PDFDocument();

                    doc.image('./data/Logo.png', { fit: [250, 300], align: 'center' });

                    doc.fontSize(16).text(`\nWelcome To GraspWay\nCongratulation For Completing the Course.\nUser ID_${id}`, { align: 'center' });

                    const filename = `./data/certificates/${data.id}_certificate_${id}.pdf`;
                    const writeStream = fs.createWriteStream(filename);
                    doc.pipe(writeStream);
                    doc.end();

                    writeStream.on('finish', () => {
                        resolve(filename);
                    });
                    writeStream.on('error', (error) => {
                        reject(error);
                    });
                });
            }
            catch {
                throw new UnauthorizedException({ message: "Student Not Found!" });
            }
        }
        else {
            return "Student ID Not Found!"
        }
    }
}
