import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getContact(): string {
        return 'Contact';
    }
    getHome(): string {
        return 'Home';
    }

    getHello(): string {
        return 'Hello World!';
    }
}
