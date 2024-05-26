import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
import { styled,useTheme } from "@mui/material/styles";

export const getCroppedImg = async (imageSrc, pixelCrop) => {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // to avoid CORS issues when downloading image from web
      image.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return reject(new Error('Canvas is empty'));
      }
      blob.name = 'cropped.jpeg';
      resolve(window.URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};


const ImageCroper = (props) => {
  const theme = useTheme();
  const { ImageToCrop, onImageCropped ,onUpload,closeDialogBtn} = props;
  const handleClose = () => {};
  const [croppedImages, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onUploadClick = async () => {
      const croppedImage = await getCroppedImg(ImageToCrop, croppedAreaPixels);
      setCroppedImage(croppedImage)
      onUpload(croppedImage)
  };

  const closeDialog1 =()=>{
    closeDialogBtn(false)
    setCroppedImage(null)
    onUpload(null)
  }
  return (
    <>
      <Dialog
        open={true}
        sx={{}}
        onClose={handleClose}
      >
         <DialogContent  sx={{width:500,height:600}}>
        <Box sx={{}} >
        <Cropper
              image={ImageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={5 / 2}
              height={285}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
        </Box>
        </DialogContent>
         <DialogActions sx={{background:theme.palette.primary.main,zIndex:12312}}>
          <Stack direction="row" spacing={2}
          sx={{justifyContent:'center',alignItems:'center'}}
          >
          <Button
          sx={{ my:2,   background: 'aliceblue'}}
          variant="outlined" onClick={onUploadClick} autoFocus>
            Crop
          </Button>
          <Button
          sx={{ my:2,   background: 'aliceblue'}}
          variant="outlined" onClick={closeDialog1} autoFocus>
            Close
          </Button>
          </Stack>
          
        </DialogActions> 
      </Dialog>
    </>
  );
};

ImageCroper.defaultProps = {
  onImageCropped: () => {},
};

export default ImageCroper;
