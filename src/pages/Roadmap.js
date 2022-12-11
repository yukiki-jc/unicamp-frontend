import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContainer = styled((props) => <Box component="main" {...props} />)(
    ({ theme }) => ({
        height: "calc(100vh - 14.8rem)",
        overflow: "hidden",
    })
);

export default function Roadmap(props) {
    return (
        <MainContainer>
            <iframe
                src="https://roadmap.sh/computer-science"
                title="cs-roadmap"
                frameBorder={0}
                allowFullScreen={true}
                width="100%"
                height="100%"
            />
        </MainContainer>
    );
};