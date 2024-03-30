import { ButtonProps } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Upload, VisuallyHiddenInput } from "./style";
import { VariantType, useSnackbar } from 'notistack';

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
        for (let i = 0; i < e.target?.files?.length; i++) {
            if(e.target.files[i].type.includes("image") || e.target.files[i].type.includes("video")){
                // create a new FileReader
                const reader = new FileReader();
                // read the image file as a data URL
                reader.readAsDataURL(e.target.files[0]);
                // set the image to the result of the reader
                reader.onload = function () {
                    console.log(reader.result);
                }
                done=true;
            }
            else {
                Alert(`${e.target.files[i].name} not image or vedio`,"error")();
                return;
            }
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
