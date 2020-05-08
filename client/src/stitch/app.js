import React from "react";
import {
  AwsServiceClient,
  AwsRequest,
} from "mongodb-stitch-browser-services-aws";
import { RemoteMongoClient } from "mongodb-stitch-browser-services-mongodb-remote";
import { stitchClient } from "./authentication";

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);

const convertAudioToBSONBinaryObject = (files) => {
  // console.log(files);
  return files.map((file) => {
    // console.log(file);
    return new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve({
          $binary: {
            base64: event.target.result.split(",")[1],
            subType: "00",
          },
        });
      };
      fileReader.readAsDataURL(file);
    });
  });
};

// const [global, dispatch] = useStoreContext();
// let userEmail = global.user.email;
// let userPass = global.user.password;
// console.log(global);

const handleFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file found");
    }

    const urlArr = [];
    const awsPromiseArr = [];

    // console.log(stitchClient.auth.user)

    // converting bson
    const BSON = convertAudioToBSONBinaryObject(file);
    Promise.all(BSON).then((result) => {
      // console.log(result);

      for (let i in result) {
        // const audiofile = mongodb.db("data").collection("audiofile");
        //now we need an instance of AWS service client
        const key = `${stitchClient.auth.user.id}-${file[i].name}`;
        // const key = `5ea8ae5528e283a520824220-${file[i].name}`;
        const aws = stitchClient.getServiceClient(
          AwsServiceClient.factory,
          "AWS"
        );
        const bucket = "bandwagon";
        const url =
          "http://" + bucket + ".s3.amazonaws.com/" + encodeURIComponent(key);
        const args = {
          ACL: "public-read",
          Bucket: bucket,
          ContentType: file[i].type,
          Key: key,
          Body: result[i],
        };
        // building the request
        const request = new AwsRequest.Builder()
          .withService("s3")
          .withAction("PutObject")
          .withRegion("us-east-2")
          .withArgs(args);

        const awsProm = aws.execute(request.build());
        //  console.log(awsProm)
        awsPromiseArr.push(awsProm);

        //  console.log("urls loaded to AWS", url);
        urlArr.push(url);
      }
      Promise.all(awsPromiseArr)
        .then((result) => {
          // console.log("AWS promises", result)
          for (let i in result) {
            console.log(result[i]);
          }
          resolve(urlArr);
          console.log("Stitch: urls array loaded to AWS", urlArr);
          // console.log(result)
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export { handleFileUpload };
