import React from "react";
import { Grid } from "@mui/material";

import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
  return (
    <div>
      <Grid container spacing={4}>
        {props.articles &&
          props.articles.map((article, index) => (
            <ArticleItem
              key={index}
              title={article.abstract}
              description={article.lead_paragraph}
              url={article.web_url}
            />
          ))}
      </Grid>
    </div>
  );
};
export default ArticleList;
