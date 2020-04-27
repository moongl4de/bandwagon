import React, { Component } from "react";
import axios from 'axios'
import FileInput from "../components/FileInput";
import { handleSignup, handleLogin } from "../utils/stitch";

// import {
//   AwsServiceClient,
//   AwsRequest,
// } from "mongodb-stitch-browser-services-aws";
// import {
//   Stitch,
//   AnonymousCredential,
//   UserPasswordAuthProviderClient,
//   UserPasswordCredential,
// } from "mongodb-stitch-browser-sdk";
// import { RemoteMongoClient } from "mongodb-stitch-browser-services-mongodb-remote";

// this view is created to test file uploads

// const stitchClient = Stitch.initializeDefaultAppClient("bandwagon-qlcuw");

// const emailPasswordClient = stitchClient.auth.getProviderClient(
//   UserPasswordAuthProviderClient.factory,
//   "userpass"
// );

// const mongodb = stitchClient.getServiceClient(
//   RemoteMongoClient.factory,
//   "mongodb-atlas"
// );

// Stitch.defaultAppClient.auth
//   .loginWithCredential(new AnonymousCredential())
//   .then((user) => {
//     console.log(`Logged in as anonymous user with id: ${user.id}`);
//   })
//   .catch(console.error);

// const convertAudioToBSONBinaryObject = (file) => {
//   return new Promise((resolve) => {
//     let fileReader = new FileReader();
//     fileReader.onload = (event) => {
//       resolve({
//         $binary: {
//           base64: event.target.result.split(",")[1],
//           subType: "00",
//         },
//       });
//     };
//     fileReader.readAsDataURL(file);
//   });
// };

// const aws = stitchClient.getServiceClient(AwsServiceClient.factory, "AWS_S3");


import { signin } from "../../../server/controllers/auth";

class ArtistPage extends Component {
  componentDidMount() {

    signin.then(user => {

      //  handleSignup('test123456789@test.com', '123456')
      handleLogin(user.email, user.password)
      .then(user => console.log(user))
      .catch(err => console.warn(err));
    })
  }

  handleFileUpload(file) {
    if (!file) {
      return;
    }

    // converting bson
    //   convertAudioToBSONBinaryObject(file).then((result) => {
    //     const audiofile = mongodb.db("data").collection("audiofile");
    //     //now we need an instance of AWS service client
    //     const key = `Test-${file.name}`;
    //     // const key = `${stitchClient.auth.user.id}-${file.name}`;
    //     const bucket = "bandwagon";
    //     const url =
    //       "http://" + bucket + ".s3.amazonaws.com/" + encodeURIComponent(key);

    //     const args = {
    //       ACL: "public-read",
    //       Bucket: bucket,
    //       ContentType: file.type,
    //       Key: key,
    //       Body: result,
    //     };
    //     // building the request
    //     const request = new AwsRequest.Builder()
    //       .withService("s3")
    //       .withAction("PutObject")
    //       .withRegion("us-east-1")
    //       .withArgs(args);

    //     aws
    //       .execute(request.build)
    //       .then((result) => {
    //         console.log(result);
    //         console.log(url);
    //         return audiofile.insertOne({
    //           owner_id: stitchClient.auth.user.id,
    //           url,
    //           file: {
    //             name: file.name,
    //             type: file.type,
    //           },
    //           Etag: result.Etag,
    //           ts: new Date(),
    //         });
    //       })
    //       .then((result) => {
    //         console.log("last result", result);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   });
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
