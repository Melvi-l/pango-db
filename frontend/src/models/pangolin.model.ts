type PangolinModel = {
    _id: string
    username: string 
    role: Role
    friendIdList: string[]
}

export type Role = 'Guerrier' | 'Alchimiste' | 'Sorcier' | 'Espion' | 'Enchanteur'
export default PangolinModel