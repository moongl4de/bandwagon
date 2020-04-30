import React from "react";
// import axios from "axios";
import FileInput from "../components/FileInput";
import { handleSignup, handleLogin } from "../utils/stitch";
import { useStoreContext } from "../utils/globalContext";
import {
  AwsServiceClient,
  AwsRequest,
} from "mongodb-stitch-browser-services-aws";
import { RemoteMongoClient } from "mongodb-stitch-browser-services-mongodb-remote";
import { stitchClient } from "../utils/stitch";

const mongodb = stitchClient.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);

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

function ArtistPage() {
  const [global, dispatch] = useStoreContext();
  let userEmail = global.user.email;
  let userPass = global.user.password;
  console.log(global);

  // const [state, setState] = React.useState({
  //   email: "dariagnaumova@gmail.com",
  //   password: "123456",
  // })

  const createAccount = () => {
    handleSignup(userEmail, userPass);
  };

  const loginAccount = () => {
    handleLogin(userEmail, userPass)
      .then((user) => console.log(user))
      .catch((err) => console.warn(err));
  };

  const handleFileUpload = (file) => {
    if (!file) {
      return;
    }

    // converting bson
    convertAudioToBSONBinaryObject(file).then((result) => {
      const audiofile = mongodb.db("data").collection("audiofile");
      //now we need an instance of AWS service client
      const key = `${stitchClient.auth.user.id}-${file.name}`;
      // const key = `${stitchClient.auth.user.id}-${file.name}`;
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
        ContentType: file.type,
        Key: key,
        Body: result,
      };
      // building the request
      const request = new AwsRequest.Builder()
        .withService("s3")
        .withAction("PutObject")
        .withRegion("us-east-2")
        .withArgs(args);

      aws
        .execute(request.build())
        .then((result) => {
          console.log("result", result);
          console.log(url);
          return audiofile.insertOne({
            owner_id: stitchClient.auth.user.id,
            url,
            file: {
              name: file.name,
              type: file.type,
            },
            Etag: result.Etag,
            ts: new Date(),
          });
        })
        .then((result) => {
          console.log("last result", result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div>
      <button onClick={createAccount}> Create Account </button>
      <button onClick={loginAccount}> Login Account </button>
      <FileInput handleFileUpload={handleFileUpload} />
    </div>
  );
}

export default ArtistPage;
