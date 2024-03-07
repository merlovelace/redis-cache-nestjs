import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty, IsNumber, IsUUID, IsBoolean, IsOptional
} from "class-validator";

export class CreateAdvertDto {
  @IsNotEmpty()
  @IsUUID()
  readonly addressId : string
  @IsNotEmpty()
  @IsString()
  readonly name : string
  @IsNotEmpty()
  @IsString()
  readonly description : string
  @IsNotEmpty()
  @IsNumber()
  readonly price : number
}

export class UpdateAdvertDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id : string
  @IsOptional()
  @IsUUID()
  readonly addressId : string
  @IsOptional()
  @IsString()
  readonly name : string
  @IsOptional()
  @IsString()
  readonly description : string
  @IsOptional()
  @IsNumber()
  readonly price : number
  @IsOptional()
  @IsBoolean()
  readonly isDeleted : boolean
}

export class UploadPhotoAdvertDto {
  @IsNotEmpty()
  @IsUUID()
  readonly advertId : string
}

export class DeleteAdvertPhotoDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id : string
}

