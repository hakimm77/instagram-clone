import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";

const uploadNewPost = async (
  image: File,
  setSelectedImage: React.Dispatch<
    React.SetStateAction<File | null | undefined>
  >
) => {
  const caption = await prompt("Write a caption for the new post:");
  const user = await localStorage.getItem("USER");
  const imageRef = ref(storage, image.name);

  await uploadBytes(imageRef, image).then((snapshot) => {
    console.log("Image succefully uploaded!");
  });

  getDownloadURL(imageRef).then(async (url) => {
    console.log(url);

    await addDoc(collection(db, "posts"), {
      url: url,
      caption: caption,
      user: user,
      likes: 0,
      usersLiked: [],
      comments: [],
    });

    setSelectedImage(null);
    alert("Succefully posted a new post !");
  });
};

export default uploadNewPost;
