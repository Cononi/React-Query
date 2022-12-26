type CommonResult = {
    name : string
    classification: string
    average_height :string
    skin_color : string
    hair_color : string
    eye_color: string
    average_lifespan: string
    homeworld: string
    language: string
    people:[]
    films:[]
    created: string
    edited: string
    url : string
}

export interface CommonResponse {
    count: number
    next:string
    previous:null
    results: [CommonResult]
}

