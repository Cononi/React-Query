type CommonResult = {
    name : string
    classification: string
    average_height :string
    skin_colors : string
    hair_colors : string
    eye_colors: string
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

