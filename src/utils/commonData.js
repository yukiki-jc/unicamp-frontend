export const LevelMappings = [
  '',
  'All Level',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
]

const defaultFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
]

export const InterFont = ['Inter var', 'Inter', ...defaultFontFamily].join(',')

export const LatoFont = ['Lato', ...defaultFontFamily].join(',')

export const emptyCourse = {
  id: '',
  name: '',
  provider: '',
  difficulty: '',
  description: '',
  estHour: '',
  website: '',
  video: '',
  assignment: '',
  subcategoryId: ''
}

export const emptyCourseThumbnail = {
  name: '',
  provider: '',
  difficulty: '',
  description: '',
  estHour: '',
  subcategoryId: '',
  id: ''
}
