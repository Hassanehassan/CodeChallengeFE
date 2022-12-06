import * as React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ArticleItem = (props) => {
  return (
    <Grid item xs={12}>
      <Card sx={{ ":hover": { boxShadow: "0 4px 20px #990000" } }}>
        <CardContent>
          <Typography
            component="div"
            variant="h4"
            color="maroon"
            sx={{ fontFamily: "Impact" }}
          >
            TI{bull}T{bull}LE
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Franklin Gothic Medium" }}
            color="text.secondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          <Typography
            component="div"
            color="maroon"
            sx={{ fontFamily: "Impact" }}
          >
            des{bull}cri{bull}p{bull}tion
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 14 }}>
            <ReactReadMoreReadLess
              charLimit={300}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
              readMoreClassName="read-more-less--more"
              readLessClassName="read-more-less--less"
            >
              {props.description}
            </ReactReadMoreReadLess>
          </Typography>
        </CardContent>
        <CardActions>
          <Button>
            <a href={props.url}>GO TO URL</a>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArticleItem;
