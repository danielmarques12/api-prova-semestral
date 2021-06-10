import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

import * as cloudinaryConfig from '../../config/cloudinary';
import query from '../../shared/infra/knex/knex';

class UploadFilesUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { type } = request.user;
    const { bootcamp_id } = request.params;
    const { tempFilePath } = (request as any).files.file;

    if (type !== 'coordinator') {
      return response.status(401).json({ error: 'Permission denied' });
    }

    // Clean tmp folder
    fs.rm(
      path.resolve(__dirname, '..', '..', '..', 'tmp'),
      { recursive: true },
      (error) => {
        console.error(error);
      }
    );

    cloudinary.v2.config(cloudinaryConfig);
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: 'PS13SI-uploads',
    });

    const file_id: number = await query('files')
      .insert({
        url: secure_url,
      })
      .returning('id');

    await query('bootcamps')
      .where({ id: bootcamp_id })
      .update({ file_id: file_id[0] });

    return response.status(201).json('File uploaded successfully');
  }
}
export { UploadFilesUseCase };
