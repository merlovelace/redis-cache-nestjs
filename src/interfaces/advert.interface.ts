export interface AdvertCreate {
  addressId : string
  name : string
  description : string
  price : number
}

export interface UpdateAdvert {
  id: string
  addressId ?: string
  name ?: string
  description ?: string
  price ?: number
  isDeleted ?: boolean
}

export interface UploadPhotoToAdvert {
  advertId: string
}

export interface DeleteAdvertsPhoto {
  id: string
}