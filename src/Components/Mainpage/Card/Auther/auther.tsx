import { PostDate,UserIcon, UserInfo, UserName ,Container} from "./style";

export default function Auther() {
    return (
        <Container>
            <UserInfo>
                <UserIcon alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <UserName>John Doe</UserName>
            </UserInfo>
            <PostDate>Posted on 12/12/2021</PostDate>
        </Container>
    )
}