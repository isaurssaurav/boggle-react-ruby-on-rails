import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { IScore } from '../scenes/Game';


export function initializeBoard(): Promise<Array<Array<string>>> {
    return axios.get('/initialize_board').then((response: AxiosResponse) => {
        return response.data
    })
}

export function rotateBoard(data): Promise<Array<Array<string>>> {
    return axios.request({
        url: '/rotate_board',
        method: 'POST',
        data
    }).then((response: AxiosResponse) => {
        return response.data
    })
}

export function submitWord(board, word): Promise<IScore> {
    return axios.request({
        url: '/submit_word',
        method: 'POST',
        data: {
            board,
            word: word.toUpperCase()
        }
    }).then((response: AxiosResponse) => {
        return response.data
    })
}


export function initializeGame(): Promise<any> {
    return axios.get('/initialize_game').then((response: AxiosResponse) => {
        return response.data
    })
}
