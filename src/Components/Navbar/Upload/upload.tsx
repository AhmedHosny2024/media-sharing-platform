import { ButtonProps } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Upload, VisuallyHiddenInput } from "./style";
import { VariantType, useSnackbar } from 'notistack';
import { PostType } from "../../types";
import axios from '../../../Server/Instance';

interface UploadProps extends ButtonProps {
    children: React.ReactNode;
  }
  
  const UploadBtn: React.FC<UploadProps> = ({ children, ...props }) => (
    <Upload {...props}>
      {children}
    </Upload>
  );

export function UploadButton() {

    const { enqueueSnackbar } = useSnackbar();
    
    const Alert = (msg:string,variant: VariantType) => () => {
        enqueueSnackbar(msg, { variant,autoHideDuration: 2000 });
    };

    const GetImage=(e:any)=>{
        let done=false;
        console.log(e.target.files)
        let res:PostType[]=[];
        for (let i = 0; i < e.target?.files?.length; i++) {
            if(e.target.files[i].type.includes("image") || e.target.files[i].type.includes("video")){
                // create a new FileReader
                const reader = new FileReader();
                // read the image file as a data URL
                reader.readAsDataURL(e.target.files[0]);
                // set the image to the result of the reader
                reader.onload = function () {
                  // append all images and videos to the array
                  res.push({type:e.target.files[i].type.includes("image") ? "image" : "video",src:reader.result as string});
                }
                done=true;
            }
            else {
                Alert(`${e.target.files[i].name} not image or vedio`,"error")();
                return;
            }
            // TODO: Add the API call to upload the image
            // axios.post("/upload",{
            //     data: e.target.files[i]
            // }).then((res) => {
            //     console.log(res);
            // }).catch((err) => {
            //     console.log(err);
            // });
        }
        if(done)
            Alert(`Data uploaded successfully`,"success")();
    }
  return (

    <UploadBtn variant="contained" component="label"
        role={undefined}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        >
        Upload
        <VisuallyHiddenInput type="file" hidden accept="image/*,video/*" onChange={GetImage} multiple/>
    </UploadBtn>
  );
}
