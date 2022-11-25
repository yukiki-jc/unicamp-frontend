import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { PageContext } from "../App";
import { apiPath, backend } from "../utils/urls";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getRequest, postRequest } from "../utils/requests";
import { joinPaths } from "@remix-run/router";
import { styled } from "@mui/material/styles";
import Iframe from "react-iframe";
import { Box } from "@mui/system";
import { getUser } from "../utils/storeUser";
import {
  Card,
  CardHeader,
  Collapse,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Breadcrumbs,
  Button,
  Grid,
  LinearProgress,
  Link,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { LatoFont, LevelMappings } from "../utils/commonData";
import {
  stylizeObject,
  reStylizeObject,
  sumArr,
  average,
  errorHandler,
} from "../utils/functions";
import RoundAvatar from "../components/RoundAvatar";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import { Masonry } from "@mui/lab";
import CourseMenu from "../components/CourseMenu";
import { courseList } from "../utils/testData";

const mobileItemWidth = 86;
const desktopItemWidth = 45;

const MainContainer = styled((props) => <Box component="main" {...props} />)(
  ({ theme }) => ({
    padding: theme.spacing(2, "6vw"),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, "4vw"),
    },
  })
);

const ItemContainer = styled(
  (props) => <Box component="section" {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "gutter",
  }
)(({ theme, gutter }) => ({
  textAlign: "left",
  paddingLeft: theme.spacing(0.5),
  [theme.breakpoints.up("md")]: {
    padding: gutter && theme.spacing(0, 0, 0, 3),
  },
}));

// 18 / 8 = 2.25, 18 is the width of most scrollbars
const MasonryContainer = styled((props) => (
  <Masonry
    columns={{ xs: 1, md: 2 }}
    spacing={2.25}
    component="section"
    {...props}
  />
))(({ theme }) => ({}));

const ItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  fontWeight: 700,
  padding: theme.spacing(2.5, 0, 0.5, 0),
}));

const ItemSubtitle = styled(Typography)(({ theme }) => ({
  color: "#6a6a6a",
  marginBottom: theme.spacing(1),
  fontSize: "1.3rem",
}));

const EmbedContainer = styled(ItemContainer)(({ theme }) => ({
  "& a": {
    opacity: 0,
  },
  "&:hover": {
    "& a": {
      opacity: 1,
    },
  },
}));

const EmbedContentCard = styled(Box)(({ theme }) => ({
  height: "52vw",
  border: "0.8px solid #ddd",
  backgroundColor: "#ddd",
  borderRadius: theme.shape.borderRadius * 3,
  overflow: "hidden",
  cursor: "default",
  [theme.breakpoints.up("md")]: {
    height: "32vw",
  },
  [theme.breakpoints.up("lg")]: {
    height: "26vw",
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const EmbedContent = styled((props) => (
  <Iframe allowFullScreen={false} scrolling="yes" {...props} />
))(({ theme }) => ({
  width: `${mobileItemWidth}vw`,
  height: "calc(52vw + 1.8rem)",
  border: "none",
  [theme.breakpoints.up("md")]: {
    width: `${desktopItemWidth}vw`,
    height: "calc(32vw + 1.8rem)",
  },
  [theme.breakpoints.up("lg")]: {
    height: "calc(26vw + 1.8rem)",
  },
}));

const LinkRouter = styled((props) => (
  <Link component={RouterLink} color="GrayText" underline="hover" {...props} />
))(({ theme }) => ({
  fontSize: "1.3rem",
}));

const CourseDetailTitle = styled((props) => (
  <Typography component="h1" {...props} />
))(({ theme }) => ({
  fontFamily: LatoFont,
  fontSize: "2.7rem",
  fontWeight: 900,
  lineHeight: 1.15,
  whiteSpace: "pre-line",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.6rem",
    marginTop: 0,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "4.8rem",
  },
}));

const CourseTagGrid = styled((props) => (
  <Grid container spacing={0.5} {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0, 3),
}));

const CourseTagGridItem = styled(
  (props) => <Grid item xs={12} sm={6} md={12} lg={6} {...props} />,
  { shouldForwardProp: (prop) => prop !== "label" }
)(({ theme, label }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  "&::before": {
    content: `'${label}: '`,
    color: "#777",
    fontWeight: 400,
  },
}));

const CourseDetailButtonStack = styled((props) => (
  <Stack spacing={2} {...props} />
))(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(3.5),
  },
}));

const CourseDetailButton = styled((props) => (
  <Button variant="contained" {...props} />
))(({ theme }) => ({
  borderRadius: "20rem",
  padding: theme.spacing(1.5, 2),
  width: "90%",
  maxWidth: "48rem",
  fontWeight: 600,
}));

const HeaderBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "8px",
}));

const Comment = styled(Card)(({ theme }) => ({
  marginBottom: 16,
  borderRadius: 12,
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const PointerContent = styled(CardContent)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: "16px !important",
}));

const CollapseField = styled(Typography)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: "0px !important",
}));

const CommentField = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(2, 0, 1, 0),
}));

const ReplyField = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 2, 2, 2),
}));

const ReplyInput = styled((props) => <TextField rows={8} {...props} />)(
  ({ theme }) => ({
    flexGrow: "1",
    "& .MuiInputBase-root": {
      borderRadius: "12px",
    },
  })
);

const InnerReplyInput = styled(TextField)(({ theme }) => ({
  flexGrow: "1",
  "& .MuiInputBase-root": {
    padding: theme.spacing(1.5),
  },
}));

const Caption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: "4px",
}));

const Tail = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

const ActionEnd = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.text.secondary,
}));

const CardHeading = styled(CardHeader)(({ theme }) => ({
  "& .MuiCardHeader-action": {
    alignSelf: "center",
    margin: theme.spacing(0),
  },
}));

const replyAt = (name, link = true) => {
  if (link) {
    return (
      <Caption>
        Reply <Link underline="none">{`@${name}`}</Link>:{" "}
      </Caption>
    );
  } else {
    return `Reply @${name}`;
  }
};

const replyHint = (count) => (
  <Typography
    variant="body2"
    align="right"
    sx={{ marginTop: 0.5 }}
    children={`(${count} Replies)`}
  />
);

const RatingStar = ({ sx, ...props }) => (
  <Rating
    sx={(theme) => ({
      ...sx,
      // '& .MuiRating-iconFilled': {
      //     color: theme.palette.secondary.main,
      // },
    })}
    {...props}
  />
);

const RatingBar = ({ rating, value, maxValue }) => {
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "1.3rem",
        fontWeight: 700,
        alignItems: "center",
      }}
    >
      <RatingStar max={1} value={1} sx={{ marginRight: 0.5 }} />
      {rating}
      <LinearProgress
        variant="determinate"
        value={(value / maxValue) * 100}
        sx={{
          height: "1.2rem",
          flexGrow: 1,
          marginX: 1.5,
          borderRadius: "1rem",
          "&.MuiLinearProgress-root": {
            backgroundColor: "#f1f1f1",
          },
        }}
      />
      {value}
    </Box>
  );
};

const RatingChart = ({
  myRating,
  rating,
  voters,
  distribution,
  changeRating,
}) => {
  const maxValue = Math.max(...distribution) + 1;

  return (
    <Box
      sx={{
        marginX: 2,
        display: "flex",
        alignItems: "center",
        fontFamily: LatoFont,
        flexWrap: "nowrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "3.6rem",
            fontWeight: 500,
          }}
        >
          {parseFloat(rating).toFixed(1)}
        </Typography>
        <Typography
          sx={{
            color: "#777",
            fontSize: "1.2rem",
            marginTop: 0.25,
            marginBottom: 1.5,
          }}
        >
          {voters} Ratings
        </Typography>
        <RatingStar
          precision={1}
          size="small"
          value={myRating}
          onChange={changeRating}
        />
      </Box>
      <Box
        sx={{
          marginLeft: 5,
          width: "100%",
          maxWidth: "32rem",
        }}
      >
        {[...distribution].reverse().map((val, idx) => (
          <RatingBar
            key={idx}
            rating={5 - idx}
            value={val}
            maxValue={maxValue}
          />
        ))}
      </Box>
    </Box>
  );
};

const CommentBox = (props) => {
  const { replyName, handleReplySend, reply, setReply } = props;

  return (
    <ReplyField>
      <RoundAvatar sx={{ mr: "8px" }} />
      <InnerReplyInput
        multiline
        variant="outlined"
        placeholder={replyAt(replyName, false)}
        value={reply}
        onChange={(event) => {
          setReply(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                children={<SendIcon />}
                onClick={handleReplySend}
              />
            </InputAdornment>
          ),
        }}
      />
    </ReplyField>
  );
};

const CommentCard = (props) => {
  const {
    commentData,
    refData = null,
    expanded,
    expandedId,
    setExpandedId,
    avatar,
    handleReplySend,
    reply,
    setReply,
    handleCommentDelete,
  } = props;
  const pageContextValue = useContext(PageContext);

  let isAdmin = getUser()?.admin;
  let deleteIcon = (
    <ActionEnd>
      <Typography
        sx={{ mr: 1 }}
        variant="body2"
        children="#114514"
      />
      {isAdmin && <IconButton
        color="primary"
        onClick={() => {
          handleCommentDelete(commentData.id);
        }}
      >
        {" "}
        <ClearIcon />{" "}
      </IconButton>}
    </ActionEnd>
  );

  return (
    <Comment variant="outlined">
      <CardHeading
        avatar={<RoundAvatar displayName={commentData.userName} src={avatar} />}
        title={commentData.userName}
        subheader={commentData.time}
        action={deleteIcon}
      />
      <PointerContent
        onClick={
          pageContextValue.state.login
            ? () => setExpandedId(commentData.id)
            : () => {}
        }
        sx={{
          cursor:
            pageContextValue.state.login && expandedId != commentData.id
              ? "pointer"
              : "text",
        }}
      >
        {refData ? replyAt(refData.userName) : null}
        <Typography sx={{ fontSize: "1.5rem" }}>{commentData.text}</Typography>
      </PointerContent>
      <Collapse in={expanded} unmountOnExit>
        <CollapseField>
          <CommentBox
            replyName={commentData.userName}
            handleReplySend={() => {
              handleReplySend(commentData.id);
            }}
            reply={reply}
            setReply={setReply}
          />
        </CollapseField>
      </Collapse>
    </Comment>
  );
};

async function getComments(courseId) {
  try {
    const getCommentURL = joinPaths([
      backend,
      apiPath.comment.get,
      courseId.toString(),
    ]);
    const allCommentsRaw = await getRequest(getCommentURL);
    const allComments = stylizeObject(allCommentsRaw);
    let allAvatarIds = [];
    allComments.forEach((obj) => {
      const userId = obj.userId;
      allAvatarIds.push(userId);
    });
    allAvatarIds = [...new Set(allAvatarIds)];
    const avatarResults = await Promise.all(
      allAvatarIds.map((userId) => {
        const avatarURL = joinPaths([
          backend,
          apiPath.avatar.get,
          userId.toString(),
        ]);
        return getRequest(avatarURL);
      })
    );
    let allAvatars = {};
    avatarResults.forEach((obj, idx) => {
      allAvatars[allAvatarIds[idx]] = obj.img;
    });
    return [allComments, allAvatars];
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default function CourseDetailPage({ subcategoryList }) {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const pageContextValue = useContext(PageContext);
  const [comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState({});
  const [myComment, setMyComment] = useState("");
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState(null);
  const [recRelatedCourses, setRecRelatedCourses] = useState(null);
  const {
    subcategoryId = 0,
    name,
    website,
    difficulty,
    estHour,
    provider,
    video,
    assignment,
    description,
  } = courseData || {};

  useLayoutEffect(() => {
    const courseDataURL = joinPaths([backend, apiPath.course.info, courseId]);
    const ratingDetailURL = joinPaths([backend, apiPath.grade.get, courseId]);
    const relatedCourseURL = joinPaths([
      backend,
      apiPath.course.relation,
      courseId,
    ]);
    const favoriteQueryURL = joinPaths([
      backend,
      apiPath.favorite.query,
      courseId,
    ]);
    const recommendRelatedURL = joinPaths([
      backend,
      apiPath.recommend.related,
      courseId,
    ]);
    pageContextValue.handler.setLoading(true);
    getComments(courseId)
      .then((json) => {
        const commentResult = json;
        showComments(commentResult);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });

    getRequest(relatedCourseURL)
      .then((json) => {
        const relatedCourses = stylizeObject(json);
        setRelatedCourses(relatedCourses);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });

    getRequest(recommendRelatedURL)
      .then((json) => {
        const recRelatedCourses = stylizeObject(json);
        setRecRelatedCourses(recRelatedCourses);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });

    Promise.all([getRequest(courseDataURL), getRequest(ratingDetailURL)])
      .then((datas) => {
        const courseData = stylizeObject(datas[0]);
        const ratings = stylizeObject(datas[1]);
        setRatingDistribution(ratings.ratingDetail);
        setMyRating(ratings.myRating);
        setCourseData(courseData);
        if (pageContextValue.state.login) {
          return getRequest(favoriteQueryURL);
        }
        return false;
      })
      .then((result) => {
        if (result !== false) {
          const favoriteQuery = stylizeObject(result);
          setFavorite(favoriteQuery.isFavorite);
        }
        pageContextValue.handler.setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });
  }, [pageContextValue.state.login]);

  // ----- comment -----
  const idToComment = {};
  comments.forEach((comment) => {
    idToComment[comment.id] = comment;
  });
  const [expandedId, setExpandedId] = useState(0);
  const [reply, setReply] = useState("");
  useEffect(() => {
    setReply("");
  }, [expandedId]);

  const showComments = (commentResult) => {
    if (commentResult === false) {
      throw "Get comments failed";
    } else {
      const notNullComments = commentResult[0].filter((comment) => {
        return comment.text.length !== 0;
      });
      setComments(notNullComments);
      setAvatars(commentResult[1]);
    }
  };

  const handleCommentSend = (refCommentId) => {
    const sendCommentURL = joinPaths([backend, apiPath.comment.add]);
    const commentToSend = refCommentId ? reply : myComment;
    if (commentToSend.length === 0) {
      pageContextValue.handler.setErrorBox("You haven't type anything");
      return;
    }
    const commentBody = {
      courseId: courseId,
      refCommentId: refCommentId,
      text: commentToSend,
    };
    pageContextValue.handler.setLoading(true);
    postRequest(reStylizeObject(commentBody), sendCommentURL)
      .then((json) => {
        if (json.state === true) {
          pageContextValue.handler.setSuccessBox(
            refCommentId ? "Replied Successfully" : "Commented Successfully"
          );
          return getComments(courseId);
        } else {
          pageContextValue.handler.setSuccessBox(json.message);
          return false;
        }
      })
      .then((result) => {
        showComments(result);
        if (result !== false) {
          setExpandedId(0);
          setMyComment("");
        }
        pageContextValue.handler.setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });
  };

  const handleCommentDelete = (commentId) => {
    const deleteCommentURL = joinPaths([backend, apiPath.comment.delete]);
    const deleteBody = {
      id: commentId,
    };
    pageContextValue.handler.setLoading(true);
    postRequest(deleteBody, deleteCommentURL)
      .then((json) => {
        if (json.state === true) {
          pageContextValue.handler.setSuccessBox("Deleted Successfully");
          return getComments(courseId);
        } else {
          pageContextValue.handler.setSuccessBox(json.message);
          return false;
        }
      })
      .then((result) => {
        showComments(result);
        if (result !== false) {
          setExpandedId(0);
        }
        pageContextValue.handler.setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        pageContextValue.handler.setErrorBox("Connect Error");
        pageContextValue.handler.setLoading(false);
      });
  };
  const CommentCards = comments.map((comment) => {
    const refData = idToComment[comment.refCommentId];
    return (
      <CommentCard
        key={comment.id}
        commentData={comment}
        refData={refData}
        avatar={avatars[comment.userId]}
        expanded={expandedId === comment.id}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        reply={reply}
        setReply={setReply}
        handleReplySend={handleCommentSend}
        handleCommentDelete={handleCommentDelete}
      />
    );
  });

  const changeRating = (event) => {
    let targetValue = Number(event.target.value);
    if (myRating == targetValue) {
      return;
    }
    if (pageContextValue.state.login === false) {
      pageContextValue.handler.setErrorBox("Login to Rate");
      return;
    }
    const ratingURL = joinPaths([backend, apiPath.grade.set]);
    const ratingBody = {
      courseId: courseId,
      rating: targetValue,
    };
    postRequest(reStylizeObject(ratingBody), ratingURL)
      .then((result) => {
        if (result.state === true) {
          setRatingDistribution((distribution) => {
            distribution[targetValue - 1] += 1;
            distribution[myRating - 1] -= 1;
            return distribution;
          });
          setMyRating(targetValue);
          pageContextValue.handler.setSuccessBox("Rated Successfully");
        } else {
          pageContextValue.handler.setErrorBox(result.message);
        }
      })
      .catch((e) => {
        errorHandler(e, pageContextValue);
      });
  };

  const favoriteClick = () => {
    setFavoriteLoading(true);
    const setFavoriteURL = joinPaths([backend, apiPath.favorite.set]);
    const dataBody = {
      courseId: courseId,
      isFavorite: !favorite,
    };
    postRequest(reStylizeObject(dataBody), setFavoriteURL)
      .then((result) => {
        if (result.state === true) {
          pageContextValue.handler.setSuccessBox(
            favorite
              ? "Removed from Favorites Successfully"
              : "Added to Favorites Successfully"
          );
          setFavorite((favorite) => !favorite);
        } else {
          pageContextValue.handler.setErrorBox(result.message);
        }
        setFavoriteLoading(false);
      })
      .catch((e) => {
        errorHandler(e, pageContextValue);
        setFavoriteLoading(false);
      });
  };

  return (
    <MainContainer>
      <HeaderBar>
        <Breadcrumbs sx={{ marginBottom: 3 }}>
          <LinkRouter to="/">Home</LinkRouter>
          <LinkRouter
            to={joinPaths([apiPath.category.info, subcategoryId.toString()])}
          >
            {subcategoryId && subcategoryList.length > 0 ? (
              subcategoryList[subcategoryId - 1].subcategoryName
            ) : (
              <Skeleton variant="text" width="5rem" />
            )}
          </LinkRouter>
          <LinkRouter color="primary">
            {name || <Skeleton variant="text" width="5rem" />}
          </LinkRouter>
        </Breadcrumbs>
        <LoadingButton
          disabled={!pageContextValue.state.login}
          sx={{
            borderRadius: "12rem",
            paddingX: 1.5,
            textTransform: "capitalize",
          }}
          color={favorite ? "loading" : "primary"}
          disableElevation={favorite}
          loadingPosition="start"
          size="small"
          startIcon={favorite ? <DoneIcon /> : <StarIcon />}
          loading={favoriteLoading}
          onClick={favoriteClick}
        >
          {favorite ? "Collected" : "Collect"}
        </LoadingButton>
      </HeaderBar>
      <MasonryContainer>
        <EmbedContainer sx={{ padding: 0 }}>
          <EmbedContentCard>
            <EmbedContent url={website || "about:blank"} />
          </EmbedContentCard>
          <Link
            href={website}
            sx={{
              transition: "all 0.2s",
              marginLeft: 2,
              fontSize: "1.2rem",
              marginTop: 0.5,
            }}
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit course website in a new tab -{">"}
          </Link>
        </EmbedContainer>

        <ItemContainer gutter>
          <Box sx={{ paddingLeft: { xs: 1, md: 0 } }}>
            <CourseDetailTitle>
              {name || <Skeleton variant="text" />}
            </CourseDetailTitle>
            <CourseTagGrid>
              <CourseTagGridItem label="Provider" sm={7} lg={7}>
                {provider}
              </CourseTagGridItem>
              <CourseTagGridItem label="Level" sm={5} lg={5}>
                {LevelMappings[difficulty]}
              </CourseTagGridItem>
              <CourseTagGridItem label="Category" sm={7} lg={7}>
                {subcategoryId &&
                  subcategoryList.length &&
                  subcategoryList[subcategoryId - 1].subcategoryName}
              </CourseTagGridItem>
              <CourseTagGridItem label="Time Cost" sm={5} lg={5}>
                {estHour} hrs.
              </CourseTagGridItem>
            </CourseTagGrid>
            <CourseDetailButtonStack>
              <CourseDetailButton href={video}>
                Watch Lectures
              </CourseDetailButton>
              <CourseDetailButton
                color="inherit"
                href={assignment}
                sx={{ filter: "invert(1)", color: "#000" }}
              >
                Assignment
              </CourseDetailButton>
            </CourseDetailButtonStack>
            <Divider
              variant="middle"
              sx={{ display: { xs: "block", md: "none" } }}
            />
          </Box>

          <ItemTitle>Description</ItemTitle>
          <ItemSubtitle sx={{ fontSize: "1.5rem" }}>{description}</ItemSubtitle>

          {relatedCourses && relatedCourses.pre.length > 0 && (
            <Fragment>
              <ItemTitle>Prerequisites</ItemTitle>
              <ItemSubtitle sx={{ marginBottom: 2 }}>
                Feeling hard to follow? Try these first
              </ItemSubtitle>

              <CourseMenu
                courseList={relatedCourses ? relatedCourses.pre : []}
                subcategoryList={subcategoryList}
              />
            </Fragment>
          )}

          {relatedCourses && relatedCourses.post.length > 0 && (
            <Fragment>
              <ItemTitle>Advance Courses</ItemTitle>
              <ItemSubtitle sx={{ marginBottom: 2 }}>
                Good job! Dive deeper
              </ItemSubtitle>

              <CourseMenu
                courseList={relatedCourses ? relatedCourses.post : []}
                subcategoryList={subcategoryList}
              />
            </Fragment>
          )}

          {recRelatedCourses && recRelatedCourses.length > 0 && (
            <Fragment>
              <ItemTitle>Related Courses</ItemTitle>
              <ItemSubtitle sx={{ marginBottom: 2 }}>
                Don't like this course? Try these similar ones!
              </ItemSubtitle>

              <CourseMenu
                courseList={recRelatedCourses ? recRelatedCourses : []}
                subcategoryList={subcategoryList}
              />
            </Fragment>
          )}
          <Divider variant="middle" sx={{ marginTop: 4 }} />
        </ItemContainer>

        <ItemContainer>
          <ItemTitle sx={{ paddingTop: { xs: 1, md: 0 } }}>Ratings</ItemTitle>
          <ItemSubtitle>How do others love this course</ItemSubtitle>
          <RatingChart
            myRating={myRating}
            rating={average(ratingDistribution)}
            voters={sumArr(ratingDistribution)}
            distribution={ratingDistribution}
            changeRating={changeRating}
          />
        </ItemContainer>

        <ItemContainer>
          <ItemTitle>Comments</ItemTitle>
          <ItemSubtitle>
            {CommentCards.length > 0
              ? "Come share your thoughts"
              : "No comments yet"}
          </ItemSubtitle>
          {CommentCards}
          <CommentField>
            <RoundAvatar sx={{ mr: "8px", mt: "12px" }} />
            <ReplyInput
              disabled={!pageContextValue.state.login}
              multiline
              variant="outlined"
              placeholder={
                pageContextValue.state.login
                  ? "Leave Some Comments Here"
                  : "Pleasr Login First"
              }
              value={myComment}
              onChange={(event) => {
                setMyComment(event.target.value);
              }}
            />
          </CommentField>
          <Tail>
            <Button
              disabled={!pageContextValue.state.login}
              children={"SEND"}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ borderRadius: "12rem", marginTop: 1 }}
              onClick={() => {
                handleCommentSend(0);
              }}
            />
          </Tail>
        </ItemContainer>
      </MasonryContainer>
    </MainContainer>
  );
}
