import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, Length } from "class-validator";


export class LoginRegister {
    @IsString()
    @IsNotEmpty()
    @Transform(({value}):string => value.trim(0))
    @Length(1, 30)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({value}):string => value.trim(0))
    @Length(8, 30)
    password: string;
}