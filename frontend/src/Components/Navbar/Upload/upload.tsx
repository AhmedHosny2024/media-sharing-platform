import { ButtonProps } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Text, Upload, VisuallyHiddenInput } from "./style";
import { VariantType, useSnackbar } from 'notistack';
import axios from '../../../Server/formInstance';
import { useSelector } from "react-redux";
import { MainState } from "../../../State";

interface UploadProps extends ButtonProps {
    children: React.ReactNode;
  }
  
  const UploadBtn: React.FC<UploadProps> = ({ children, ...props }) => (
    <Upload {...props}>
      {children}
    </Upload>
  );

export function UploadButton() {
    const token = useSelector((state:MainState) => state.token);
    const Id = useSelector((state:MainState) => state.id);
    const userName = useSelector((state:MainState) => state.username);

    const { enqueueSnackbar } = useSnackbar();
    
    const Alert = (msg:string,variant: VariantType) => () => {
        enqueueSnackbar(msg, { variant,autoHideDuration: 2000 });
    };

    const GetImage=(e:any)=>{
        let done=true;
        const data = new FormData();
        console.log(e.target.files)
        // data.append("data",e.target.files[0]);
        for (let i = 0; i < e.target?.files?.length; i++) {
            if(e.target.files[i].type==="image/png"||e.target.files[i].type==="image/jpeg"||e.target.files[i].type==="video/mp4" ){
                // append each file to the form data
                data.append("data", e.target.files[i]);
                done=true;
            }
            else {
                Alert(`${e.target.files[i].name} not image or video`,"error")();
                return;
            }
        }
        if(done){
            // set header autharization
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
            const year = date.getFullYear();
            const createdAt = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
            // TODO: Add the API call to upload the image
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.params = {userId:Id,createdAt:createdAt,userName:userName};
            axios.post(`/post/upload/`,
              data
            ).then((res) => {
                console.log(res);
                if(res.status===200||res.status===201){
                  Alert(`Data uploaded successfully`,"success")()
                  window.location.reload();
                }

            }).catch((err) => {
              console.log(err);
                if(err.response.data.message instanceof Array){
                    err.response.data.message.forEach((msg:string) => {
                        Alert(msg,"error")();
                    });
                }
                else
                    Alert(err.response.data.message,"error")();
            });
        }
    }
  return (

    <UploadBtn variant="contained" component="label"
        role={undefined}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        >
          <Text>
            Upload
          </Text>
        <VisuallyHiddenInput type="file" hidden accept="video/mp4,image/png,image/jpeg" onChange={GetImage} multiple/>
    </UploadBtn>
  );
}
