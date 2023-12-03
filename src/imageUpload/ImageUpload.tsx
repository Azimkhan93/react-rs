import React from 'react';

const ImageUpload = () => {
  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files !== null ? event.target.files[0] : null;
    const base64 = await convertBase64(file);
    console.log(base64);
  };

  const convertBase64 = (file: Blob | null) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file as Blob);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <input
        id="originalFileName"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        required
        name="image"
        onChange={(e) => handleFileRead(e)}
      />
    </div>
  );
};

export default ImageUpload;
