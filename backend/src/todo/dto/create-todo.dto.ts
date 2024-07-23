import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
 @IsNotEmpty()
 @IsString()
 text  : string ; 
@IsBoolean()
completed : boolean

}
