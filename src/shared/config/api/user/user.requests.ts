import httpClient from "../httpClient"

const user_requests = {
    checkUsername: async(username: string) => {
        return await httpClient.get(`/users/check-username/${username}`)
    }
}

export default user_requests;