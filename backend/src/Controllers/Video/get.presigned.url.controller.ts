import { Response } from "express-serve-static-core";
import catchAsync from "../../Utils/catch.async";
import AWS from "aws-sdk";
import { AuthRequest } from "../../Types";
import { AppError } from "../../Utils/app.error.handle";
import globals from "../../Config/globals.config";
const s3 = new AWS.S3();

const generatePresignedUrl = (key: string): Promise<string> => {
  const params = {
    Bucket: globals.AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600,
    ContentType: "video/*", // Set the appropriate content type of your video
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
    const { filename } = req.query;
    try {
      const url = await generatePresignedUrl(filename as string);
      res.json({ url });
    } catch (error) {
      new AppError(error, 500, "ERR_GENERATE_PRESIGNED_URL");
    }
  }
);

export { getPresignedUrlController };
