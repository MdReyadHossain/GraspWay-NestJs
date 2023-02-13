import { Injectable } from "@nestjs/common";
import { AdminProfile } from "./admin.dto";

@Injectable()
export class AdminService {
    loginAdmin(): any {
        return "Login successfully";
    }

    getDashboard(student, instructor, manager): any {
        return `Admin Dashboard\n\nStudent: ${student},\nInstructor: ${instructor}, \nManager: ${manager}`;
    }

    editProfile(admin: AdminProfile): any {
        return `Profile Updated:
                Name: ${admin.name}
                Email: ${admin.email} 
                Phone Number: ${admin.phoneNo} 
                Address: ${admin.address}
                Establishment: ${admin.establishment}
                `;
    }

    forgetPassword(admin: AdminProfile): any {
        return `Your Password is ${admin.password}\nDon't share with anyone!`;
    }

    resetPassword(pass): any {
        return "Password reseted!";
    }
}
