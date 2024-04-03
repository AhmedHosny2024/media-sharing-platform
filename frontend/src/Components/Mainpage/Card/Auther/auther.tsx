import { PostHeader } from "../../../types";
import { PostDate,UserIcon, UserInfo, UserName ,Container} from "./style";

export default function Auther(props:PostHeader) {
    return (
        <Container>
            <UserInfo>
                <UserIcon alt={props.userName} />
                <UserName>{props.userName}</UserName>
            </UserInfo>
            <PostDate>Posted on {props.createdAt.split("T")[0]}</PostDate>
        </Container>
    )
}