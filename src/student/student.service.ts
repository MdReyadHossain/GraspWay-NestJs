import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentService {
    getDashboard(): any {
        return "Student entered dashboard";
    }
}