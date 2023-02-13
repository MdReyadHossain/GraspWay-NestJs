import { Injectable } from "@nestjs/common";
import { AdminForm } from "./admin.dto";

@Injectable()
export class AdminService {

getIndex():string { 
    return "Admin Index"; 
}

getInstructor(id):any {
    
    return "the id is "+id;
}

getStudent(qry):any {
    
    return "the id is "+qry.id +" and name is "+qry.name;
}

insertInstructor(mydto:AdminForm):any {

        return "Admin Inserted name" + mydto.name;
    }

updateInstructor(name, id):any {
        return "Admin updated name: " +name + "\nWhere " + id + " is updated";
    }
}