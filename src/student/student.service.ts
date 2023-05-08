import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course, Studentinfo, StudentLogin } from "./student.dto";
import { StudentEntity } from "./student.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>
    ) { }
    //-----Instructor Registration-----//

    //----------Instructor----------//

    //-----Instructor Registration-----//
    async registration(student: Studentinfo): Promise<any> {
        const today = new Date();
        const studentaccount = new StudentEntity();
        studentaccount.student_name = student.student_name;
        studentaccount.password = student.password;
        studentaccount.phonenumber = student.phonenumber;
        studentaccount.email = student.email;
        studentaccount.dob = student.dob;
        studentaccount.regitration = today;
        studentaccount.status = true;

        const passhash = await bcrypt.genSalt();
        studentaccount.password = await bcrypt.hash(student.password, passhash);

        const isValidName = await this.studentRepo.findOneBy({ student_name: student.student_name });
        const isValidEmail = await this.studentRepo.findOneBy({ email: student.email });

        if (!isValidName && !isValidEmail) {
            await this.studentRepo.save(studentaccount);
            return "Student Name : " + studentaccount.student_name + " Successfully Added!!"
        }

        else {
            if (isValidName) {
                return studentaccount.student_name + " Student Name Already Registered!";
            }
            if (isValidEmail) {
                return studentaccount.email + " Email Already Registered!"
            }
        }
    }

    //-----student Forget Pin-----//
    // async forgetpin(student: ForgetPin){
    //     let user = await this.studentRepo.findOneBy({email: student.email});

    //     if(user){
    //         this.id = user.id;
    //         this.name = user.studentname;
    //         this.pin = Math.floor(Math.random() * 100000);

    //         await this.mailerService.sendMail({
    //             to: student.email,
    //             subject: `Forget Password Confirmation from GraspWay`,
    //             text: `Dear ["${this.name}"],
    //             Your verification PIN is: [G- ${this.pin}]             
    //             Please enter this PIN to complete your account setup.                
    //             Thank you,
    //             [GraspWay]`,
    //         });

    //         return "Varification Code Sent to this " + student.email + " Email!"
    //     }

    //     else{
    //         return student.email + " Email Not Found!"
    //     }
    // }

    //-----student Verify Pin-----//
    // async verifypin(student: Studentinfo){
    //     let isValid = false;
    //     if(student.pin == this.pin){
    //         isValid = true;
    //     }

    //     if(isValid){
    //         const passhash = await bcrypt.genSalt();
    //         student.password = await bcrypt.hash(student.password, passhash);
    //         this.studentRepo.update(this.id, {password: student.password});
    //         this.pin = null;
    //         return "Password Successfully Changed!"
    //     }

    //     else{
    //         return "Invalid Pin Entered!"
    //     }
    // }

    //-----student Dashboard-----//
    async getDashboard(): Promise<any> {
        const studentcount = await this.studentRepo.count({});
        return `Welcome To GraspWay\n\nStudent Dashboard:
        Student: [${studentcount}]`;
    }

    //-----student Edit Partial Information-----//
    async editInfoByID(studentdto: Studentinfo, id: number): Promise<any> {
        this.studentRepo.update(id, studentdto);
        return "student Profile Updated!";
    }

    deleteStudentByID(id: number): any {
        return this.studentRepo.delete(id);
    }

    courseEnroll(studentdto: Course): any {
        throw new Error("Method not implemented.");
    }
    addtocartCourse(studentdto: Studentinfo): any {
        throw new Error("Method not implemented.");
    }
}
