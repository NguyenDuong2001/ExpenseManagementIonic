export interface Trip{
    id?: number;
    name: string;
    description: string;
    number_of_tourists: number;
    organizational_unit: string;
    is_risk: boolean;
    date: string;
    destination: string;
    type: string;
}