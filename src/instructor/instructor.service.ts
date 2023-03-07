import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course, ForgetPin, InstructorLogin, InstructorReg } from "./instructor.dto";
import { InstructorEntity } from "./instructor.entity";
import { Subject } from "rxjs";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class InstructorService{
    //mailerService: MailerService;

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
        instructoraccount.course = instructor.course;

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
        const isValidPass = await bcrypt.compare(instructor.password, name.password) 
        
        if(isValidPass){
            return instructor.instructorname + " Login Successful!!"
        }

        else{
            if(name == null){
                return instructor.instructorname + " Instructor Not Found!"
            }
            if(!isValidPass){
                return "Incorrect Password!"
            }
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

    //-----Instructor Dashboard-----//
    getDashboard(): any{
        return this.instructorRepo.find();
    }

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

    updateInstructorByID(instructordto: InstructorReg, id: number): any {
        return this.instructorRepo.update(id, instructordto);
    }

    deleteInstructorByID(id): any{
        return this.instructorRepo.delete(id);
    }

    editEmailByID(instructordto: InstructorReg, id: number): any{
        return this.instructorRepo.update(id, {email: instructordto.email});
    }
}