import React, { Component } from "react";
import FileInput from "../components/FileInput";
import {
  AwsServiceClient,
  AwsRequest,
} from "mongodb-stitch-browser-services-aws";
import { Stitch } from "mongodb-stitch-browser-sdk";

// this view is created to test file uploads
const stitchClient = Stitch.initializeDefaultAppClient("bandwagon-qlcuw");

const convertAudioToBSONBinaryObject = (file) => {
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
};

const aws = stitchClient.getServiceClient(AwsServiceClient.factory, "AWS_S3");

class ArtistPage extends Component {
  handleFileUpload(file) {
    if (!file) {
      return;
    }
    // converting bson with line 21
    convertAudioToBSONBinaryObject(file).then((result) => {
      //now we need an instance of AWS service client 
      //(auth.id)
      const key = `${stitchClient.auth.user.id}-${file.name}`;
      const bucket = "bandwagon";
      const url =
        "http://" + bucket + ".s3.amazonaws.com/" + encodeURIComponent(key);

      const args = {
        ACL: "public-read",
        Bucket: bucket,
        ContentType: file.type,
        Key: key,
        Body: result,
      };
      // building the request
      const request = new AwsRequest.Builder()
        .withService("s3")
        .withAction("PutObject")
        .withRegion("us-east-1")
        .withArgs(args);

      aws.execute(request.build).then((result) => {
        console.log(result);
        console.log(url);
      });
    });
  }
  render() {
    return (
      <div>
        <FileInput handleFileUpload={this.handleFileUpload} />
      </div>
    );
  }
}

export default ArtistPage;
