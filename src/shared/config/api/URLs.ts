const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

const OBDM_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL || ""
const OBDM_API_KEY = process.env.NEXT_PUBLIC_API_OMDB_KEY || ""

const LOGIN = "/auth/login"
const REGISTER = "/auth/register"
const CHECK_USERNAME = "/users/check-username"
const GET_PROFILE = "/users/profile/"
const FOLLOW_USER = "/users/follow/"
const WATCHLIST = "/users/watchlist/"
const POSTS = "/posts/"
const COMMENTS = "/comments/"
const ME = "/users/profile/get-by-token/me"

export { BASE_URL, LOGIN, REGISTER, CHECK_USERNAME, GET_PROFILE, FOLLOW_USER, WATCHLIST, POSTS, COMMENTS, OBDM_BASE_URL, OBDM_API_KEY, ME } ;
