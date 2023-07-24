import AWS from "aws-sdk";
import globals from "./globals.config";

AWS.config.update({
  region: globals.AWS_REGION,
  accessKeyId: globals.AWS_ACCESS_KEY_ID, // Access key ID from .env
  secretAccessKey: globals.AWS_SECRET_ACCESS_KEY, // Secret access key from .env
  signatureVersion: "v4", // Specify the desired signature version
});
