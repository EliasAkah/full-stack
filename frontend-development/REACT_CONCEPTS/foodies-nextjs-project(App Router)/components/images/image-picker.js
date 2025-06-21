"use client";

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imagePicker = useRef();

  function handleClick() {
    imagePicker.current.click();
  }

  function handlePickedImage(event) {
    const file = event.target.files[0]; //accesses the first image picked via image input element.

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // convert image file to base64 string
      setPickedImage(fileReader.result); //passes the image processed into URL(base64) contained by "fileReader.result" as a result to pickedImage state
    };
    fileReader.readAsDataURL(file); // reads the content of a file or blob
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="Image Selected from file picker interface"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png,  image/jpeg"
          ref={imagePicker}
          onChange={handlePickedImage}
          autoComplete="on"
          required
        />

        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
