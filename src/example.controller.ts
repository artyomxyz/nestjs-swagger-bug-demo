import {Controller, Get} from "@nestjs/common";
import {ExampleDto} from "./example.dto";

@Controller('example')
export class ExampleController {
    @Get()
    get(): ExampleDto {
        return {
            hello: 'world',
        }
    }
}