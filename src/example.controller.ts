import {Controller} from "@nestjs/common";
import {ExampleDto} from "./example.dto";

@Controller('example')
export class ExampleController {
    get(): ExampleDto {
        return {
            hello: 'world',
        }
    }
}