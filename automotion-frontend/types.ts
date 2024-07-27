
export type UserType= {
    id : string
    email: string
    name   : string
    password: string

}

export type MotionType= {
    id : string
    userId: number
    triggerId: string
    actions : ActionType[]
    trigger: TriggerType
}
export type TriggerType= {
    id: string
    motionId : string
    availableId: string
    triggerMetadata: any
    type:{
        name :string
        id: string
    }
}

export type ActionType={
    id: string
    name: string
    motionId: string
    actionId: string
    sortingOrder: number
    actionmetadata :any
    type: AvaialbleAction 
}
export type AvaialbleAction={
    id: string
    name: string
    requiredfields: any
}

export type MotionCreateType={
    availableTriggerId: string
    triggerMetadata: any,
    actions : {
        name: string
        availableActionId: string
        actionMetadata: any
    }[]
}