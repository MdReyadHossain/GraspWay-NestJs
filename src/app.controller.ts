import { Body, Controller, Get, Post, Session, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminLogin } from './admin/admin.dto';
import { AppLogin } from './app.dto';
import { AdminEntity } from './admin/admin.entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("/home")
    getHome(): string {
        return this.appService.getHome();
    }
    @Get("/Contact")
    getContact(): string {
        return this.appService.getContact();
    }

    @Post("/login")
    @UsePipes(new ValidationPipe())
    async loginAdmin(
        @Session() session,
        @Body() userdto: AppLogin
    ) {
        let user = await this.appService.loginUser(userdto);
        try {
            if (user.isLogin) {
                switch (user.data) {
                    case 'admin':
                        session.Id = user.admin.id;
                        session.admin_name = user.admin.admin_name;
                        session.address = user.admin.address;
                        session.email = user.admin.email;
                        session.joiningYear = user.admin.joiningYear;
                        session.phoneNo = user.admin.phoneNo;
                        session.image = user.admin.adminImage;
                        break;

                    case 'manager':
                        session.Id = user.manager.id;
                        session.manager_name = user.manager.manager_name;
                        session.email = user.manager.email;
                        session.age = user.manager.age;
                        session.phoneNo = user.manager.phonenumber;
                        break;

                    case 'instructor':
                        session.Id = user.instructor.id;
                        session.instructor_name = user.instructor.instructor_name;
                        session.email = user.instructor.email;
                        session.dob = user.instructor.dob;
                        session.phoneNo = user.instructor.phonenumber;
                        break;

                    case 'student':
                        session.Id = user.student.id;
                        session.student_name = user.student.student_name;
                        session.email = user.student.email;
                        session.dob = user.student.dob;
                        session.phoneNo = user.student.phonenumber;
                        break;

                    default:
                        return { message: "Username or Password Invalid!", success: false };
                }
                return { message: "Login Successfull!", success: true, user: user.data, session };
            }
            else {
                return { message: "Username or Password Invalid!", success: false };
            }
        }
        catch {
            return { message: "Username or Password Invalid!", success: false };
        }
    }
}
