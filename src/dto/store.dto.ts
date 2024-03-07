import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty, IsNumber, IsUUID, IsBoolean, IsOptional, IsPhoneNumber
} from "class-validator";

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  readonly district: string;
  @IsNotEmpty()
  @IsString()
  readonly neighbourhood: string;
  @IsNotEmpty()
  @IsString()
  readonly address: string;
  @IsPhoneNumber()
  @IsOptional()
  readonly phone: string;
}

export class VerifyAddressDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  readonly code: string;
}

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  readonly district: string;
  @IsNotEmpty()
  @IsString()
  readonly neighbourhood: string;
  @IsNotEmpty()
  @IsString()
  readonly address: string;
  @IsPhoneNumber()
  @IsOptional()
  readonly phone: string;
}