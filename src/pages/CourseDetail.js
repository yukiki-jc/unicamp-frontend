import React, { useContext, useLayoutEffect, useEffect, useState } from 'react'
import { PageContext } from '../App'
import { apiPath, backend } from '../utils/urls'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { getRequest, postRequest } from '../utils/requests'
import { joinPaths } from '@remix-run/router'
import { styled } from '@mui/material/styles'
import Iframe from 'react-iframe'
import { Box } from '@mui/system'
import { getUser } from '../utils/storeUser'
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  CardContent,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import {
  Breadcrumbs,
  Button,
  Grid,
  LinearProgress,
  Link,
  Rating,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { LatoFont, LevelMappings } from '../utils/commonData'
import { stylizeObject, reStylizeObject } from '../utils/functions'
import RoundAvatar from '../components/RoundAvatar'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import { TextFields } from '@mui/icons-material'

const MainContainer = styled(props => <Box component='main' {...props} />)(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2, '4vw'),
    [theme.breakpoints.up('md')]: {
      alignItems: 'start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  })
)

const EmbedContainer = styled(Box)(({ theme }) => ({
  width: '90vw',
  height: '52vw',
  border: '0.8px solid #ddd',
  backgroundColor: '#ddd',
  borderRadius: theme.shape.borderRadius * 3,
  overflow: 'hidden',
  marginBottom: theme.spacing(3.5),
  cursor: 'default',
  [theme.breakpoints.up('md')]: {
    width: '43vw',
    height: '32vw'
  },
  [theme.breakpoints.up('lg')]: {
    height: '26vw'
  },
  '&:hover': {
    borderColor: theme.palette.primary.main
  }
}))

const EmbedContent = styled(props => (
  <Iframe allowFullScreen={false} scrolling='yes' {...props} />
))(({ theme }) => ({
  width: 'calc(90vw + 1.8rem)',
  height: 'calc(52vw + 1.8rem)',
  border: 'none',
  [theme.breakpoints.up('md')]: {
    width: 'calc(43vw + 1.9rem)',
    height: 'calc(32vw + 1.8rem)'
  },
  [theme.breakpoints.up('lg')]: {
    height: 'calc(26vw + 1.8rem)'
  }
}))

const IntroContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  width: '100%',
  textAlign: 'start',
  [theme.breakpoints.up('md')]: {
    width: '44vw'
  }
}))

const LinkRouter = styled(props => (
  <Link component={RouterLink} color='GrayText' underline='hover' {...props} />
))(({ theme }) => ({
  fontSize: '1.3rem'
}))

const CourseDetailTitle = styled(props => (
  <Typography component='h1' {...props} />
))(({ theme }) => ({
  fontFamily: LatoFont,
  fontSize: '2.7rem',
  fontWeight: 900,
  lineHeight: 1.15,
  whiteSpace: 'pre-line',
  [theme.breakpoints.up('sm')]: {
    fontSize: '3.2rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.6rem'
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '4.8rem'
  }
}))

const CourseTagGrid = styled(props => (
  <Grid container spacing={0.5} {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0, 3)
}))

const CourseTagGridItem = styled(
  props => <Grid item xs={12} sm={6} md={12} lg={6} {...props} />,
  { shouldForwardProp: prop => prop !== 'label' }
)(({ theme, label }) => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  '&::before': {
    content: `"${label}: "`,
    color: '#777',
    fontWeight: 400
  }
}))

const CourseDetailButtonStack = styled(props => (
  <Stack spacing={2} {...props} />
))(({ theme }) => ({
  marginBottom: theme.spacing(4)
}))

const CourseDetailButton = styled(props => (
  <Button variant='contained' {...props} />
))(({ theme }) => ({
  borderRadius: '20rem',
  padding: theme.spacing(1.5, 2),
  width: '90%',
  maxWidth: '48rem',
  fontWeight: 600
}))

const CourseDetailSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700
}))

const CommentsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  marginTop: 12,
  marginLeft: 1,
  width: '100%'
}))

const CommentsField = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0, 0, 0)
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 2, 0, 2)
  }
}))

const Comment = styled(Card)(({ theme }) => ({
  marginBottom: 16,
  borderRadius: 12,
  '&:hover': {
    borderColor: theme.palette.primary.main
  }
}))

const PointerContent = styled(CardContent)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: '16px !important',
  cursor: 'pointer'
}))

const CollapseField = styled(Typography)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: '0px !important'
}))

const CommentField = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 0, 1, 0)
}))

const ReplyField = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2, 2, 2)
}))

const ReplyInput = styled(props => <TextField rows={8} {...props} />)(
  ({ theme }) => ({
    flexGrow: '1',
    '& .MuiInputBase-root': {
      borderRadius: '12px'
    }
  })
)

const InnerReplyInput = styled(TextField)(({ theme }) => ({
  flexGrow: '1',
  '& .MuiInputBase-root': {
    padding: theme.spacing(1.5)
  }
}))

const Caption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: '4px'
}))

const Tail = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}))

const replyAt = (name, link = true) => {
  if (link) {
    return (
      <Caption>
        Reply <Link underline='none'>{`@${name}`}</Link>:{' '}
      </Caption>
    )
  } else {
    return `Reply @${name}`
  }
}

const replyHint = count => (
  <Typography
    variant='body2'
    align='right'
    sx={{ marginTop: 0.5 }}
    children={`(${count} Replies)`}
  />
)

const RatingStar = ({ sx, ...props }) => (
  <Rating
    readOnly
    precision={0.5}
    sx={theme => ({
      ...sx
      // "& .MuiRating-iconFilled": {
      //     color: theme.palette.secondary.main,
      // },
    })}
    {...props}
  />
)

const RatingBar = ({ rating, value, maxValue }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        fontSize: '1.3rem',
        fontWeight: 700,
        alignItems: 'center'
      }}
    >
      <RatingStar max={1} value={1} sx={{ marginRight: 0.5 }} />
      {rating}
      <LinearProgress
        variant='determinate'
        value={(value / maxValue) * 100}
        sx={{
          height: '1.2rem',
          flexGrow: 1,
          marginX: 1.5,
          borderRadius: '1rem',
          '&.MuiLinearProgress-root': {
            backgroundColor: '#f1f1f1'
          }
        }}
      />
      {value}
    </Box>
  )
}

const RatingChart = ({ sx, rating, voters, distribution }) => {
  const maxValue = Math.max(...distribution) + 1

  return (
    <Box sx={sx}>
      <CourseDetailSubtitle sx={{ marginTop: 3 }}>
        Ratings and Reviews
      </CourseDetailSubtitle>
      <Box
        sx={{
          marginTop: 2,
          marginX: 2,
          display: 'flex',
          alignItems: 'center',
          fontFamily: LatoFont,
          flexWrap: 'nowrap'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontSize: '3.6rem',
              fontWeight: 500
            }}
          >
            {rating}
          </Typography>
          <RatingStar precision={0.5} size='small' value={parseInt(rating)} />
          <Typography
            sx={{
              color: '#777',
              fontSize: '1.2rem',
              marginTop: 1
            }}
          >
            {voters} Ratings
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: 5,
            width: '100%',
            maxWidth: '32rem'
          }}
        >
          {distribution.reverse().map((val, idx) => (
            <RatingBar
              key={idx}
              rating={5 - idx}
              value={val}
              maxValue={maxValue}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const CommentBox = props => {
  const { replyName, handleReplySend, reply, setReply } = props

  return (
    <ReplyField>
      <RoundAvatar sx={{ mr: '8px' }}  />
      <InnerReplyInput
        multiline
        variant='outlined'
        placeholder={replyAt(replyName, false)}
        value={reply}
        onChange={event => {
          setReply(event.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                color='primary'
                children={<SendIcon />}
                onClick={handleReplySend}
              />
            </InputAdornment>
          )
        }}
      />
    </ReplyField>
  )
}

const CommentCard = props => {
  const {
    commentData,
    refData = null,
    expanded,
    setExpandedId,
    avatar,
    handleReplySend,
    reply,
    setReply,
    handleCommentDelete
  } = props
  let deleteIcon = null
  if (getUser()?.admin) {
      deleteIcon = (
        <IconButton
          color='primary'
          onClick={() => {
            handleCommentDelete(commentData.id)
          }}
        >
          {' '}
          <ClearIcon />{' '}
        </IconButton>
      )
  }

  return (
    <Comment variant='outlined'>
      <CardHeader
        avatar={<RoundAvatar displayName={commentData.userName} src={avatar} />}
        title={commentData.userName}
        subheader={commentData.time}
        action={deleteIcon}
      />
      <PointerContent onClick={() => setExpandedId(commentData.id)}>
        {refData ? replyAt(refData.userName) : null}
        <Typography>{commentData.text}</Typography>
        {/* {replyHint(114514)} */}
      </PointerContent>
      <Collapse in={expanded} unmountOnExit>
        <CollapseField>
          <CommentBox
            replyName={commentData.userName}
            handleReplySend={() => {
              handleReplySend(commentData.id)
            }}
            reply={reply}
            setReply={setReply}
          />
        </CollapseField>
      </Collapse>
    </Comment>
  )
}

async function getComments (courseId) {
  try {
    const getCommentURL = joinPaths([
      backend,
      apiPath.comment.get,
      courseId.toString()
    ])
    const allCommentsRaw = await getRequest(getCommentURL)
    const allComments = stylizeObject(allCommentsRaw)
    let allAvatarIds = []
    allComments.forEach(obj => {
      const userId = obj.userId
      allAvatarIds.push(userId)
    })
    const avatarResults = await Promise.all(
      allAvatarIds.map(userId => {
        const avatarURL = joinPaths([
          backend,
          apiPath.avatar.get,
          userId.toString()
        ])
        return getRequest(avatarURL)
      })
    )
    let allAvatars = {}
    avatarResults.forEach((obj, idx) => {
      allAvatars[allAvatarIds[idx]] = obj.img
    })
    return [allComments, allAvatars]
  } catch (e) {
    console.log(e)
    return false
  }
}

export default function CourseDetailPage ({ subcategoryList }) {
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const pageContextValue = useContext(PageContext)
  const [comments, setComments] = useState([])
  const [avatars, setAvatars] = useState({})
  const [myComment, setMyComment] = useState('')
  // TODO: remove this afterwards
  const {
    subcategoryId = 0,
    name,
    website,
    difficulty,
    estHour,
    provider,
    video,
    assignment,
    description
  } = courseData || {}

  useLayoutEffect(() => {
    const courseDataURL = joinPaths([backend, apiPath.course.info, courseId])
    pageContextValue.handler.setLoading(true)
    Promise.all([getRequest(courseDataURL), getComments(courseId)])
      .then(datas => {
        const courseData = datas[0]
        const commentResult = datas[1]

        setCourseData(stylizeObject(courseData))
        showComments(commentResult)
        pageContextValue.handler.setLoading(false)
      })
      .catch(e => {
        console.log(e)
        pageContextValue.handler.setErrorBox('Connect Error')
        pageContextValue.handler.setLoading(false)
      })
  }, [])

  // ----- comment -----
  const idToComment = {}
  comments.forEach(comment => {
    idToComment[comment.id] = comment
  })
  const [expandedId, setExpandedId] = useState(0)
  const [reply, setReply] = useState('')
  useEffect(() => {
    setReply('')
  }, [expandedId])

  const showComments = commentResult => {
    if (commentResult === false) {
      throw 'Get comments failed'
    } else {
      const notNullComments = commentResult[0].filter(comment => {
        return comment.text.length !== 0
      })
      setComments(notNullComments)
      setAvatars(commentResult[1])
    }
  }

  const handleCommentSend = refCommentId => {
    const sendCommentURL = joinPaths([backend, apiPath.comment.add])
    const commentToSend = refCommentId ? reply : myComment
    if (commentToSend.length === 0) {
      pageContextValue.handler.setErrorBox("You haven't type anything")
      return
    }
    const commentBody = {
      courseId: courseId,
      refCommentId: refCommentId,
      text: commentToSend
    }
    pageContextValue.handler.setLoading(true)
    postRequest(reStylizeObject(commentBody), sendCommentURL)
      .then(json => {
        if (json.state === true) {
          pageContextValue.handler.setSuccessBox(
            refCommentId ? 'Replied Successfully' : 'Commented Successfully'
          )
          return getComments(courseId)
        } else {
          pageContextValue.handler.setSuccessBox(json.message)
          return false
        }
      })
      .then(result => {
        showComments(result)
        if (result !== false) {
          setExpandedId(0)
          setMyComment('')
        }
        pageContextValue.handler.setLoading(false)
      })
      .catch(e => {
        console.log(e)
        pageContextValue.handler.setErrorBox('Connect Error')
        pageContextValue.handler.setLoading(false)
      })
  }

  const handleCommentDelete = commentId => {
    const deleteCommentURL = joinPaths([backend, apiPath.comment.delete])
    const deleteBody = {
      id: commentId
    }
    pageContextValue.handler.setLoading(true)
    postRequest(deleteBody, deleteCommentURL)
      .then(json => {
        if (json.state === true) {
          pageContextValue.handler.setSuccessBox('Deleted Successfully')
          return getComments(courseId)
        } else {
          pageContextValue.handler.setSuccessBox(json.message)
          return false
        }
      })
      .then(result => {
        showComments(result)
        if (result !== false) {
          setExpandedId(0)
        }
        pageContextValue.handler.setLoading(false)
      })
      .catch(e => {
        console.log(e)
        pageContextValue.handler.setErrorBox('Connect Error')
        pageContextValue.handler.setLoading(false)
      })
  }
  const CommentCards = comments.map(comment => {
    const refData = idToComment[comment.refCommentId]
    return (
      <CommentCard
        commentData={comment}
        refData={refData}
        avatar={avatars[comment.userId]}
        expanded={expandedId === comment.id}
        setExpandedId={setExpandedId}
        reply={reply}
        setReply={setReply}
        handleReplySend={handleCommentSend}
        handleCommentDelete={handleCommentDelete}
      />
    )
  })

  // ----- comment -----

  return (
    <MainContainer>
      <Breadcrumbs sx={{ width: '100%', flexShrink: 0, marginBottom: 3 }}>
        <LinkRouter to='/'>Home</LinkRouter>
        <LinkRouter
          to={joinPaths([apiPath.category.info, subcategoryId.toString()])}
        >
          {subcategoryId && subcategoryList.length > 0 ? (
            subcategoryList[subcategoryId - 1].subcategoryName
          ) : (
            <Skeleton variant='text' width='5rem' />
          )}
        </LinkRouter>
        <LinkRouter color='primary'>
          {name || <Skeleton variant='text' width='5rem' />}
        </LinkRouter>
      </Breadcrumbs>
      <Box>
        <EmbedContainer>
          <EmbedContent url={website || 'about:blank'} />
        </EmbedContainer>
        <RatingChart
          rating='4.0'
          voters={2023}
          distribution={[0, 1, 3, 9, 5]}
          sx={theme => ({
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'block',
              marginX: 1
            }
          })}
        />
      </Box>
      <IntroContainer>
        <CourseDetailTitle>
          {name || <Skeleton variant='text' />}
        </CourseDetailTitle>
        <CourseTagGrid>
          <CourseTagGridItem label='Provider' sm={7} lg={7}>
            {provider}
          </CourseTagGridItem>
          <CourseTagGridItem label='Level' sm={5} lg={5}>
            {LevelMappings[difficulty]}
          </CourseTagGridItem>
          <CourseTagGridItem label='Category' sm={7} lg={7}>
            {subcategoryId &&
              subcategoryList.length &&
              subcategoryList[subcategoryId].subcategoryName}
          </CourseTagGridItem>
          <CourseTagGridItem label='Time Cost' sm={5} lg={5}>
            {estHour} hrs.
          </CourseTagGridItem>
        </CourseTagGrid>
        <CourseDetailButtonStack>
          <CourseDetailButton href={website}>Course Website</CourseDetailButton>
          <CourseDetailButton href={video}>Watch Lectures</CourseDetailButton>
          <CourseDetailButton
            color='inherit'
            href={assignment}
            sx={{ filter: 'invert(1)', color: '#000' }}
          >
            Assignment
          </CourseDetailButton>
        </CourseDetailButtonStack>
        <CourseDetailSubtitle sx={{ marginBottom: 0.5 }}>
          Description
        </CourseDetailSubtitle>
        <Typography
          sx={{
            color: '#666',
            width: '96%'
          }}
        >
          {description}
        </Typography>
        <RatingChart
          rating='4.0'
          voters={2023}
          distribution={[0, 1, 3, 9, 5]}
          sx={theme => ({
            display: 'block',
            [theme.breakpoints.up('md')]: { display: 'none' }
          })}
        />
      </IntroContainer>

      <CommentsTitle children={'Comments'} />
      <CommentsField>
        {CommentCards.length > 0 ? (
          CommentCards
        ) : (
          <Typography align='center'> No comments yet~</Typography>
        )}
        <CommentField>
          <RoundAvatar sx={{ mr: '8px', mt: '12px' } }/>
          <ReplyInput
            multiline
            variant='outlined'
            placeholder={'Leave Some Comments Here'}
            value={myComment}
            onChange={event => {
              setMyComment(event.target.value)
            }}
          />
        </CommentField>
        <Tail>
          <Button
            children={'SEND'}
            variant='contained'
            endIcon={<SendIcon />}
            sx={{ borderRadius: '12rem' }}
            onClick={() => {
              handleCommentSend(0)
            }}
          />
        </Tail>
      </CommentsField>
    </MainContainer>
  )
}
