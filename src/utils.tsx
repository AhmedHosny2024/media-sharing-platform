import { VariantType, useSnackbar } from 'notistack';
import { SnackbarProvider } from "notistack";

const { enqueueSnackbar } = useSnackbar();
    
    const Alert = (variant: VariantType) => () => {
        console.log("error")        
        enqueueSnackbar("Please upload an image file", { variant });
    };