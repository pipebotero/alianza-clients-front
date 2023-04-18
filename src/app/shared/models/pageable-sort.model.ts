import { IDeserializable } from "./deserializable.model";

export class PageableSort implements IDeserializable {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
    
    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}