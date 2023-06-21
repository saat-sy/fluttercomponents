export interface Size {
    component: any
    width: string, // only % for now
    height: string
}

export interface Position {
    component: any
    leftAlign?: boolean,
    rightAlign?: boolean,
    centerAlign?: boolean
}

export interface Padding {
    component: any
    padding?: number,
    paddingStart?: number,
    paddingEnd?: number,
    paddingTop?: number,
    paddingBottom?: number 
}

export interface Margin {
    component: any
    margin?: number,
    marginStart?: number,
    marginEnd?: number,
    marginTop?: number,
    marginBottom?: number 
}