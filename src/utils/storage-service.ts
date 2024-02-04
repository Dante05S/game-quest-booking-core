import '../config/cloudnary-storage'
import { type ImageTransformationOptions, v2 as cloudinary } from 'cloudinary'
import { ServerError } from '../helpers/exceptions-errors'

export const uploadImage = async (
  file: Express.Multer.File,
  route: string,
  id: string
): Promise<string> => {
  // Validates if the file has the allowed format
  const fileType = file.mimetype.replace('image/', '')
  if (
    fileType !== 'jpeg' &&
    fileType !== 'jpg' &&
    fileType !== 'png' &&
    fileType !== 'gif' &&
    fileType !== 'webp' &&
    fileType !== 'svg'
  ) {
    throw new Error(
      'El formato de la imagen es inválido. Formatos aceptados .png, .jpg, .jpeg, .gif, .webp y .svg'
    )
  }
  const publicId = `${route}`
  const transformations: ImageTransformationOptions = {
    format: 'webp'
  }
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: publicId, transformation: transformations },
        (error, image) => {
          if (error !== undefined) {
            reject(new ServerError(error.message))
          } else {
            if (image?.secure_url === undefined || image?.url === undefined) {
              throw new ServerError(
                `Ocurrió un error al subir una imagen de un recurso (id: ${id}) en la ruta ${route}`
              )
            }

            // Search file type image
            const initIndexPublicId = image.secure_url.lastIndexOf(route)
            const type = image.secure_url.substring(
              initIndexPublicId + route.length
            )
            resolve(image.secure_url.replace(type, '.webp'))
          }
        }
      )
      .end(file.buffer)
  })
}
