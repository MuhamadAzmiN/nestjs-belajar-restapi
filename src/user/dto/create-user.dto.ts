import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

// export class CreateUserDto {
//     nama : string
//     email : string
//     username : string
//     password : string
//     token : string
// }


export class CreateUserDto {

    @IsString()
    nama : string

    
    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    @IsString()
    // @IsEmail()
    email : string

    @IsNotEmpty()
    @IsString()
    password : string
    

    @IsEmpty()
    @IsString()
    token : string
}