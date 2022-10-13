import { Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { PageContext } from '../App'
import { apiPath, backend } from '../utils/urls'
import { useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest } from '../utils/requests'
import { joinPaths } from '@remix-run/router'

const CourseDetailPage = props => {
  const { courseId } = useParams()
  const [courseDetail, setCourseDetail] = useState({})
  const pageContextValue = useContext(PageContext)
  useLayoutEffect(() => {
    const courseDetailURL = joinPaths([backend, apiPath.course.info, courseId])
    pageContextValue.handler.setLoading(true)
    getRequest(courseDetailURL)
      .then(json => {
        pageContextValue.handler.setLoading(false)
        setCourseDetail(json)
      })
      .catch(e => {
        pageContextValue.handler.setErrorBox(e)
        pageContextValue.handler.setLoading(false)
      })
  }, [])

  return (
    <main>
      Course Detail Page
      {JSON.stringify(courseDetail)}
    </main>
  )
}

export default CourseDetailPage
