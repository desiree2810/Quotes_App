import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQuoteDto {

    @IsNotEmpty()
    @IsString()
    quote: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    like: number;

    @IsNotEmpty()
    @IsNumber()
    dislikes: number;

    @IsNotEmpty()
    @IsString()
    tag: string;
    
    userId:number
}
