import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  styled,
  alpha,
  Button,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate,Navigate } from "react-router-dom";

import styles from "./Dashboard.styles.js";
import "./Dashboard.css";
import { loginaction } from "../../store/LoginSlice";
import { getAllArticles2,articleaction } from "../../store/ArticleSlice";
import ArticleList from "../../components/articles/ArticleList";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(7),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagenumber, setpagenumber] = useState(0);
  const {
    articles,
    filteredArticles,
    searchInput,
    isLoading,
    errors,
    first,
    lastRes,
  } = useSelector((state) => state.article);
  const articleshow = searchInput ? filteredArticles : articles;
  const messageShow = !searchInput
    ? "articles not found!"
    : "failed to search...";
  useEffect(() => {
    dispatch(getAllArticles2(pagenumber));
  }, [dispatch, pagenumber]);

  const scrollToEnd = () => {
    setpagenumber(pagenumber + 1);
    dispatch(getAllArticles2(pagenumber));
  };
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight &&
      !searchInput &&
      lastRes.length !== 0
    ) {
      scrollToEnd();
    }
  };

  const onChangeHandle = (event) => {
    dispatch(articleaction.searchArticles(event.target.value));
  };

  const logouthandler = async () => {
    localStorage.removeItem("token");
    dispatch(loginaction.logout());
    navigate("/",{replace:true});
  };

  const t = localStorage.getItem("token");
  if (!t) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header>
        <AppBar position="sticky">
          <Toolbar sx={styles.toolbar}>
            <Typography variant="h3" sx={{ fontFamily: "Gabriola" }}>
              Articles
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={onChangeHandle}
              />
            </Search>
            <Box>
              <Button
                sx={styles.btnLogout}
                variant="contained"
                onClick={logouthandler}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <ArticleList articles={articleshow} />
        {isLoading && <CircularProgress />}{" "}
        {errors && (
          <div className="error">
            <Typography
              variant="h5"
              color="brown"
              sx={{ fontFamily: "Gabriola" }}
            >
              {errors}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginTop: 1, borderRadius: 2, fontSize: 14 }}
              onClick={() => dispatch(getAllArticles2(pagenumber))}
            >
              try Again
            </Button>
          </div>
        )}
        {articleshow.length === 0 && !first && (
          <div className="empty">
            <Typography
              variant="h5"
              color="brown"
              sx={{ fontFamily: "Gabriola" }}
            >
              {messageShow}
            </Typography>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
