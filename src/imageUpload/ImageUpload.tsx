import React from 'react';

export const handleFileRead = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files !== null ? event.target.files[0] : null;
  const base64 = await convertBase64(file);
  console.log(base64);
};

export const convertBase64 = (file: Blob | null) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file as Blob);
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      resolve(base64String);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
