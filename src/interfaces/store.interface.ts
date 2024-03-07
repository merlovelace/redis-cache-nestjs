import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty, IsNumber, IsUUID, IsBoolean, IsOptional, IsPhoneNumber
} from "class-validator";


export interface UpdateStore {
  name ?: string
}

export interface CreateAddress {
  city : string
  district: string
  neighbourhood: string
  address: string
  phone: string
}

export interface UpdateAddress {
  city ?: string
  district?: string
  neighbourhood?: string
  address?: string
  phone?: string
}