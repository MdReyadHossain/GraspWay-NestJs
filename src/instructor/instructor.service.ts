import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course, EditInfo, ForgetPin, InstructorEdit, InstructorLogin, InstructorReg, ResetPassword, VerifyPin } from "./instructor.dto";
import { InstructorEntity } from "./instructor.entity";
import { Subject } from "rxjs";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class InstructorService{
    adminRepo: any;

    constructor(
        @InjectRepository(InstructorEntity)
        private instructorRepo: Repository<InstructorEntity>,
        private readonly mailerService: MailerService
    ) {}

    private id: number;
    private pin: number;
    private name: any;

    //----------Instructor----------//

    //-----Instructor Registration-----//
    async registration(instructor: InstructorReg): Promise<any>{
        const instructoraccount = new InstructorEntity();
        instructoraccount.instructorname = instructor.instructorname;
        instructoraccount.phonenumber = instructor.phonenumber;
        instructoraccount.email = instructor.email;
        instructoraccount.age = instructor.age;
        instructoraccount.dob = instructor.dob;

        const passhash = await bcrypt.genSalt();
        instructoraccount.password = await bcrypt.hash(instructor.password, passhash);

        const isValidName = await this.instructorRepo.findOneBy({ instructorname: instructor.instructorname });
        const isValidEmail = await this.instructorRepo.findOneBy({ email: instructor.email });

        if(!isValidName && !isValidEmail){
            await this.instructorRepo.save(instructoraccount);
            return "Instructor Name : " + instructoraccount.instructorname +" Successfully Added!!"
        }

        else{
            if(isValidName){
                return instructoraccount.instructorname + " Instructor Name Already Registered!"
            }
            if(isValidEmail){
                return instructoraccount.email + " Email Already Registered!"
            }
        }
    }

    //-----Instructor Login-----//
    async login(instructor: InstructorLogin){
        const name = await this.instructorRepo.findOneBy({ instructorname: instructor.instructorname });
        
        if(name){
            const isValidPass = await bcrypt.compare(instructor.password, name.password);
            if(isValidPass){
                return 1;
            }
            
            else{
                return 0;
            }            
        }

        else{
            return 0;            
        }
    }

    //-----Instructor Forget Pin-----//
    async forgetpin(instructor: ForgetPin){
        let user = await this.instructorRepo.findOneBy({email: instructor.email});

        if(user){
            this.id = user.id;
            this.name = user.instructorname;
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

        else{
            return instructor.email + " Email Not Found!"
        }
    }

    //-----Instructor Verify Pin-----//
    async verifypin(instructor: VerifyPin){
        let isValid = false;
        if(instructor.pin == this.pin){
            isValid = true;
        }

        if(isValid){
            const passhash = await bcrypt.genSalt();
            instructor.password = await bcrypt.hash(instructor.password, passhash);
            this.instructorRepo.update(this.id, {password: instructor.password});
            this.pin = null;
            return "Password Successfully Changed!"
        }

        else{
            return "Invalid Pin Entered!"
        }
    }

    //-----Instructor Dashboard-----//
    async getDashboard(): Promise<any>{
        const instructorcount = await this.instructorRepo.count({});
        return `Welcome To GraspWay\n\nInstructor Dashboard:
        Instructor: [${instructorcount}]`;
    }

    //-----Instructor Edit Partial Information-----//
    async editInfoByID(instructordto: EditInfo, id: number): Promise<any>{
        const { email, phonenumber } = instructordto;

        const updateResult = await this.instructorRepo.update({ id }, { email, phonenumber });
        
        if(updateResult.affected > 0){
            return `Instructor Information Updated:
            Email: [${instructordto.email}]
            PhoneNumber: [${instructordto.phonenumber}]`;
        }
        else{
            return `Instructor Information Didn't Updated.`
        }
    }

    //-----Instructor Profile Update-----//
    async updateInstructorByID(instructordto: InstructorEdit, id: number): Promise<any> {
        let isVliad = false;
        if(isVliad == false){
            const passhash = await bcrypt.genSalt();
            instructordto.password = await bcrypt.hash(instructordto.password, passhash);
            isVliad = true;

            if(isVliad == true){
                this.instructorRepo.update(id, instructordto);
                return this.instructorRepo.findOneBy({id: id});
            }
        }
        
        else{
            return `Instructor Information Didn't Updated.`;
        }
        
    }

    //-----Instructor Password Reset-----//
    async resetPasswordByID(instructordto: ResetPassword, id: number): Promise<any>{
        let isVliad = false;

        if(isVliad == false){
            const passhash = await bcrypt.genSalt();
            instructordto.password = await bcrypt.hash(instructordto.password, passhash);
            isVliad = true;

            if(isVliad == true){
                this.instructorRepo.update(id, {password: instructordto.password});
                return `Instructor Password Successflly Changed!`;
            }
        }
        
        else{
            return `Instructor Password Didn't Changed.`;
        }
    }

    //-----Instructor Search-----//
    async searchInstructorByID(id): Promise<any>{
        const data = this.instructorRepo.findOneBy({id});
        return data;
    }

    //-----Insert Sudent-----//
    insertStudent(instructordto: InstructorReg):any{
        //return "Student Inserted Name: " + instructordto.name + " and ID is: " + instructordto.id;
    }

    getStudentByQuery(qur): any{
        return "Student Name is " + qur.name + ". ID is " + qur.id;
    }
    
    getStudentByID(id): any{
        return "Student ID is " + id;
    }

    

    getInstructorProfile(qur): any{
        return "Instructor Name Changed to " + qur.name +"."
    }

    insertCourse(instructordto: Course):any{
        return instructordto.course + " Course Inserted. Where ID is " + instructordto.id +".";
    }

    

    deleteInstructorByID(id): any{
        return this.instructorRepo.delete(id);
    }

    
}