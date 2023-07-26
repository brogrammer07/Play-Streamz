import { Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import AWS from "aws-sdk";
import { AuthRequest } from "../../Types";
import { AppError } from "../../Utils/app.error.handle";
import globals from "../../Config/globals.config";
import { v4 as uuidv4 } from "uuid";
const s3 = new AWS.S3();

const generatePresignedUrl = (
  filename: string,
  filetype: string
): Promise<string> => {
  const params = {
    Bucket: globals.AWS_BUCKET_NAME,
    Key: `${filetype.split("/")[0]}/${uuidv4()} - ${filename}`,
    Expires: 3600,
    ContentType: filename, // Set the appropriate content type of your video
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

const getPresignedUrlController = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { videoFileName, videoFileType, imageFileName, imageFileType } =
      req.query;
    var videoUrl: string = null;
    var imageUrl: string = null;
    try {
      videoUrl = await generatePresignedUrl(
        videoFileName as string,
        videoFileType as string
      );
    } catch (error) {
      new AppError(error, 500, "ERR_GENERATE_VIDEO_PRESIGNED_URL");
    }
    try {
      imageUrl = await generatePresignedUrl(
        imageFileName as string,
        imageFileType as string
      );
    } catch (error) {
      new AppError(error, 500, "ERR_GENERATE_IMAGE_PRESIGNED_URL");
    }
    if (imageUrl && videoUrl)
      return res.status(200).json({
        status: "success",
        message: "Presigned Url",
        data: { videoUrl, imageUrl },
      });
    else
      new AppError(
        "No url returned by AWS S3",
        500,
        "ERR_GENERATE_PRESIGNED_URL"
      );
  }
);

export { getPresignedUrlController };
